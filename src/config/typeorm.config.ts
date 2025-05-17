import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  console.log({
    host: configService.get('MYSQLHOST'),
    user: configService.get('MYSQLUSER'),
    password: configService.get('MYSQLPASSWORD'),
    database: configService.get('MYSQLDATABASE'),
    port: configService.get('MYSQLPORT')
  });

  return {
    type: 'mysql',
    host: configService.get<string>('MYSQLHOST'),
    port: parseInt(configService.get<string>('MYSQLPORT') || '3306', 10),
    username: configService.get<string>('MYSQLUSER'),
    password: configService.get<string>('MYSQLPASSWORD'),
    database: configService.get<string>('MYSQLDATABASE'),
    entities: [__dirname + '/../**/infrastructure/entities/**/*.ts']
  };
};