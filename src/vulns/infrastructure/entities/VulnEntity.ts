import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

@Entity('vulns')
export class VulnEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: VulnSeverity,
    default: VulnSeverity.LOW
  })
  severity: VulnSeverity;

  @Column({
    type: 'enum',
    enum: VulnStatus,
    default: VulnStatus.PENDING_FIX
  })
  status: VulnStatus;

  @Column()
  cweId: string;

  @Column()
  userId: string;

  @Column('text')
  suggestedFix: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Mapper methods
  static fromDomain(vuln: Vuln): VulnEntity {
    const entity = new VulnEntity();
    entity.id = vuln.getId();
    entity.title = vuln.getTitle();
    entity.description = vuln.getDescription();
    entity.severity = vuln.getSeverity();
    entity.status = vuln.getStatus();
    entity.cweId = vuln.getCweId();
    entity.userId = vuln.getUserId();
    entity.suggestedFix = vuln.getSuggestedFix();
    entity.createdAt = vuln.getCreatedAt();
    entity.updatedAt = vuln.getUpdatedAt();
    return entity;
  }

  toDomain(): Vuln {
    return new Vuln(
      this.id,
      this.title,
      this.description,
      this.severity,
      this.status,
      this.createdAt,
      this.updatedAt,
      this.cweId,
      this.suggestedFix,
      this.userId
    );
  }
} 