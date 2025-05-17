import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VulnEntity } from './infrastructure/entities/VulnEntity';
import { VulnController } from './infrastructure/controllers/VulnController';
import { MySQLVulnRepository } from './infrastructure/repository/MySQLVulnRepository';
import { DeleteVulnUseCase } from './application/usecases/DeleteVulnUseCase';
import { GetVulnUseCase } from './application/usecases/GetVulnUseCase';
import { UpdateVulnUseCase } from './application/usecases/UpdateVulnUseCase';
import { CreateVulnUseCase } from './application/usecases/CreateVulnUseCase';
import { ListVulnsUseCase } from './application/usecases/ListVulnsUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([VulnEntity])],
  controllers: [VulnController],
  providers: [
    VulnController,
    DeleteVulnUseCase,
    ListVulnsUseCase,
    MySQLVulnRepository,
    GetVulnUseCase,
    UpdateVulnUseCase,
    CreateVulnUseCase,
  ],
  exports: [
    VulnController,
    DeleteVulnUseCase,
    ListVulnsUseCase,
    MySQLVulnRepository,
    GetVulnUseCase,
    UpdateVulnUseCase,
    CreateVulnUseCase,
  ],
})
export class VulnsModule {}
