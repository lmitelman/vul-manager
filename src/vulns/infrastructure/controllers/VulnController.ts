import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { DeleteVulnUseCase } from '../../application/usecases/DeleteVulnUseCase';
import { GetVulnUseCase } from '../../application/usecases/GetVulnUseCase';
import { UpdateVulnUseCase } from '../../application/usecases/UpdateVulnUseCase';
import { CreateVulnUseCase } from '../../application/usecases/CreateVulnUseCase';
import { ListVulnsUseCase } from '../../application/usecases/ListVulnsUseCase';
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