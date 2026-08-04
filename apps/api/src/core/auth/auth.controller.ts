import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success } from '@universityos/common';
import { FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Req() req: FastifyRequest) {
    const ip = req.ip;
    const ua = req.headers['user-agent'];
    const data = await this.authService.login(dto, ip, ua);
    return success(data, 'Login successful');
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto, @Req() req: FastifyRequest) {
    const tenantId =
      (req.headers['x-tenant-id'] as string) || dto.tenantId || '';
    const data = await this.authService.register(dto, tenantId);
    return success(data, 'Registration successful');
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto) {
    const data = await this.authService.refresh(dto);
    return success(data, 'Token refreshed');
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser('id') userId: string) {
    const data = await this.authService.logout(userId);
    return success(data, 'Logged out successfully');
  }

  @Get('profile')
  async profile(@CurrentUser('id') userId: string) {
    const data = await this.authService.getProfile(userId);
    return success(data, 'Profile retrieved');
  }
}
