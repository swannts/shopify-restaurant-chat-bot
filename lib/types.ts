export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  productType: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage;
  images: {
    nodes: ShopifyImage[];
  };
  priceRange: {
    minVariantPrice: MoneyV2;
  };
  variants: {
    nodes: ProductVariant[];
  };
  collections?: {
    nodes: {
      handle: string;
      title: string;
    }[];
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: {
    nodes: Product[];
  };
}

export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage;
    };
  };
  cost: {
    totalAmount: MoneyV2;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    nodes: CartItem[];
  };
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
  };
}
