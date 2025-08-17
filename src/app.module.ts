import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Category } from './models/category.model';
import { ProductCategory } from './models/product-category.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Làm cho ConfigModule có thể dùng ở mọi nơi
      envFilePath: '.env', // Đường dẫn đến file .env
    }),
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [Product, Category, ProductCategory],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
