// task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // 👈 Register entity here
  providers: [TaskService], // 👈 Provide service
  controllers: [TaskController], // 👈 Register controller
  exports: [TaskService], // 👈 Export if used outside this module
})
export class TaskModule {}
