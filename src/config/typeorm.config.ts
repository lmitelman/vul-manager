import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 3306),
  username: configService.get('DB_USERNAME', 'root'),
  password: configService.get('DB_PASSWORD', ''),
  database: configService.get('DB_DATABASE', 'your_database_name'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get('DB_SYNCHRONIZE', false),
  logging: configService.get('DB_LOGGING', false),
}); 