export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: number;
  price_sale: number;
  sku: string;
  stock: number;
  metadata: any;
  created_at: Date;
  updated_at: Date;
  categories?: any[];
}

export class ProductListResponseDto {
  data: ProductResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}