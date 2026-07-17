import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskService } from "../services/TaskService";
import { FileManager } from "../utils/FileManager";

const router = Router();

const fileManager = new FileManager();
const taskService = new TaskService(fileManager);
const taskController = new TaskController(taskService);

//POST /tasks - Crea una nueva tarea
router.post("/", taskController.createTask.bind(taskController));

//DELETE /tasks/:id - Elimina una tarea por ID
router.delete("/:id", taskController.deleteTask.bind(taskController));

//PUT /tasks/:id - Marca una tarea como completada
router.put("/:id", taskController.completeTask.bind(taskController));

export default router;