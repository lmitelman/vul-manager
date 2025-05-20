import { VulnSeverity } from '@vulns/domain/entities/Vuln';
import { VulnStatus } from '@vulns/domain/entities/Vuln';
import { IsString, IsNotEmpty, IsEnum, Matches, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateVulnRequestBody {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsEnum(VulnSeverity)
  severity?: VulnSeverity;

  @IsOptional()
  @IsEnum(VulnStatus)
  status?: VulnStatus;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'CWE ID must be a number' })
  cweId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  suggestedFix?: string;
}