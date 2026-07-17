import { FileManager } from "./utils/FileManager";
import { Task } from "./models/task";
import { TaskService } from "./services/TaskService";

async function main() {
    const service = new TaskService(new FileManager());

    const tasks = await service.getAllTasks();

    console.log("All Tasks:", tasks);

    console.log(await service.getPendingTasks());

    console.log(await service.getTaskById(1));
}

main();