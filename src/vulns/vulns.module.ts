import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VulnEntity } from './infrastructure/entities/VulnEntity';
import { VulnController } from './infrastructure/controllers/VulnController';
import { CreateVulnUseCase } from '@vulns/domain/usecases/CreateVulnUseCase';
import { UpdateVulnUseCase } from '@vulns/domain/usecases/UpdateVulnUseCase';
import { GetVulnUseCase } from '@vulns/domain/usecases/GetVulnUseCase';
import { ListVulnsUseCase } from '@vulns/domain/usecases/ListVulnsUseCase';
import { DeleteVulnUseCase } from '@vulns/domain/usecases/DeleteVulnUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([VulnEntity])],
  controllers: [VulnController],
  providers: [
    CreateVulnUseCase,
    UpdateVulnUseCase,
    GetVulnUseCase,
    ListVulnsUseCase,
    DeleteVulnUseCase,
  ],
  exports: [],
})
export class VulnsModule {}
