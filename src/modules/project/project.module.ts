import { Module } from '@nestjs/common';

// import { AUTH_CLIENT }       from '@domain/constants/main.constant';
import { ProjectService }          from './project.service';
import { ProjectController }       from './project.controller';
import { TypeOrmModule }           from '@nestjs/typeorm';
import { Project, ProjectComment } from '@modules/project/entities';
import { ProjectCommentService }   from '@modules/project/project-comment.service';
import { CommentModule }           from '@modules/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectComment]),
    CommentModule
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
  providers: [ProjectService, ProjectCommentService]
})
export class ProjectModule {}
