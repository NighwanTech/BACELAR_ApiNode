import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentAttachmentController } from './student-attachment.controller';
import { StorageModule } from '../../shared/storage/storage.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: Number(process.env.TCP_PORT) || 4001,
        },
      },
    ]),
    StorageModule,
  ],
  controllers: [StudentAttachmentController],
})
export class StudentAttachmentModule {}
