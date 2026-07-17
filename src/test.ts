import { FileManager } from "./utils/FileManager";
import { Task } from "./models/task";

async function main() {
    const fileManager = new FileManager();

    const tasks = [
    new Task(1,"Comprar pan"),
    new Task(2,"Hacer ejercicio")
    ];

    await fileManager.saveTasks(tasks);

    const loaded = await fileManager.loadTasks();

    console.log(loaded[0] instanceof Task);
}

main();