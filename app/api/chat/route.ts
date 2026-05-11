import Groq from "groq-sdk";
import { getProducts } from "@/lib/shopify";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Retrieval: Get the current menu
    const products = await getProducts(50) || [];

    // 2. Augmentation: Create the context string
    const menuContext = products.map((p: any) => {
      const price = p.priceRange?.minVariantPrice?.amount || "N/A";
      const currency = p.priceRange?.minVariantPrice?.currencyCode || "";
      const variantId = p.variants?.nodes?.[0]?.id || "";
      return `Dish: ${p.title}\nDescription: ${p.description}\nPrice: ${price} ${currency}\nVariantID: ${variantId}\nLink: /product/${p.handle}\n---`;
    }).join("\n");

    // 3. System Prompt - Elevated for "Maison Étoile"
    const systemPrompt = `
      You are the "Maître d'AI" for Maison Étoile.
      
      GUIDELINES:
      - Use evocative language.
      - ALWAYS link dishes using Markdown: [Dish Name](Link). 
      - Example: "I highly recommend our [**Chocolate Soufflé**](/products/chocolate-souffle)."
      - If a guest orders a main, suggest a pairing.
      - Use Markdown for structure.
      
      CURRENT MENU KNOWLEDGE:
      ${menuContext}
      
      ORDERING TOOL:
      - Use 'add_to_cart' when they mention specific dishes.
      - After adding, mention that they can complete their reservation at the checkout page (/checkout).
    `;

    const tools = [
      {
        type: "function",
        function: {
          name: "add_to_cart",
          description: "Adds specific dishes to the guest's shopping cart.",
          parameters: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    variantId: { type: "string", description: "The Shopify Variant ID." },
                    title: { type: "string", description: "The name of the dish." },
                    quantity: { type: "number", description: "Number of servings." }
                  },
                  required: ["variantId", "title", "quantity"]
                }
              }
            },
            required: ["items"]
          }
        }
      }
    ];

    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile",
      tools: tools as any,
      tool_choice: "auto",
    });

    const responseMessage = response.choices[0].message;

    // If the AI wants to add items to cart
    if (responseMessage.tool_calls) {
      const toolCall = responseMessage.tool_calls[0];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      
      // We pass the "success" back to the AI so it can craft an elegant response
      const secondResponse = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
          responseMessage,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              success: true,
              message: "Items successfully added to the site cart."
            })
          }
        ],
        model: "llama-3.3-70b-versatile",
      });

      return new Response(JSON.stringify({ 
        reply: secondResponse.choices[0].message.content,
        action: "ADD_TO_CART",
        items: functionArgs.items
      }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ reply: responseMessage.content }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ reply: "I apologize, but I am momentarily indisposed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
