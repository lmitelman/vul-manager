import UpdateVulnPresenter from '@vulns/infrastructure/presenters/UpdateVulnPresenter';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

describe('UpdateVulnPresenter', () => {
  let presenter: UpdateVulnPresenter;

  beforeEach(() => {
    presenter = new UpdateVulnPresenter();
  });

  it('should be defined', () => {
    expect(presenter).toBeDefined();
  });

  it('should present a vulnerability with correct format', () => {
    // Arrange
    const updatedAt = new Date();
    const vuln = new Vuln(
      'vuln-123',
      'Test Vuln',
      'Test Description',
      VulnSeverity.HIGH,
      VulnStatus.PENDING_FIX,
      new Date(),
      updatedAt,
      'CWE-79',
      'Fix it',
      'user-1'
    );

    // Act
    const presented = presenter.present(vuln);

    // Assert
    expect(presented).toEqual({
      id: 'vuln-123',
      updatedAt: updatedAt
    });
  });
}); 