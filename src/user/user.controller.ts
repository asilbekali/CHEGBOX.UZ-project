import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { RoleDec } from './decorator/roles.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Register yangi foydalanuvchi
  @Post('register-user')
  register_user(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('register-admin')
  register_admin(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerAdmin(createUserDto);
  }

  @Post('register-super-admin')
  register_super_admin(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerSupperAdmin(createUserDto);
  }

  @Post('register-seller')
  register_seller(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerSeller(createUserDto);
  }

  // ✅ Foydalanuvchini OTP orqali tasdiqlash
  @Post('verify')
  verify(@Query('email') email: string, @Query('otp') otp: string) {
    return this.userService.verify(email, otp);
  }

  // ✅ Login qilish
  @Post('login')
  login(
    @Query('email') email: string,
    @Query('password') password: string,
    @Req() req: Request,
  ) {
    return this.userService.login(password, email, req);
  }

  // ✅ Qayta OTP yuborish
  @Post('resend-otp')
  resendOtp(@Query('email') email: string) {
    return this.userService.resentOtp(email);
  }

  // ✅ Access tokenni qayta yuborish (refresh emas!)
  @Post('resend-access-token')
  resendAccessToken(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.userService.resentAccessToken(password, email);
  }

  @UseGuards(AuthGuard)
  @Get('me/profile')
  myProfile(@Req() req: Request) {
    return this.userService.myProfileService(req);
  }

  @UseGuards(AuthGuard)
  // ✅ Barcha foydalanuvchilar ro‘yxati
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // ✅ ID orqali bitta foydalanuvchini olish
  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a number');
    }
    return this.userService.findOne(parsedId);
  }

  // ✅ ID orqali foydalanuvchini yangilash
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a number');
    }
    return this.userService.update(parsedId, updateUserDto);
  }

  // ✅ ID orqali foydalanuvchini o‘chirish
  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException('ID must be a number');
    }
    return this.userService.remove(parsedId);
  }
}
