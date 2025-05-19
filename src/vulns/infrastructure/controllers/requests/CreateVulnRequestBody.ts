import { VulnSeverity } from '@vulns/domain/entities/Vuln';
import { IsString, IsNotEmpty, IsEnum, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateVulnRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsEnum(VulnSeverity)
  severity: VulnSeverity;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'CWE ID must be a number' })
  cweId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  suggestedFix: string;
}