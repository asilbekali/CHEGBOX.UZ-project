import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserStatus, Role } from '@prisma/client';
import { authenticator } from 'otplib';

const DeviceDetector = require('device-detector-js');

@Injectable()
export class UserService {
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailService,
    private readonly jwt: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Email already exists');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: dto.region },
      });
      if (!region) {
        throw new BadRequestException('Region not found');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          full_name: dto.full_name,
          email: dto.email,
          password: hashedPassword,
          phone: dto.phone,
          role: Role.USER,
          regionId: dto.region,
          status: UserStatus.noActive,
        },
      });

      authenticator.options = { step: 1200 };
      const secret = authenticator.generateSecret();
      const otp = authenticator.generate(secret);

      await this.mailer.sendEmail(user.email, 'Your OTP code', otp);

      console.log(otp);

      this.otpStore.set(user.email, {
        otp,
        expiresAt: Date.now() + 20 * 60 * 1000,
      });

      return {
        message: `OTP sent to ${user.email}. Please verify your account.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Registration error',
      );
    }
  }

  async registerAdmin(dto: CreateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Email already exists');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: dto.region },
      });
      if (!region) {
        throw new BadRequestException('Region not found');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          full_name: dto.full_name,
          email: dto.email,
          password: hashedPassword,
          phone: dto.phone,
          role: Role.ADMIN,
          regionId: dto.region,
          status: UserStatus.noActive,
        },
      });

      authenticator.options = { step: 1200 };
      const secret = authenticator.generateSecret();
      const otp = authenticator.generate(secret);

      await this.mailer.sendEmail(user.email, 'Your OTP code', otp);

      console.log(otp);

      this.otpStore.set(user.email, {
        otp,
        expiresAt: Date.now() + 20 * 60 * 1000,
      });

      return {
        message: `OTP sent to ${user.email}. Please verify your account.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Registration error',
      );
    }
  }

  async registerSupperAdmin(dto: CreateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Email already exists');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: dto.region },
      });
      if (!region) {
        throw new BadRequestException('Region not found');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          full_name: dto.full_name,
          email: dto.email,
          password: hashedPassword,
          phone: dto.phone,
          role: Role.SUPER_ADMIN,
          regionId: dto.region,
          status: UserStatus.noActive,
        },
      });

      authenticator.options = { step: 1200 };
      const secret = authenticator.generateSecret();
      const otp = authenticator.generate(secret);

      await this.mailer.sendEmail(user.email, 'Your OTP code', otp);

      console.log(otp);

      this.otpStore.set(user.email, {
        otp,
        expiresAt: Date.now() + 20 * 60 * 1000,
      });

      return {
        message: `OTP sent to ${user.email}. Please verify your account.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Registration error',
      );
    }
  }



    async registerSeller(dto: CreateUserDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Email already exists');
      }

      const region = await this.prisma.region.findUnique({
        where: { id: dto.region },
      });
      if (!region) {
        throw new BadRequestException('Region not found');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          full_name: dto.full_name,
          email: dto.email,
          password: hashedPassword,
          phone: dto.phone,
          role: Role.SELLER,
          regionId: dto.region,
          status: UserStatus.noActive,
        },
      });

      authenticator.options = { step: 1200 };
      const secret = authenticator.generateSecret();
      const otp = authenticator.generate(secret);

      await this.mailer.sendEmail(user.email, 'Your OTP code', otp);

      console.log(otp);

      this.otpStore.set(user.email, {
        otp,
        expiresAt: Date.now() + 20 * 60 * 1000,
      });

      return {
        message: `OTP sent to ${user.email}. Please verify your account.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Registration error',
      );
    }
  }


  async verify(email: string, otp: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('User not found');

      const stored = this.otpStore.get(email);
      if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      await this.prisma.user.update({
        where: { email },
        data: { status: UserStatus.active },
      });

      this.otpStore.delete(email);
      return { message: 'Account successfully verified' };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Verification error',
      );
    }
  }

  async login(password: string, email: string, req: Request) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('User not found');
      if (user.status === UserStatus.noActive) {
        throw new BadRequestException('Please verify your account first');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new BadRequestException('Incorrect password');

      const accessToken = this.getAccessToken(user);
      const refreshToken = this.getRefreshToken(user);

      await this.logDeviceInfo(req, user.id);

      return {
        accessToken,
        refreshToken,
        message: 'Successfully logged in',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Login error');
    }
  }

  getAccessToken(user: any) {
    return this.jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      { expiresIn: '1h' },
    );
  }

  getRefreshToken(user: any) {
    return this.jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      { expiresIn: '7d' },
    );
  }

  async resentOtp(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('User not found');

      authenticator.options = { step: 1200 };
      const secret = authenticator.generateSecret();
      const otp = authenticator.generate(secret);

      this.otpStore.set(email, {
        otp,
        expiresAt: Date.now() + 20 * 60 * 1000,
      });

      await this.mailer.sendEmail(email, 'Your OTP code', otp);
      return { message: 'OTP resent successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'OTP error');
    }
  }

  async resentAccessToken(password: string, email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new BadRequestException('Incorrect password');

      return { accessToken: this.getAccessToken(user) };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Token resend error',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          full_name: true,
          email: true,
          phone: true,
          role: true,
          status: true,
          regionId: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      if (!id || isNaN(id)) throw new BadRequestException('Invalid ID');
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      const data = Object.fromEntries(
        Object.entries(dto).filter(([_, v]) => v !== undefined),
      );

      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      await this.prisma.user.delete({ where: { id } });
      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async myProfileService(req: Request) {
    try {
      const userId = req['user']?.id;
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async logDeviceInfo(req: Request, userId?: number) {
    try {
      const ip =
        req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
        req.socket.remoteAddress ||
        'Unknown IP';

      const userAgent = req.headers['user-agent'] || '';
      const detector = new DeviceDetector();
      const device = detector.parse(userAgent);

      const deviceName =
        device.device?.type || device.client?.name || 'Unknown device';

      const exists = await this.prisma.mySession.findFirst({
        where: { deviceIP: ip },
      });
      if (exists) return exists;

      return await this.prisma.mySession.create({
        data: {
          deviceIP: ip,
          deviceName,
          userId: userId || undefined,
        },
      });
    } catch (error) {
      console.error('Device log error:', error.message);
    }
  }
}
