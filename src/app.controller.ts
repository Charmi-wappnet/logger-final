import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api/example')
export class AppController {
  getHello: any;
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    try {
      const data = await this.appService.getData();
      return data;
    } catch (error) {
      throw new HttpException({
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}