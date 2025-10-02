import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.taskService.findOne(Number(id));
  }

  @Post()
  create(@Body('title') title: string): Promise<Task> {
    return this.taskService.create(title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Task>): Promise<Task | null> {
    return this.taskService.update(Number(id), updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(Number(id));
  }
}