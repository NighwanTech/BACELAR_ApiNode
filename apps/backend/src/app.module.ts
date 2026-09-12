import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { MasterModule } from './master/master.module';
import { WebsiteModule } from './website/website.module';
import { AdminModule } from './admin/admin.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { ResultDeclarationModule } from './result-declaration/result-declaration.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudentsModule,
    MasterModule,
    WebsiteModule,
    AdminModule,
    ExamResultModule,
    ResultDeclarationModule,
    PromotionModule,
  ],
  controllers: [],
})
export class AppModule {}
