import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

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
  async remove(@Param('id') id: string) {
    const deleted = await this.taskService.remove(Number(id));
    if (!deleted) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { message: 'Task deleted successfully' };
  }
}
