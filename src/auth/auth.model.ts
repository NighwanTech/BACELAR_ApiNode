import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
};

@Injectable()
export class AuthModel {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findSafeUserById(id: string): Promise<SafeUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  }

  async createUser(data: {
    fullName: string;
    email: string;
    password: string;
  }) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  }
}