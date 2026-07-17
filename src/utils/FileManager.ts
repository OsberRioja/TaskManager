import { promises as fs } from 'fs';
import path from 'path';
import { Task } from '../models/task';

// Clase para manejar la lectura y escritura de tareas en un archivo JSON.
export class FileManager {
    private filePath: string;

    constructor() {
        this.filePath = path.join(__dirname, '../../data/tasks.json');
    }

    //Carga las tareas desde el archivo JSON.
    async loadTasks(): Promise<Task[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const tasks: Task[] = JSON.parse(data);
            return tasks.map(
                task => new Task(task.id, task.title, task.completed)
            );
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    // Guarda las tareas en el archivo JSON.
    async saveTasks(tasks: Task[]): Promise<void> {
        try {
            const data = JSON.stringify(tasks, null, 2);
            await fs.writeFile(this.filePath, data, 'utf-8');
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
}
