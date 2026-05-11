import { NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { getProducts } from "@/lib/shopify";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

// --- Simple IP-based Rate Limiter (In-Memory) ---
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return false;
  }

  userData.count += 1;
  rateLimitMap.set(ip, userData);
  return userData.count > RATE_LIMIT_COUNT;
}
// ------------------------------------------------

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { reply: "I apologize, but our concierge is receiving many requests. Please wait a moment before asking again." },
        { status: 429 }
      );
    }

    const { message, history = [] } = await req.json();

    // 1. RAG - Fetch current menu context from Shopify
    const products = await getProducts(50);
    const menuContext = products.map(p => {
      const variantId = p.variants.nodes[0]?.id || "";
      return `- [${p.title}](/product/${p.handle}) (ID: ${variantId}): ${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}. ${p.description}`;
    }).join("\n");

    // 2. Initialize LangChain ChatGroq
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    // 3. Define the Maître d' Prompt Template
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are the Maître d'AI for Maison Étoile.
      
      GUIDELINES:
      - Use evocative, sophisticated language.
      - DO NOT use long paragraphs. Use bullet points for dish lists and recommendations.
      - Use **Bold** for dish names.
      - ALWAYS link dishes using Markdown: [**Dish Name**](/product/handle).
      - If a guest mentions a dish, suggest a wine pairing on a new line.
      - Use white space to keep the conversation airy and elegant.

      CURRENT MENU KNOWLEDGE (RAG Context):
      {menu_context}

      Available Tools (MCP):
      - add_to_cart: Call this when the user wants to order. Use the exact format: {tool_format}
      `],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);

    // 4. Build the Chain
    const chain = RunnableSequence.from([
      {
        input: (i) => i.input,
        menu_context: () => menuContext,
        history: (i) => i.history,
        tool_format: () => '[TOOL:add_to_cart:{"items":[{"variantId":"...", "quantity":1}]}]',
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    // 5. Execute the Chain
    const response = await chain.invoke({
      input: message,
      history: history.map((h: any) => [h.role, h.content]),
    });

    // 6. Handle Tool Parsing (Resilient Regex for MCP-style calls)
    let finalAction = null;
    let finalReply = response;
    let toolItems = null;

    // Search for tool calls using a regex that captures the entire JSON object {...}
    const toolMatch = response.match(/\[TOOL:add_to_cart:(\{[\s\S]*\})\s*\]/);
    
    if (toolMatch) {
      finalReply = response.replace(toolMatch[0], "").trim();
      
      try {
        const toolData = JSON.parse(toolMatch[1].trim());
        finalAction = "ADD_TO_CART";
        toolItems = toolData.items;
      } catch (e) {
        console.error("MCP Tool JSON parsing failed:", e, "Payload:", toolMatch[1]);
      }

      return NextResponse.json({ 
        reply: finalReply, 
        action: finalAction, 
        items: toolItems 
      });
    }

    return NextResponse.json({ reply: response });
  } catch (error: any) {
    console.error("LangChain Chat Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
