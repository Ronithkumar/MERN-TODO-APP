import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../services/api";
import Button from "../ui/Button";

function TaskItem({ task, setTasks }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <li className="py-4">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-900 truncate">
            {task.task}
          </p>
        </div>

        <span
          className={`flex justify-center items-center text-sm font-semibold px-3 py-1 rounded-full
            ${
              task.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

        <div className="flex gap-2 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => navigate(`/edit/${task._id}`)}
          >
            Edit
          </Button>
          <Button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
