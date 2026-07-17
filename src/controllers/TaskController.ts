import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService: TaskService;
    
    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    async createTask(req: Request, res: Response) {
        const { title } = req.body;
        const newTask = await this.taskService.addTask(title);
        res.status(201).json(newTask);
    }

    async deleteTask(req: Request, res: Response) {
        const id = Number(req.params.id);
        const deleted = await this.taskService.deleteTask(id);
        if (!deleted) {
            res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    }
}