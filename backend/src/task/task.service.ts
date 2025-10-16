import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;
    Object.assign(task, updateData);
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<boolean> {
    const result: DeleteResult = await this.taskRepository.delete(id); 
    return (result.affected ?? 0) > 0; 
  }
}
