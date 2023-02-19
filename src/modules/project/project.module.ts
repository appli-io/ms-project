import { Module }                      from '@nestjs/common';
import { ClientsModule, Transport }    from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AUTH_CLIENT }       from '@domain/constants/main.constant';
import { ProjectService }    from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [ClientsModule.registerAsync([
    {
      name: AUTH_CLIENT,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('client.auth.host'),
            port: configService.get<number>('client.auth.port'),
          }
        };
      },
      inject: [ConfigService],
    }
  ])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
