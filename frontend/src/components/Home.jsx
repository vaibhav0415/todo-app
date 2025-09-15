import React, { useEffect, useState } from "react";
import api from "../utils/api"; // Import the Axios instance
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    category: "General",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await api.get("/task/fetch"); // Use api instance
        setTasks(response.data.tasks);
        setError(null);
      } catch (error) {
        setError("Failed to fetch tasks");
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const taskCreate = async () => {
    if (!newTask.title) {
      toast.error("Task title is required");
      return;
    }
    try {
      const response = await api.post("/task/create", {
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate || null,
        category: newTask.category,
      });
      setTasks([...tasks, response.data.task]);
      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        category: "General",
      });
      toast.success("Task created successfully");
    } catch (error) {
      setError("Failed to create task");
      toast.error("Failed to create task");
    }
  };

  const taskStatus = async (id) => {
    const task = tasks.find((t) => t._id === id);
    try {
      const response = await api.put(`/task/update/${id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === id ? response.data.task : t)));
      toast.success("Task status updated");
    } catch (error) {
      setError("Failed to update task status");
      toast.error("Failed to update task status");
    }
  };

  const taskDelete = async (id) => {
    try {
      await api.delete(`/task/delete/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      setError("Failed to delete task");
      toast.error("Failed to delete task");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await api.get("/user/logout");
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-2xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Task Management App</h1>
      <div className="mb-4">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            onKeyPress={(e) => e.key === "Enter" && taskCreate()}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Category (e.g., Work, Personal)"
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={taskCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900 duration-300"
          >
            Add Task
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col p-4 bg-gray-200 rounded-md shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => taskStatus(task._id)}
                    className="mr-2"
                  />
                  <div>
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-800 font-semibold"
                          : "font-semibold"
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.description && (
                      <p className="text-sm text-gray-600">
                        {task.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Priority: {task.priority} | Category: {task.category}
                      {task.dueDate && (
                        <> | Due: {new Date(task.dueDate).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => taskDelete(task._id)}
                  className="text-red-500 hover:text-red-800 duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-center text-sm text-gray-600">
        {remainingTasks} remaining task{remainingTasks !== 1 ? "s" : ""}
      </p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;