import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DailyRotateFile = require("winston-daily-rotate-file");

import {NestjsWinstonLoggerService,} from 'nestjs-winston-logger';

import { format, transports, Logger } from 'winston';
//import { HelmetMiddleware } from '@nest-middlewares/helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(HelmetMiddleware);

  const logger = new NestjsWinstonLoggerService({
    format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.json(),
    format.colorize({ all: true }),
  ),

  transports: [
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      level: 'error'
    }),
    new DailyRotateFile({
      filename: 'logs/info-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      level: 'info'
    })
  ]
});
app.useLogger(logger);

const port = process.env.PORT || 4000;
await app.listen(port).then(() => {
  console.log(`server running on ${port}`);
});

}

bootstrap();