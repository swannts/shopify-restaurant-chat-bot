"use server";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-01';

import { Product, Collection, Cart } from "./types";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
const adminEndpoint = `https://${domain}/admin/api/${apiVersion}/graphql.json`;

async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<{ data: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken!,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      ...(cache !== 'no-store' ? { next: { revalidate: 900 } } : {}),
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify API Errors:', JSON.stringify(body.errors, null, 2));
      throw new Error(body.errors[0].message);
    }

    return body;
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error('Shopify fetch error:', err.message);
    throw new Error(`Shopify Fetch Failed: ${err.message}`);
  }
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    productType
    description
    descriptionHtml
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 5) {
      nodes {
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 10) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        nodes {
          ...ProductFields
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const res = await shopifyFetch<{ products: { nodes: Product[] } }>({
    query,
    variables: { first },
  });

  return res.data.products.nodes;
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const res = await shopifyFetch<{ product: Product | null }>({
    query,
    variables: { handle },
  });

  return res.data.product;
}

export async function getCollectionByHandle(handle: string) {
  const query = `
    query getCollectionByHandle($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        products(first: 50) {
          nodes {
            ...ProductFields
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const res = await shopifyFetch<{ collection: Collection | null }>({
    query,
    variables: { handle },
  });

  return res.data.collection;
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const res = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query,
    variables: {
      input: {
        lines,
      },
    },
  });

  return res.data.cartCreate.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
    ${CART_FRAGMENT}
  `;

  const res = await shopifyFetch<{ cart: Cart }>({
    query,
    variables: { cartId },
    cache: 'no-store',
  });

  return res.data.cart;
}

export async function addLinesToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const res = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query,
    variables: { cartId, lines },
  });

  return res.data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; merchandiseId?: string; quantity?: number }[]) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const res = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>({
    query,
    variables: { cartId, lines },
  });

  return res.data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]) {
  const query = `
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const res = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>({
    query,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  return res.data.cartLinesRemove.cart;
}

// --- ADMIN API ---

async function adminFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<{ data: T } | never> {
  try {
    const result = await fetch(adminEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken!,
      },
      body: JSON.stringify({ query, variables }),
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify Admin API Errors:', JSON.stringify(body.errors, null, 2));
      throw new Error(body.errors[0].message);
    }

    return body;
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error('Shopify Admin fetch error:', err.message);
    throw new Error(`Admin Fetch Failed: ${err.message}`);
  }
}

export async function createDraftOrder(email: string, lineItems: { variantId: string; quantity: number }[]) {
  const query = `
    mutation createDraftOrder($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = {
    email,
    lineItems: lineItems.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity
    }))
  };

  const res = await adminFetch<{ 
    draftOrderCreate: { 
      draftOrder: { id: string; invoiceUrl: string; status: string } | null; 
      userErrors: { field: string[] | null; message: string }[] 
    } 
  }>({
    query,
    variables: { input },
  });

  if (res.data.draftOrderCreate.userErrors.length > 0) {
    throw new Error(res.data.draftOrderCreate.userErrors[0].message);
  }

  return res.data.draftOrderCreate.draftOrder;
}
