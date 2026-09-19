import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResultDeclarationService } from './result-declaration.service';

@Controller()
export class ResultDeclarationController {
  constructor(private readonly resultDeclarationService: ResultDeclarationService) {}

  @MessagePattern({ cmd: 'declare_result_declaration' })
  async declare(@Payload() data: any) {
    try {
      return await this.resultDeclarationService.declare(data);
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'find_all_result_declarations' })
  async findAll(@Payload() data?: any) {
    try {
      return await this.resultDeclarationService.findAll(data || {});
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'find_one_result_declaration' })
  async findOne(@Payload() data: { resultDeclarationId: number }) {
    try {
      return await this.resultDeclarationService.findOne(data.resultDeclarationId);
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 404,
      };
    }
  }

  @MessagePattern({ cmd: 'list_current_result_declarations_public' })
  async listCurrentPublic() {
    try {
      return await this.resultDeclarationService.listCurrentPublic();
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'list_previous_result_sessions_public' })
  async listPreviousSessionsPublic() {
    try {
      return await this.resultDeclarationService.listPreviousSessionsPublic();
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'list_previous_result_declarations_public' })
  async listPreviousBySessionPublic(@Payload() data: { academicSessionId: number }) {
    try {
      return await this.resultDeclarationService.listPreviousBySessionPublic(
        data.academicSessionId,
      );
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'get_public_result_marksheet' })
  async getPublicMarksheet(
    @Payload() data: { rollNo: string; resultDeclarationId: number },
  ) {
    try {
      return await this.resultDeclarationService.getPublicMarksheet(data);
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 404,
      };
    }
  }

  @MessagePattern({ cmd: 'archive_result_declaration' })
  async archive(@Payload() data: { resultDeclarationId: number; UpdatedBy?: string }) {
    try {
      return await this.resultDeclarationService.archive(
        data.resultDeclarationId,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'delete_result_declaration' })
  async softDelete(
    @Payload() data: { resultDeclarationId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.resultDeclarationService.softDelete(
        data.resultDeclarationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }
}
