import { Module } from '@nestjs/common';

// import { AUTH_CLIENT }       from '@domain/constants/main.constant';
import { ProjectService }    from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { Project }           from '@modules/project/entities/project.entity';
import { ProjectComment }    from '@modules/project/entities/project-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectComment])
    // ClientsModule.registerAsync([
    //   {
    //     name: AUTH_CLIENT,
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => {
    //       return {
    //         transport: Transport.TCP,
    //         options: {
    //           host: configService.get<string>('client.auth.host'),
    //           port: configService.get<number>('client.auth.port'),
    //         }
    //       };
    //     },
    //     inject: [ConfigService],
    //   }
    // ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
