import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('MYSQLHOST'),
  port: +configService.get('MYSQLPORT'),
  username: configService.get('MYSQLUSER'),
  password: configService.get('MYSQLPASSWORD'),
  database: configService.get('MYSQLDATABASE'),
  entities: [__dirname + '/../**/infrastructure/entities/**/*.ts'],
  synchronize: configService.get('DB_SYNCHRONIZE', false),
  logging: configService.get('DB_LOGGING', false),
}); 