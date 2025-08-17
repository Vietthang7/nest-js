import {SequelizeModuleOptions} from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'nest-js',
  autoLoadModels: true,
  synchronize: true, // Chỉ dùng trong development
  sync: { force: true },
  logging: console.log,
};