// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or postgres/sqlite etc.
      host: 'localhost',
      port: 3306,
      username: 'erishkarl',
      password: 'erish1024',
      database: 'todo_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule, // 👈 important
  ],
})
export class AppModule {}
