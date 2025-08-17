import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { ProductCategory } from './product-category.model';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model {
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // Cho phép null để có category gốc
  })
  parent_id: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Quan hệ với category cha
  @BelongsTo(() => Category)
  parent: Category;

  // Quan hệ với các category con
  @HasMany(() => Category)
  children: Category[];

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];
}
