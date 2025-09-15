import Task from "../model/task.model.js";

export const createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description || "",
        completed: req.body.completed || false,
        priority: req.body.priority || "Medium",
        dueDate: req.body.dueDate || null,
        category: req.body.category || "General",
        user: req.user._id
    });
    try {
        const newTask = await task.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating task" });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error fetching tasks" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
                priority: req.body.priority,
                dueDate: req.body.dueDate,
                category: req.body.category
            },
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully", task });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deleting task" });
    }
};