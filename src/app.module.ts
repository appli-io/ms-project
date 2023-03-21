import { Module }        from '@nestjs/common';
import { ConfigModule }  from '@nestjs/config';
import appConfig         from '@core/environment/app.config';
import authConfig        from '@core/environment/auth.config';
import databaseConfig    from '@core/environment/database.config';
import rabbitMqConfig    from '@core/environment/rabbit-mq.config';
import { CommentModule } from '@modules/comment/comment.module';
import { SubtaskModule } from '@modules/subtask/subtask.module';
import { AppController } from './app.controller';
import { AppService }    from './app.service';
import { ProjectModule } from '@modules/project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpicModule }    from '@modules/epic/epic.module';
import { TaskModule }    from '@modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
        databaseConfig,
        rabbitMqConfig
      ]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    // TypeOrmConfigModule,
    ProjectModule,
    SubtaskModule,
    CommentModule,
    EpicModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
