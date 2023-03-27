import { NestFactory, Reflector }         from '@nestjs/core';
import { Logger, ValidationPipe }         from '@nestjs/common';
import { ConfigService }                  from '@nestjs/config';
import { Transport }                      from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor }            from '@core/interceptor/response.interceptor';
import { GlobalExceptionFilter }          from '@core/filter/typeorm.filter';
import { AppModule }                      from './app.module';

function configurateSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle('APPLI MS FOR PROJECTS')
    .setDescription('Microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // http://localhost:port/docs
}

async function bootstrap() {
  const logger = new Logger('ApplicationLoader');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({origin: '*'});

  configurateSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true,                    // Ignorar datos que no esten en los DTO
        forbidNonWhitelisted: true,         // Lanzar error si existen datos prohibidos
        disableErrorMessages: true,         // Desabilitar mensajes de error (producción)
        transform: true,                    // Transformar datos
        transformOptions: {                 // Opciones de transformación
          enableImplicitConversion: true    // Habilitar conversión implicita
        }
      })
  );

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4010
    }
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('app.port') || parseInt(process.env.PORT) || 3000);
  logger.log(`🚀 User service running on port ${ configService.get('app.port') }`);
}

bootstrap();
