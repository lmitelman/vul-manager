import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/infrastructure/guards/AuthGuard';
import { DeleteVulnUseCase } from '@vulns/application/usecases/DeleteVulnUseCase';
import { GetVulnUseCase } from '@vulns/application/usecases/GetVulnUseCase';
import { UpdateVulnUseCase } from '@vulns/application/usecases/UpdateVulnUseCase';
import { CreateVulnUseCase } from '@vulns/application/usecases/CreateVulnUseCase';
import { ListVulnsUseCase } from '@vulns/application/usecases/ListVulnsUseCase';
import { CreateVulnDTO } from '@vulns/application/dtos/CreateVulnDTO';
import { CreateVulnRequestBody } from '@vulns/infrastructure/controllers/requests/CreateVulnRequestBody';
import { VulnStatus } from '@vulns/domain/entities/Vuln';
import { UpdateVulnRequestBody } from '@vulns/infrastructure/controllers/requests/UpdateVulnRequestBody';
import { UpdateVulnDTO } from '@vulns/application/dtos/UpdateVulnDTO';
import CreateVulnPresenter, { CreateVulnPresented } from '@vulns/infrastructure/presenters/CreateVulnPresenter';
import UpdateVulnPresenter, { UpdateVulnPresented } from '@vulns/infrastructure/presenters/UpdateVulnPresenter';
import GetVulnPresenter, { GetVulnPresented } from '@vulns/infrastructure/presenters/GetVulnPresenter';
@Controller('api/vulns')
@UseGuards(JwtAuthGuard)
export class VulnController {
  constructor(
    private readonly createVulnUseCase: CreateVulnUseCase,
    private readonly updateVulnUseCase: UpdateVulnUseCase,
    private readonly getVulnUseCase: GetVulnUseCase,
    private readonly listVulnsUseCase: ListVulnsUseCase,
    private readonly deleteVulnUseCase: DeleteVulnUseCase,
    private readonly createVulnPresenter: CreateVulnPresenter,
    private readonly updateVulnPresenter: UpdateVulnPresenter,
    private readonly getVulnPresenter: GetVulnPresenter
  ) {}

  @Post()
  async create(
    @Body() body: CreateVulnRequestBody,
  ): Promise<CreateVulnPresented> {
    const dto: CreateVulnDTO = {
      title: body.title,
      description: body.description,
      severity: body.severity,
      status: VulnStatus.PENDING_FIX,
      cweId: body.cweId,
      suggestedFix: body.suggestedFix,
      userId: "123"
    }
    const vuln = await this.createVulnUseCase.execute(dto);
    return this.createVulnPresenter.present(vuln);
  }

  @Get()
  async findAll(): Promise<GetVulnPresented[]> {
    const vulns = await this.listVulnsUseCase.execute();
    return vulns.map(vuln => this.getVulnPresenter.present(vuln));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetVulnPresented> {
    const vuln = await this.getVulnUseCase.execute(id);
    return this.getVulnPresenter.present(vuln);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateVulnRequestBody
  ): Promise<UpdateVulnPresented> {
    const dto: UpdateVulnDTO = {
      title: body.title,
      description: body.description,
      severity: body.severity,
      status: body.status,
      cweId: body.cweId,
      suggestedFix: body.suggestedFix,
    }
    const vuln = await this.updateVulnUseCase.execute(id, dto);
    return this.updateVulnPresenter.present(vuln);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteVulnUseCase.execute(id);
  }
} 