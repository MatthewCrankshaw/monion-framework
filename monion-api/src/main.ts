import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // If ssl keys are required for the server, uncomment the following lines
  // const httpsOptions = {
  //   key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
  //   cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8'),
  // };
  const httpsOptions = undefined;

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: ['http://127.0.0.1', 'http://localhost'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT_API || 3000);
}
bootstrap();
