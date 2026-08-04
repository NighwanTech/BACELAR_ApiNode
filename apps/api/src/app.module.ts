import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from './core/database/database.module';
import { RedisModule } from './core/redis/redis.module';
import { RabbitModule } from './core/rabbit/rabbit.module';
import { StorageModule } from './core/storage/storage.module';
import { SearchModule } from './core/search/search.module';
import { HealthModule } from './core/health/health.module';
import { TenantModule } from './platform/tenant/tenant.module';
import { IdentityModule } from './platform/identity/identity.module';
import { FeatureFlagModule } from './platform/feature-flag/feature-flag.module';
import { ConfigurationModule } from './platform/configuration/configuration.module';
import { AuditModule } from './platform/audit/audit.module';
import { NotificationModule } from './platform/notification/notification.module';
import { DocumentModule } from './platform/document/document.module';
import { MediaModule } from './platform/media/media.module';
import { WorkflowModule } from './platform/workflow/workflow.module';
import { AcademicModule } from './modules/academic/academic.module';
import { AdmissionModule } from './modules/admission/admission.module';
import { StudentModule } from './modules/student/student.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { ExaminationModule } from './modules/examination/examination.module';
import { FinanceModule } from './modules/finance/finance.module';
import { LibraryModule } from './modules/library/library.module';
import { LmsModule } from './modules/lms/lms.module';
import { CmsModule } from './modules/cms/cms.module';
import { HrModule } from './modules/hr/hr.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { TransportModule } from './modules/transport/transport.module';
import { PlacementModule } from './modules/placement/placement.module';
import { ResearchModule } from './modules/research/research.module';
import { CommitteeModule } from './modules/committee/committee.module';
import { ReportModule } from './modules/report/report.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { DeveloperModule } from './platform/developer/developer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL', 60000),
            limit: config.get<number>('THROTTLE_LIMIT', 100),
          },
        ],
      }),
    }),
    DatabaseModule,
    RedisModule,
    RabbitModule,
    StorageModule,
    SearchModule,
    HealthModule,
    AuthModule,
    DeveloperModule,
    TenantModule,
    IdentityModule,
    FeatureFlagModule,
    ConfigurationModule,
    AuditModule,
    NotificationModule,
    DocumentModule,
    MediaModule,
    WorkflowModule,
    AcademicModule,
    AdmissionModule,
    StudentModule,
    FacultyModule,
    ExaminationModule,
    FinanceModule,
    LibraryModule,
    LmsModule,
    CmsModule,
    HrModule,
    HostelModule,
    TransportModule,
    PlacementModule,
    ResearchModule,
    CommitteeModule,
    ReportModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
