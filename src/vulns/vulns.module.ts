import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VulnEntity } from './infrastructure/entities/VulnEntity';
import { VulnController } from './infrastructure/controllers/VulnController';
import { CreateVulnUseCase } from '@vulns/domain/usecases/CreateVulnUseCase';
import { UpdateVulnUseCase } from '@vulns/domain/usecases/UpdateVulnUseCase';
import { GetVulnUseCase } from '@vulns/domain/usecases/GetVulnUseCase';
import { ListVulnsUseCase } from '@vulns/domain/usecases/ListVulnsUseCase';
import { DeleteVulnUseCase } from '@vulns/domain/usecases/DeleteVulnUseCase';
import ProviderLoader from 'src/config/ProviderLoader';
import { MySQLVulnRepository } from './infrastructure/repository/MySQLVulnRepository';

const providers = ProviderLoader([
  VulnController,
  DeleteVulnUseCase,
  ListVulnsUseCase,
  MySQLVulnRepository,
  GetVulnUseCase,
  UpdateVulnUseCase,
  CreateVulnUseCase,
]);

@Module({
  imports: [TypeOrmModule.forFeature([VulnEntity])],
  controllers: [VulnController],
  providers,
  exports: providers,
})
export class VulnsModule {}
