import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';

@Module({
  imports: [PrismaModule],
  controllers: [TestimonialController],
  providers: [TestimonialService],
  exports: [TestimonialService],
})
export class TestimonialModule {}
