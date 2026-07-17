import express from "express";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Task Manager API funcionando" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});