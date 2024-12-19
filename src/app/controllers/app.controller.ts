import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../../domain/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('list')
  list(): string {
    return this.appService.list();
  }
}
