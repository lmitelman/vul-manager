import { Test, TestingModule } from '@nestjs/testing';
import { VulnController } from '@vulns/infrastructure/controllers/VulnController';
import { CreateVulnUseCase } from '@vulns/application/usecases/CreateVulnUseCase';
import { UpdateVulnUseCase } from '@vulns/application/usecases/UpdateVulnUseCase';
import { GetVulnUseCase } from '@vulns/application/usecases/GetVulnUseCase';
import { ListVulnsUseCase } from '@vulns/application/usecases/ListVulnsUseCase';
import { DeleteVulnUseCase } from '@vulns/application/usecases/DeleteVulnUseCase';
import CreateVulnPresenter from '@vulns/infrastructure/presenters/CreateVulnPresenter';
import UpdateVulnPresenter from '@vulns/infrastructure/presenters/UpdateVulnPresenter';
import GetVulnPresenter from '@vulns/infrastructure/presenters/GetVulnPresenter';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';
import { CreateVulnRequestBody } from '@vulns/infrastructure/controllers/requests/CreateVulnRequestBody';
import { UpdateVulnRequestBody } from '@vulns/infrastructure/controllers/requests/UpdateVulnRequestBody';
import { JwtAuthGuard } from '@auth/infrastructure/guards/AuthGuard';

jest.mock('@auth/infrastructure/guards/AuthGuard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true)
  }))
}));

describe('VulnController', () => {
  let controller: VulnController;
  let createVulnUseCase: jest.Mocked<CreateVulnUseCase>;
  let updateVulnUseCase: jest.Mocked<UpdateVulnUseCase>;
  let getVulnUseCase: jest.Mocked<GetVulnUseCase>;
  let listVulnsUseCase: jest.Mocked<ListVulnsUseCase>;
  let deleteVulnUseCase: jest.Mocked<DeleteVulnUseCase>;
  let createVulnPresenter: CreateVulnPresenter;
  let updateVulnPresenter: UpdateVulnPresenter;
  let getVulnPresenter: GetVulnPresenter;

  beforeEach(async () => {
    const mockUseCases = {
      createVulnUseCase: { execute: jest.fn() },
      updateVulnUseCase: { execute: jest.fn() },
      getVulnUseCase: { execute: jest.fn() },
      listVulnsUseCase: { execute: jest.fn() },
      deleteVulnUseCase: { execute: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VulnController],
      providers: [
        { provide: CreateVulnUseCase, useValue: mockUseCases.createVulnUseCase },
        { provide: UpdateVulnUseCase, useValue: mockUseCases.updateVulnUseCase },
        { provide: GetVulnUseCase, useValue: mockUseCases.getVulnUseCase },
        { provide: ListVulnsUseCase, useValue: mockUseCases.listVulnsUseCase },
        { provide: DeleteVulnUseCase, useValue: mockUseCases.deleteVulnUseCase },
        CreateVulnPresenter,
        UpdateVulnPresenter,
        GetVulnPresenter,
      ],
    }).compile();

    controller = module.get<VulnController>(VulnController);
    createVulnUseCase = module.get(CreateVulnUseCase);
    updateVulnUseCase = module.get(UpdateVulnUseCase);
    getVulnUseCase = module.get(GetVulnUseCase);
    listVulnsUseCase = module.get(ListVulnsUseCase);
    deleteVulnUseCase = module.get(DeleteVulnUseCase);
    createVulnPresenter = module.get(CreateVulnPresenter);
    updateVulnPresenter = module.get(UpdateVulnPresenter);
    getVulnPresenter = module.get(GetVulnPresenter);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vulnerability', async () => {
      // Arrange
      const createRequest: CreateVulnRequestBody = {
        title: 'Test Vuln',
        description: 'Test Description',
        severity: VulnSeverity.HIGH,
        cweId: 'CWE-79',
        suggestedFix: 'Fix it'
      };

      const mockVuln = new Vuln(
        'vuln-1',
        createRequest.title,
        createRequest.description,
        createRequest.severity,
        VulnStatus.PENDING_FIX,
        new Date(),
        new Date(),
        createRequest.cweId,
        createRequest.suggestedFix,
        'user-123'
      );

      createVulnUseCase.execute.mockResolvedValue(mockVuln);

      // Act
      const result = await controller.create(createRequest);

      // Assert
      expect(createVulnUseCase.execute).toHaveBeenCalledWith(expect.objectContaining({
        title: createRequest.title,
        description: createRequest.description,
        severity: createRequest.severity,
        status: VulnStatus.PENDING_FIX,
        cweId: createRequest.cweId,
        suggestedFix: createRequest.suggestedFix,
      }));
      expect(result).toEqual(createVulnPresenter.present(mockVuln));
    });
  });

  describe('findAll', () => {
    it('should return all vulnerabilities', async () => {
      // Arrange
      const mockVulns = [
        new Vuln('vuln-1', 'Test1', 'Desc1', VulnSeverity.HIGH, VulnStatus.PENDING_FIX, new Date(), new Date(), 'CWE-79', 'Fix1', 'user-1'),
        new Vuln('vuln-2', 'Test2', 'Desc2', VulnSeverity.LOW, VulnStatus.PENDING_FIX, new Date(), new Date(), 'CWE-89', 'Fix2', 'user-1'),
      ];

      listVulnsUseCase.execute.mockResolvedValue(mockVulns);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(listVulnsUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(mockVulns.map(vuln => getVulnPresenter.present(vuln)));
    });
  });

  describe('findOne', () => {
    it('should return a single vulnerability', async () => {
      // Arrange
      const mockVuln = new Vuln(
        'vuln-1',
        'Test',
        'Description',
        VulnSeverity.HIGH,
        VulnStatus.PENDING_FIX,
        new Date(),
        new Date(),
        'CWE-79',
        'Fix it',
        'user-1'
      );

      getVulnUseCase.execute.mockResolvedValue(mockVuln);

      // Act
      const result = await controller.findOne('vuln-1');

      // Assert
      expect(getVulnUseCase.execute).toHaveBeenCalledWith('vuln-1');
      expect(result).toEqual(getVulnPresenter.present(mockVuln));
    });
  });

  describe('update', () => {
    it('should update a vulnerability', async () => {
      // Arrange
      const updateRequest: UpdateVulnRequestBody = {
        title: 'Updated Title',
        description: 'Updated Description',
        severity: VulnSeverity.CRITICAL,
        status: VulnStatus.PENDING_FIX,
        cweId: 'CWE-89',
        suggestedFix: 'Updated Fix'
      };

      const mockVuln = new Vuln(
        'vuln-1',
        updateRequest.title,
        updateRequest.description,
        updateRequest.severity,
        updateRequest.status,
        new Date(),
        new Date(),
        updateRequest.cweId,
        updateRequest.suggestedFix,
        'user-1'
      );

      updateVulnUseCase.execute.mockResolvedValue(mockVuln);

      // Act
      const result = await controller.update('vuln-1', updateRequest);

      // Assert
      expect(updateVulnUseCase.execute).toHaveBeenCalledWith('vuln-1', updateRequest);
      expect(result).toEqual(updateVulnPresenter.present(mockVuln));
    });
  });

  describe('delete', () => {
    it('should delete a vulnerability', async () => {
      // Act
      await controller.delete('vuln-1');

      // Assert
      expect(deleteVulnUseCase.execute).toHaveBeenCalledWith('vuln-1');
    });
  });
}); 