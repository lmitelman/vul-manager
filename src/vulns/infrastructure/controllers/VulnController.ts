import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { CreateVulnUseCase } from '@vulns/application/usecases/CreateVulnUsecase';
import { UpdateVulnUseCase } from '@vulns/application/usecases/UpdateVulnUsecase';
import { GetVulnUseCase } from '@vulns/application/usecases/GetVulnUsecase';
import { ListVulnsUseCase } from '@vulns/application/usecases/ListVulnsUsecase';
import { DeleteVulnUseCase } from '@vulns/application/usecases/DeleteVulnUsecase';
import { VulnResponseDTO } from '@vulns/application/dtos/VulnResponseDTO';
import { UpdateVulnDTO } from '@vulns/application/dtos/UpdateVulnDTO';
import { CreateVulnDTO } from '@vulns/application/dtos/CreateVulnDTO';

@Controller('vulns')
export class VulnController {
  constructor(
    private readonly createVulnUseCase: CreateVulnUseCase,
    private readonly updateVulnUseCase: UpdateVulnUseCase,
    private readonly getVulnUseCase: GetVulnUseCase,
    private readonly listVulnsUseCase: ListVulnsUseCase,
    private readonly deleteVulnUseCase: DeleteVulnUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateVulnDTO): Promise<VulnResponseDTO> {
    return this.createVulnUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<VulnResponseDTO[]> {
    return this.listVulnsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VulnResponseDTO> {
    return this.getVulnUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVulnDTO
  ): Promise<VulnResponseDTO> {
    return this.updateVulnUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteVulnUseCase.execute(id);
  }
} 