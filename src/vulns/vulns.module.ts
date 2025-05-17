import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VulnEntity } from './infrastructure/entities/VulnEntity';
import { VulnController } from './infrastructure/controllers/VulnController';
import ProviderLoader from 'src/config/ProviderLoader';
import { MySQLVulnRepository } from './infrastructure/repository/MySQLVulnRepository';
import { DeleteVulnUseCase } from './domain/usecases/DeleteVulnUseCase';
import { GetVulnUseCase } from './domain/usecases/GetVulnUseCase';
import { UpdateVulnUseCase } from './domain/usecases/UpdateVulnUsecase';
import { CreateVulnUseCase } from './domain/usecases/CreateVulnUseCase';
import { ListVulnsUseCase } from './domain/usecases/ListVulnsUseCase';

const providers = ProviderLoader([
  DeleteVulnUseCase,
  ListVulnsUseCase,
  MySQLVulnRepository,
  GetVulnUseCase,
  UpdateVulnUseCase,
  CreateVulnUseCase,
  VulnController,
]);

@Module({
  imports: [TypeOrmModule.forFeature([VulnEntity])],
  controllers: [VulnController],
  providers,
  exports: providers,
})
export class VulnsModule {}
