import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import Button from "../components/ui/Button";
import { updateTask, fetchTaskById } from "../services/api";
import DashboardLayout from "../components/Layout/DashboardLayout";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await fetchTaskById(id);
        setInput(task.task || "");
        setIsCompleted(task.completed || false);
      } catch (err) {
        console.error("Failed to fetch task details:", err);
        setMessage("Error loading task.");
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    if (!input.trim()) {
      setMessage("Task cannot be empty.");
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      await updateTask(id, { task: input.trim(), completed: isCompleted });
      setMessage("Task updated successfully!");
      setTimeout(() => navigate("/tasks"), 1200);
    } catch (error) {
      console.error("Failed to update task:", error);
      setMessage("Failed to update task.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg relative">
          {/* Cancel Button */}
          <Button
            onClick={() => navigate("/tasks")}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-xl font-bold shadow-md"
            aria-label="Cancel"
          >
            ×
          </Button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Edit Task
          </h2>

          {message && (
            <div
              className={`text-center text-lg font-medium mb-4 ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          {!loading ? (
            <TaskForm
              input={input}
              setInput={setInput}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              isEdit={true}
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              isSubmitting={isSubmitting}
            />
          ) : (
            <p className="text-center text-gray-500">Loading task...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditTask;
