import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  repository: any;
  async getData() {
    try {
      return { message: 'Hello from the Nest.js API!' };
    } catch (error) {
      throw error;
    }
  }
}