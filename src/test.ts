import { FileManager } from "./utils/FileManager";
import { Task } from "./models/task";
import { TaskService } from "./services/TaskService";

async function main() {
    const service = new TaskService(new FileManager());

    console.log(await service.getAllTasks());

    await service.completeTask(1);

    console.log(await service.getAllTasks());

    console.log("pendientes: ",await service.getPendingTasks());
}

main();