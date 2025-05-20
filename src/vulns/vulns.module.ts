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
import CreateVulnPresenter from './infrastructure/presenters/CreateVulnPresenter';
import UpdateVulnPresenter from './infrastructure/presenters/UpdateVulnPresenter';  
import GetVulnPresenter from './infrastructure/presenters/GetVulnPresenter';
@Module({
  imports: [TypeOrmModule.forFeature([VulnEntity])],
  controllers: [VulnController],
  providers: [
    {
      provide: 'VulnRepository', 
      useClass: MySQLVulnRepository,
    },
    VulnController,
    DeleteVulnUseCase,
    ListVulnsUseCase,
    MySQLVulnRepository,
    GetVulnUseCase,
    UpdateVulnUseCase,
    CreateVulnUseCase,
    CreateVulnPresenter,
    UpdateVulnPresenter,
    GetVulnPresenter,
  ],
  exports: [
    VulnController,
    DeleteVulnUseCase,
    ListVulnsUseCase,
    MySQLVulnRepository,
    GetVulnUseCase,
    UpdateVulnUseCase,
    CreateVulnUseCase,
    CreateVulnPresenter,
    UpdateVulnPresenter,
    GetVulnPresenter,
  ],
})
export class VulnsModule {}
