import { Injectable }                                  from '@nestjs/common';
import { ConfigService }                               from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path                                       from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.configService.get('database'));
    console.log(path.join(path.resolve(__dirname), '..', '..', '**', '*.entity{.ts,.js}'));
    return {
      type: this.configService.get('database.type'),
      // url: this.configService.get('database.url'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.user'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.name'),
      synchronize: this.configService.get<boolean>('database.synchronize'),
      dropSchema: false,
      keepConnectionAlive: true,
      // logging: this.configService.get('app.nodeEnv') !== 'production',
      entities: [path.join(path.resolve(__dirname), '..', '..', '**', '*.entity{.ts,.js}')],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/infrastructure/config/typeorm/migrations',
        subscribersDir: 'subscriber',
      },
      // extra: {
      //   // based on https://node-postgres.com/api/pool
      //   // max connection pool size
      //   max: this.configService.get('database.maxConnections'),
      //   ssl: this.configService.get('database.sslEnabled')
      //     ? {
      //       rejectUnauthorized: this.configService.get(
      //         'database.rejectUnauthorized',
      //       ),
      //       ca: this.configService.get('database.ca') ?? undefined,
      //       key: this.configService.get('database.key') ?? undefined,
      //       cert: this.configService.get('database.cert') ?? undefined,
      //     }
      //     : undefined,
      // },
    } as TypeOrmModuleOptions;
  }
}
