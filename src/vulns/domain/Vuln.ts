export class Vuln {
  constructor(
    private readonly id: string,
    private title: string,
    private description: string,
    private severity: VulnSeverity,
    private status: VulnStatus,
    private createdAt: Date,
    private updatedAt: Date,
    private cweId: string,
    private suggestedFix: string,
  ) {}

  // Getters
  getId(): string { return this.id; }
  getTitle(): string { return this.title; }
  getDescription(): string { return this.description; }
  getSeverity(): VulnSeverity { return this.severity; }
  getStatus(): VulnStatus { return this.status; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }
  getCweId(): string { return this.cweId; }
  getSuggestedFix(): string { return this.suggestedFix; }

  // Business methods
  updateDetails(
    title: string, 
    description: string, 
    severity: VulnSeverity,
    cweId: string,
    suggestedFix: string
  ): void {
    this.title = title;
    this.description = description;
    this.severity = severity;
    this.cweId = cweId;
    this.suggestedFix = suggestedFix;
    this.updatedAt = new Date();
  }

  updateStatus(status: VulnStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}

export enum VulnSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum VulnStatus {
  PENDING_FIX = 'PENDING_FIX',
  IN_PROGRESS = 'IN_PROGRESS',
  SOLVED = 'SOLVED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
} 