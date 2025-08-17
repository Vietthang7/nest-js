import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductListResponseDto } from './dto/product-response.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAll(query: GetProductsDto): Promise<ProductListResponseDto> {
    const { page = 1, limit = 10, search, category } = query;
    const offset = (page - 1) * limit;

    // Xây dựng điều kiện where
    const whereConditions: any = {};
    
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { sku: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Điều kiện include cho category
    const includeConditions: any[] = [
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name', 'slug'],
        through: { attributes: [] }, // Loại bỏ dữ liệu từ bảng trung gian
      }
    ];

    // Nếu có filter theo category
    if (category) {
      includeConditions[0].where = {
        slug: category
      };
      includeConditions[0].required = true; // INNER JOIN
    }

    const { rows: products, count: total } = await this.productModel.findAndCountAll({
      where: whereConditions,
      include: includeConditions,
      limit,
      offset,
      order: [['created_at', 'DESC']],
      distinct: true, // Để count chính xác khi có JOIN
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name', 'slug', 'description'],
          through: { attributes: [] },
        }
      ]
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}