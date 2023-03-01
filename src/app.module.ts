import { Module }              from '@nestjs/common';
import { ConfigModule }        from '@nestjs/config';
import appConfig               from '@core/environment/app.config';
import authConfig              from '@core/environment/auth.config';
import databaseConfig          from '@core/environment/database.config';
import rabbitMqConfig          from '@core/environment/rabbit-mq.config';
import { TypeOrmConfigModule } from '@core/typeorm/typeorm.module';
import { SubtaskModule }       from '@modules/subtask/subtask.module';
import { AppController }       from './app.controller';
import { AppService }          from './app.service';

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
    TypeOrmConfigModule,
    SubtaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
