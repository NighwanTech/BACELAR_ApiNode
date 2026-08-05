import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { compare, hash } from 'bcrypt';
import { createResponse } from '../common/response';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthModel } from './auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authModel: AuthModel,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a user with a hashed password and returns the public user data.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'Registration successful',
    schema: {
      example: {
        success: true,
        message: 'Registration successful',
        data: {
          id: 'b3e2c6f5-7f2a-4b4d-8f61-0e0a8f9d4f33',
          fullName: 'John Doe',
          email: 'john@example.com',
        },
      },
    },
  })
  async register(@Body() body: RegisterDto) {
    const existingUser = await this.authModel.findUserByEmail(body.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await hash(body.password, 10);

    const user = await this.authModel.createUser({
      fullName: body.fullName,
      email: body.email,
      password: passwordHash,
    });

    return createResponse('Registration successful', user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login with email and password',
    description: 'Validates the user credentials and returns a JWT access token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Login successful',
    schema: {
      example: {
        success: true,
        message: 'Login successful',
        data: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 'b3e2c6f5-7f2a-4b4d-8f61-0e0a8f9d4f33',
            fullName: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    },
  })
  async login(@Body() body: LoginDto) {
    const user = await this.authModel.findUserByEmail(body.email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    });

    return createResponse('Login successful', {
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get the logged-in user profile',
    description: 'Protected endpoint used to verify JWT authentication in Swagger.',
  })
  @ApiOkResponse({
    description: 'Profile fetched successfully',
    schema: {
      example: {
        success: true,
        message: 'Profile fetched successfully',
        data: {
          user: {
            id: 'b3e2c6f5-7f2a-4b4d-8f61-0e0a8f9d4f33',
            fullName: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    },
  })
  async profile(@Req() request: any) {
    return createResponse('Profile fetched successfully', {
      user: request.user,
    });
  }
}