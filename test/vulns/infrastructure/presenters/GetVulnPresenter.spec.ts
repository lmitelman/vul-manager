import GetVulnPresenter from '@vulns/infrastructure/presenters/GetVulnPresenter';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

describe('GetVulnPresenter', () => {
  let presenter: GetVulnPresenter;

  beforeEach(() => {
    presenter = new GetVulnPresenter();
  });

  it('should be defined', () => {
    expect(presenter).toBeDefined();
  });

  it('should present a vulnerability with all properties', () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();
    const vuln = new Vuln(
      'vuln-123',
      'Test Vuln',
      'Test Description',
      VulnSeverity.HIGH,
      VulnStatus.PENDING_FIX,
      createdAt,
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
      title: 'Test Vuln',
      description: 'Test Description',
      severity: 'HIGH',
      status: VulnStatus.PENDING_FIX,
      createdAt: createdAt,
      updatedAt: updatedAt,
      cweId: 'CWE-79',
      suggestedFix: 'Fix it',
      userId: 'user-1'
    });
  });

  it('should maintain original data types when presenting', () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();
    const vuln = new Vuln(
      'vuln-123',
      'Test Vuln',
      'Test Description',
      VulnSeverity.HIGH,
      VulnStatus.PENDING_FIX,
      createdAt,
      updatedAt,
      'CWE-79',
      'Fix it',
      'user-1'
    );

    // Act
    const presented = presenter.present(vuln);

    // Assert
    expect(presented.createdAt).toBeInstanceOf(Date);
    expect(presented.updatedAt).toBeInstanceOf(Date);
    expect(typeof presented.id).toBe('string');
    expect(typeof presented.title).toBe('string');
    expect(typeof presented.description).toBe('string');
    expect(typeof presented.severity).toBe('string');
    expect(typeof presented.status).toBe('string');
    expect(typeof presented.cweId).toBe('string');
    expect(typeof presented.suggestedFix).toBe('string');
    expect(typeof presented.userId).toBe('string');
  });
}); 