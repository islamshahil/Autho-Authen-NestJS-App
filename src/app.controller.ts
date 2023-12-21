import { Controller, Get, Put, Delete, Param, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from './logging/logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor) 
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  async getallUsers(): Promise<User[]> {
    return this.appService.getallUsers();
  }

  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.appService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updatePassword(
    @Param('id')
    id: string,
    @Body()
    password: { password: string },
  ): Promise<User> {
    return this.appService.updateById(id, password.password);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<String> {
    return this.appService.deleteById(id);
  }


}
