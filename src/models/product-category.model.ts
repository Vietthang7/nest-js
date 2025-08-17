import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Product } from './product.model';
import { Category } from './category.model';

@Table({
  tableName: 'product_categories',
  timestamps: false,
})
export class ProductCategory extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  product_id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  category_id: number;
}