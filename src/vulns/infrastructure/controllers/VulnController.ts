import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, Req } from '@nestjs/common';
import { DeleteVulnUseCase } from '../../application/usecases/DeleteVulnUseCase';
import { GetVulnUseCase } from '@vulns/application/usecases/GetVulnUseCase';
import { UpdateVulnUseCase } from '@vulns/application/usecases/UpdateVulnUseCase';
import { CreateVulnUseCase } from '@vulns/application/usecases/CreateVulnUseCase';
import { ListVulnsUseCase } from '@vulns/application/usecases/ListVulnsUseCase';
import { VulnResponseDTO } from '@vulns/application/dtos/VulnResponseDTO';
import { UpdateVulnDTO } from '@vulns/application/dtos/UpdateVulnDTO';
import { CreateVulnDTO } from '@vulns/application/dtos/CreateVulnDTO';
import { CreateVulnRequest as CreateVulnRequestBody } from './requests/CreateVulnRequestBody';
import { VulnStatus } from '@vulns/domain/entities/Vuln';

@Controller('api/vulns')
export class VulnController {
  constructor(
    private readonly createVulnUseCase: CreateVulnUseCase,
    private readonly updateVulnUseCase: UpdateVulnUseCase,
    private readonly getVulnUseCase: GetVulnUseCase,
    private readonly listVulnsUseCase: ListVulnsUseCase,
    private readonly deleteVulnUseCase: DeleteVulnUseCase,
  ) {}

  @Post()
  async create(
    @Body() req: CreateVulnRequestBody,
  ): Promise<VulnResponseDTO> {
    const dto: CreateVulnDTO = {
      title: req.title,
      description: req.description,
      severity: req.severity,
      status: VulnStatus.PENDING_FIX,
      cweId: req.cweId,
      suggestedFix: req.suggestedFix,
      userId: "123"
    }
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