import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { ProductCategory } from './product-category.model';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
  })
  slug: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  price_sale: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: true,
  })
  sku: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stock: number;
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];
}
