import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductListResponseDto } from './dto/product-response.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query() query: GetProductsDto,
  ): Promise<ProductListResponseDto> {
    return this.productsService.findAll(query);
  }
}
