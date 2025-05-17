import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';
import { VulnController } from '@vulns/infrastructure/controllers/VulnController';

@Module({
  imports: [TypeOrmModule.forFeature([VulnEntity])],
  controllers: [VulnController],
  providers: [],
  exports: [],
})
export class VulnsModule {}
