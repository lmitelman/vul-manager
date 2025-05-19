import { VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

export class CreateVulnDTO {
  title: string;
  description: string;
  severity: VulnSeverity;
  cweId: string;
  suggestedFix: string;
  userId: string;
  status: VulnStatus;
} 