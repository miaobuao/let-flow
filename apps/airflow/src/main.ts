import { Logger, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { exec } from 'child_process';

const APP_NAME = 'Airflow';
const PORT = process.env.development ? 8081 : 8081;
const CONFIG = {
  development: {
    OPENAPI_OUTPUT_PATH: 'packages/@let-flow/airflow',
    OPENAPI_DOCS_URL: `http://localhost:${PORT}/docs`,
  },
  production: {},
};

const GLOBAL_PREFIX = process.env.API_PREFIX || 'api';

async function bootstrap() {
  const config = CONFIG[process.env.NODE_ENV];
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (process.env.NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(APP_NAME)
        .setVersion('1.0')
        .addTag('user')
        .build(),
      {
        operationIdFactory: (type, method) => method,
      }
    );
    SwaggerModule.setup('docs', app, document);
    exec(
      `
          npx openapi-generator-cli generate \
          -i  ${config.OPENAPI_DOCS_URL}-yaml \
          -o ${config.OPENAPI_OUTPUT_PATH} \
          -g typescript-axios \
          --additional-properties=supportsES6=true,npmVersion=9.8.1,typescriptThreePlus=true
      `,
      () => {
        Logger.log(`⭐ API generated`);
      }
    );
    Logger.log(`🚀 Swagger: ${config.OPENAPI_DOCS_URL}`);
  }

  await app.listen(PORT);
  Logger.log(
    `\n🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`
  );
}
bootstrap();
