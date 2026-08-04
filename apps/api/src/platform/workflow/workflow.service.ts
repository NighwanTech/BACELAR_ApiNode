import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';
import { RabbitRoutingKeys } from '../../core/rabbit/rabbit.constants';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitService,
  ) {}

  async create(tenantId: string, dto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        tenantId,
        name: dto.name,
        code: dto.code,
        module: dto.module,
        entityType: dto.entityType,
        definition: dto.definition as any,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.module) where.module = query.module;
    if (query.entityType) where.entityType = query.entityType;

    const [items, total] = await Promise.all([
      this.prisma.workflow.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.workflow.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    return this.prisma.workflow.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
  }

  async update(tenantId: string, id: string, dto: Partial<CreateWorkflowDto>) {
    await this.findById(tenantId, id);
    return this.prisma.workflow.update({
      where: { id },
      data: {
        name: dto.name,
        code: dto.code,
        module: dto.module,
        entityType: dto.entityType,
        definition: dto.definition as any,
        isActive: dto.isActive,
      },
    });
  }

  async start(tenantId: string, workflowCode: string, entityType: string, entityId: string, createdById: string) {
    const workflow = await this.prisma.workflow.findFirst({
      where: { tenantId, code: workflowCode, deletedAt: null },
    });
    if (!workflow) {
      throw new Error(`Workflow '${workflowCode}' not found`);
    }
    const definition: any = workflow.definition || {};
    const initialState = definition.initialState || 'start';

    const instance = await this.prisma.workflowInstance.create({
      data: {
        tenantId,
        workflowId: workflow.id,
        entityType,
        entityId,
        currentState: initialState,
        states: { history: [] },
        createdById,
        status: 'IN_PROGRESS',
      },
    });

    await this.rabbit.publish(RabbitRoutingKeys.WORKFLOW_STARTED, {
      workflowInstanceId: instance.id,
      tenantId,
      entityType,
      entityId,
    });

    return instance;
  }

  async transition(tenantId: string, instanceId: string, action: string, performedById: string, comment?: string) {
    const instance = await this.prisma.workflowInstance.findFirst({
      where: { id: instanceId, tenantId },
    });
    if (!instance) throw new Error('Workflow instance not found');

    const workflow = await this.prisma.workflow.findUnique({
      where: { id: instance.workflowId || '' },
    });
    const definition: any = workflow?.definition || {};
    const current = definition.states?.[instance.currentState];

    const nextState = current?.transitions?.[action];
    if (!nextState) {
      throw new Error(`No transition '${action}' from state '${instance.currentState}'`);
    }

    const states: any = instance.states || {};
    const history = states.history || [];
    history.push({
      from: instance.currentState,
      action,
      to: nextState,
      by: performedById,
      at: new Date().toISOString(),
      comment,
    });

    const isFinal = definition.finalStates?.includes(nextState);
    const updated = await this.prisma.workflowInstance.update({
      where: { id: instanceId },
      data: {
        currentState: nextState,
        states: { history },
        status: isFinal ? 'COMPLETED' : 'IN_PROGRESS',
        completedAt: isFinal ? new Date() : undefined,
      },
    });

    return updated;
  }

  async getInstances(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.entityType) where.entityType = query.entityType;
    if (query.entityId) where.entityId = query.entityId;
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.workflowInstance.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.workflowInstance.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async delete(tenantId: string, id: string) {
    await this.prisma.workflow.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
