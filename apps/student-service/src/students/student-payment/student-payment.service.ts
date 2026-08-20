import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import * as crypto from 'crypto';
// CommonJS export — keep require() so Nest/webpack resolves the constructor reliably
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Razorpay = require('razorpay');

function cleanEnv(value?: string | null): string {
  return String(value || '')
    .trim()
    .replace(/^['"]|['"]$/g, '');
}

function joinAddressParts(parts: Array<string | null | undefined>): string {
  return parts
    .map((p) => String(p || '').trim())
    .filter(Boolean)
    .join(', ');
}

/** Merge correspondence + permanent address lines into one snapshot string. */
export function mergeStudentAddresses(profile: {
  CaddressLine1?: string | null;
  CaddressLine2?: string | null;
  CaddressLine3?: string | null;
  Ccity?: string | null;
  Cstate?: string | null;
  Cpincode?: string | null;
  PaddressLine1?: string | null;
  PaddressLine2?: string | null;
  PaddressLine3?: string | null;
  Pcity?: string | null;
  Pstate?: string | null;
  Ppincode?: string | null;
} | null | undefined): string | null {
  if (!profile) return null;

  const correspondence = joinAddressParts([
    profile.CaddressLine1,
    profile.CaddressLine2,
    profile.CaddressLine3,
    profile.Ccity,
    profile.Cstate,
    profile.Cpincode,
  ]);
  const permanent = joinAddressParts([
    profile.PaddressLine1,
    profile.PaddressLine2,
    profile.PaddressLine3,
    profile.Pcity,
    profile.Pstate,
    profile.Ppincode,
  ]);

  const blocks: string[] = [];
  if (correspondence) blocks.push(`Correspondence: ${correspondence}`);
  if (permanent) blocks.push(`Permanent: ${permanent}`);
  return blocks.length ? blocks.join(' | ') : null;
}

export function extractBankRrnNo(
  gatewayResponse?: string | null,
  razorpayPayment?: any,
): string | null {
  const candidates: unknown[] = [
    razorpayPayment?.acquirer_data?.rrn,
    razorpayPayment?.acquirer_data?.bank_transaction_id,
    razorpayPayment?.acquirer_data?.auth_code,
  ];

  if (gatewayResponse) {
    try {
      const parsed = JSON.parse(gatewayResponse);
      candidates.push(
        parsed?.acquirer_data?.rrn,
        parsed?.acquirer_data?.bank_transaction_id,
        parsed?.rrn,
        parsed?.bankRrnNo,
        parsed?.bank_rrn,
      );
    } catch {
      // ignore non-JSON gateway payload
    }
  }

  for (const value of candidates) {
    const s = String(value || '').trim();
    if (s) return s.slice(0, 100);
  }
  return null;
}

export function extractErrorMessage(error: unknown): string {
  if (!error) return 'Unknown error';
  if (typeof error === 'string') return error;

  const err = error as {
    message?: unknown;
    error?: { description?: string; code?: string };
    response?: { message?: string | string[] };
    getResponse?: () => string | { message?: string | string[] };
  };

  if (typeof err.error?.description === 'string' && err.error.description) {
    return err.error.description;
  }

  if (typeof err.message === 'string' && err.message.trim()) {
    return err.message;
  }

  if (typeof err.getResponse === 'function') {
    const response = err.getResponse();
    if (typeof response === 'string' && response.trim()) return response;
    if (response && typeof response === 'object') {
      const msg = response.message;
      if (typeof msg === 'string' && msg.trim()) return msg;
      if (Array.isArray(msg)) return msg.join(', ');
    }
  }

  if (typeof err.response?.message === 'string' && err.response.message.trim()) {
    return err.response.message;
  }
  if (Array.isArray(err.response?.message)) {
    return err.response.message.join(', ');
  }

  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

@Injectable()
export class StudentPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  private getRazorpayClient() {
    const keyId = cleanEnv(process.env.RAZORPAY_KEY_ID);
    const keySecret = cleanEnv(process.env.RAZORPAY_KEY_SECRET);
    if (!keyId || !keySecret) {
      throw new BadRequestException(
        'Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env and restart the API.',
      );
    }
    if (keyId.includes('replace_me') || keySecret.includes('replace_me')) {
      throw new BadRequestException(
        'Replace placeholder Razorpay keys in BACELAR_ApiNode/.env with your test keys, then restart npm run start:dev:all',
      );
    }
    return {
      keyId,
      client: new Razorpay({ key_id: keyId, key_secret: keySecret }),
    };
  }

  private async loadStudentForPaymentSnapshot(studentId: number) {
    const student = await this.prisma.student.findFirst({
      where: { StudentRegistrationId: studentId, IsDeleted: false },
      include: {
        studentProfile: true,
        year: true,
        semester: true,
        program: true,
        admissionSession: true,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    return student;
  }

  private buildPaymentSnapshot(
    student: Awaited<ReturnType<StudentPaymentService['loadStudentForPaymentSnapshot']>>,
    extras?: {
      enrollNo?: string | null;
      bankRrnNo?: string | null;
      merchantOrderId?: string | null;
      paymentDateTime?: Date | null;
    },
  ) {
    return {
      registrationNo: student.registrationNo || null,
      studentName: student.candidateName || null,
      studentEmail: student.email || null,
      fatherName: student.fatherName || null,
      contactNo: student.mobileNo || null,
      addresses: mergeStudentAddresses(student.studentProfile),
      yearId: student.yearId ?? null,
      semesterId: student.semId ?? null,
      enrollNo: extras?.enrollNo ?? null,
      bankRrnNo: extras?.bankRrnNo ?? null,
      merchantOrderId: extras?.merchantOrderId ?? null,
      paymentDateTime: extras?.paymentDateTime ?? null,
    };
  }

  private async resolveFeeTypeId(feeTypeName?: string | null, feeTypeId?: number | null) {
    const feeTypeDb = (this.prisma as any).feeTypeMaster;
    if (feeTypeId) {
      const byId = await feeTypeDb.findFirst({
        where: { feeTypeId, IsDeleted: false },
      });
      return byId?.feeTypeId ?? null;
    }
    const name = String(feeTypeName || '').trim();
    if (!name) return null;
    const byName = await feeTypeDb.findFirst({
      where: { feeTypeName: name, IsDeleted: false },
    });
    return byName?.feeTypeId ?? null;
  }

  async create(data: any) {
    const studentId = Number(data.studentId);
    const student = await this.loadStudentForPaymentSnapshot(studentId);
    const snapshot = this.buildPaymentSnapshot(student, {
      enrollNo: data.enrollNo || null,
      bankRrnNo: data.bankRrnNo || null,
      merchantOrderId: data.merchantOrderId || null,
      paymentDateTime: data.paymentDateTime ? new Date(data.paymentDateTime) : new Date(),
    });
    const feeTypeId = await this.resolveFeeTypeId(data.feeType, data.feeTypeId);

    return this.prisma.studentPayment.create({
      data: {
        studentId,
        feeType: data.feeType,
        feeTypeId,
        amountPaid: Number(data.amountPaid),
        paymentStatus: data.paymentStatus || 'PENDING',
        ...snapshot,
        razorpayOrderId: data.razorpayOrderId || null,
        razorpayPaymentId: data.razorpayPaymentId || null,
        razorpaySignature: data.razorpaySignature || null,
        gatewayResponse: data.gatewayResponse || null,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
    });
  }

  async createRazorpayOrder(data: {
    studentId: number;
    feeType?: string;
    CreatedBy: string;
  }) {
    const studentId = Number(data.studentId);
    const feeType = (data.feeType || 'REGISTRATION').toUpperCase();

    const student = await this.loadStudentForPaymentSnapshot(studentId);
    if (!student.programId || !student.admissionSessionId) {
      throw new BadRequestException(
        'Student program and admission session must be saved before payment',
      );
    }

    const feeConfig = await this.prisma.programFeeConfig.findFirst({
      where: {
        programId: student.programId,
        admissionSessionId: student.admissionSessionId,
        IsDeleted: false,
        IsActive: true,
      },
    });
    if (!feeConfig) {
      throw new NotFoundException(
        `Fee configuration not found for program ${student.programId} and session ${student.admissionSessionId}`,
      );
    }

    const amount =
      feeType === 'EXAMINATION'
        ? Number(feeConfig.examinationFinal)
        : Number(feeConfig.registrationFinal);

    if (!amount || amount <= 0) {
      throw new BadRequestException(
        'Payable fee amount is zero. Use exemption flow instead of Razorpay.',
      );
    }

    const existingSuccess = await this.prisma.studentPayment.findFirst({
      where: {
        studentId,
        feeType,
        paymentStatus: 'SUCCESS',
        IsDeleted: false,
      },
    });
    if (existingSuccess) {
      throw new BadRequestException(
        `A successful ${feeType} payment already exists for this student`,
      );
    }

    const { keyId, client } = this.getRazorpayClient();
    const amountInPaise = Math.round(amount * 100);

    let order: { id: string };
    try {
      order = await client.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `stu_${studentId}_${Date.now()}`.slice(0, 40),
        notes: {
          studentId: String(studentId),
          feeType,
          registrationNo: student.registrationNo || '',
        },
      });
    } catch (err: unknown) {
      throw new BadRequestException(
        `Razorpay order failed: ${extractErrorMessage(err)}. If you just added keys, restart the API (npm run start:dev:all).`,
      );
    }

    if (!order?.id) {
      throw new BadRequestException('Razorpay did not return an order id');
    }

    const snapshot = this.buildPaymentSnapshot(student, {
      merchantOrderId: order.id,
      paymentDateTime: new Date(),
    });
    const feeTypeId = await this.resolveFeeTypeId(feeType);

    const payment = await this.prisma.studentPayment.create({
      data: {
        studentId,
        feeType,
        feeTypeId,
        amountPaid: amount,
        paymentStatus: 'PENDING',
        ...snapshot,
        razorpayOrderId: order.id,
        CreatedBy: data.CreatedBy,
        Remarks: `${feeType} fee order created`,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        student: {
          include: {
            program: { include: { programCategory: true } },
            admissionSession: true,
            year: true,
            semester: true,
          },
        },
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
    });

    return {
      paymentId: payment.paymentId,
      razorpayOrderId: order.id,
      amount,
      amountInPaise,
      currency: 'INR',
      keyId,
      feeType,
      student: payment.student,
    };
  }

  async verifyRazorpayPayment(data: {
    paymentId: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    UpdatedBy: string;
    gatewayResponse?: string;
  }) {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      throw new BadRequestException(
        'Razorpay keys are not configured. Set RAZORPAY_KEY_SECRET in .env',
      );
    }

    const payment = await this.findOne(Number(data.paymentId));
    if (payment.razorpayOrderId !== data.razorpayOrderId) {
      throw new BadRequestException('Order ID does not match payment record');
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== data.razorpaySignature) {
      await this.prisma.studentPayment.update({
        where: { paymentId: payment.paymentId },
        data: {
          paymentStatus: 'FAILED',
          razorpayPaymentId: data.razorpayPaymentId,
          razorpaySignature: data.razorpaySignature,
          gatewayResponse: data.gatewayResponse || null,
          UpdatedBy: data.UpdatedBy,
          Remarks: 'Razorpay signature verification failed',
        },
      });
      throw new BadRequestException('Payment signature verification failed');
    }

    const student = await this.loadStudentForPaymentSnapshot(payment.studentId);
    let razorpayPayment: any = null;
    try {
      const { client } = this.getRazorpayClient();
      razorpayPayment = await client.payments.fetch(data.razorpayPaymentId);
    } catch {
      // RRN is best-effort; verification itself already passed
    }

    const snapshot = this.buildPaymentSnapshot(student, {
      enrollNo: payment.enrollNo,
      bankRrnNo:
        extractBankRrnNo(data.gatewayResponse, razorpayPayment) ||
        payment.bankRrnNo ||
        null,
      merchantOrderId: payment.merchantOrderId || data.razorpayOrderId || null,
      paymentDateTime: new Date(),
    });

    return this.prisma.studentPayment.update({
      where: { paymentId: payment.paymentId },
      data: {
        paymentStatus: 'SUCCESS',
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature,
        gatewayResponse: data.gatewayResponse || null,
        ...snapshot,
        UpdatedBy: data.UpdatedBy,
        Remarks: 'Payment verified successfully via Razorpay',
      },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
    });
  }

  async findAll() {
    return this.prisma.studentPayment.findMany({
      where: { IsDeleted: false },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(paymentId: number) {
    const payment = await this.prisma.studentPayment.findFirst({
      where: { paymentId, IsDeleted: false },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
    });
    if (!payment) {
      throw new NotFoundException(`Payment record with ID ${paymentId} not found`);
    }
    return payment;
  }

  async findByStudent(studentId: number) {
    return this.prisma.studentPayment.findMany({
      where: { studentId, IsDeleted: false },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findByOrderId(razorpayOrderId: string) {
    const payment = await this.prisma.studentPayment.findFirst({
      where: { razorpayOrderId, IsDeleted: false },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment with Razorpay Order ID ${razorpayOrderId} not found`,
      );
    }
    return payment;
  }

  async update(paymentId: number, data: any) {
    await this.findOne(paymentId);

    return this.prisma.studentPayment.update({
      where: { paymentId },
      data: {
        paymentStatus: data.paymentStatus,
        amountPaid: data.amountPaid !== undefined ? Number(data.amountPaid) : undefined,
        feeType: data.feeType !== undefined ? data.feeType : undefined,
        feeTypeId: data.feeTypeId !== undefined ? Number(data.feeTypeId) || null : undefined,
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature,
        gatewayResponse: data.gatewayResponse,
        bankRrnNo: data.bankRrnNo !== undefined ? data.bankRrnNo : undefined,
        enrollNo: data.enrollNo !== undefined ? data.enrollNo : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        student: true,
        year: true,
        semester: true,
        feeTypeMaster: true,
      },
    });
  }

  async softDelete(paymentId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(paymentId);

    return this.prisma.studentPayment.update({
      where: { paymentId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.studentPayment.updateMany({
      where: {
        paymentId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} payment record(s)`,
      count: result.count,
    };
  }
}
