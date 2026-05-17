import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getProducts } from "./shopify";

/**
 * Maison Étoile MCP Server
 * Standardizes Shopify interactions for any LLM
 */
export class ShopifyMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "maison-etoile-shopify",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupTools();
  }

  private setupTools() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "get_menu",
          description: "Retrieve the current gourmet menu from Maison Étoile",
          inputSchema: {
            type: "object",
            properties: {
              limit: { type: "number", default: 10 }
            }
          },
        },
        {
          name: "add_to_cart",
          description: "Add specific dishes to the guest's cart",
          inputSchema: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    variantId: { type: "string" },
                    quantity: { type: "number" }
                  },
                  required: ["variantId", "quantity"]
                }
              }
            },
            required: ["items"]
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        if (name === "get_menu") {
          const products = await getProducts((args?.limit as number) || 10);
          return {
            content: [{ type: "text", text: JSON.stringify(products) }],
          };
        }

        if (name === "add_to_cart") {
          const { items } = args as { items: { variantId: string; quantity: number }[] };
          // Logic for cart would typically happen in client, 
          // but we return the action for the frontend to handle
          return {
            content: [{ type: "text", text: JSON.stringify({ action: "ADD_TO_CART", items }) }],
          };
        }

        throw new Error(`Tool not found: ${name}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: "text", text: `Error: ${message}` }],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}
