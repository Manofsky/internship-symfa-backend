import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import './dotenv';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  synchronize: false,
  logging: false,
  entities: ['*entity.ts'],
  migrations: ['*.ts'],
  subscribers: [],
});
