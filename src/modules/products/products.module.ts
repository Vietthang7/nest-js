import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductCategory } from '../../models/product-category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Category, ProductCategory]), // Module này sẽ sử dụng 3 models: Product, Category, ProductCategory
  ],
  controllers: [ProductsController], //Đăng ký ProductsController với NestJS
  // NestJS sẽ tự động tạo instance và xử lý routing
  // Controller sẽ handle các HTTP requests đến /products
  providers: [ProductsService], // Chỉ có 1 instance duy nhất trong toàn bộ ứng dụng
  exports: [ProductsService], // Chia sẻ ProductsService cho các module khác , Modules khác có thể import ProductsModule và sử dụng ProductsService
})
export class ProductsModule {}
