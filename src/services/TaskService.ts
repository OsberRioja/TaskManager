import { Task } from '../models/task';
import { FileManager } from '../utils/FileManager';

export class TaskService {
    private fileManager: FileManager;

    constructor(fileManager: FileManager) {
        this.fileManager = fileManager;
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.fileManager.loadTasks();
    }

    async getPendingTasks(): Promise<Task[]> {
        const tasks = await this.fileManager.loadTasks();
        return tasks.filter(task => !task.completed);
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        const tasks = await this.fileManager.loadTasks();
        return tasks.find(task => task.id === id);
    }

    async addTask(title: string): Promise<Task> {
        const tasks = await this.fileManager.loadTasks();
        const newTask = new Task(tasks.length + 1, title);
        tasks.push(newTask);
        await this.fileManager.saveTasks(tasks);
        return newTask;
    }

    async deleteTask(id: number): Promise<boolean> {
        const tasks = await this.fileManager.loadTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            await this.fileManager.saveTasks(tasks);
            return true;
        }
        return false;
    }

    async completeTask(id: number): Promise<Task | undefined> {
        const tasks = await this.fileManager.loadTasks();
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            await this.fileManager.saveTasks(tasks);
            return task;
        }
        return undefined;
    }
}