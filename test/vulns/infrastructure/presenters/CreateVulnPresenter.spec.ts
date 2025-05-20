import CreateVulnPresenter from '@vulns/infrastructure/presenters/CreateVulnPresenter';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

describe('CreateVulnPresenter', () => {
  let presenter: CreateVulnPresenter;

  beforeEach(() => {
    presenter = new CreateVulnPresenter();
  });

  it('should be defined', () => {
    expect(presenter).toBeDefined();
  });

  it('should present a vulnerability with correct format', () => {
    // Arrange
    const createdAt = new Date();
    const vuln = new Vuln(
      'vuln-123',
      'Test Vuln',
      'Test Description',
      VulnSeverity.HIGH,
      VulnStatus.PENDING_FIX,
      createdAt,
      new Date(),
      'CWE-79',
      'Fix it',
      'user-1'
    );

    // Act
    const presented = presenter.present(vuln);

    // Assert
    expect(presented).toEqual({
      id: 'vuln-123',
      createdAt: createdAt
    });
  });
}); 