import { useState, useEffect } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { fetchTasks, addTask } from "../services/api";
import DashboardLayout from "../components/Layout/DashboardLayout";
import useAuthToken from "../hooks/useAuthToken";
import { FaSpinner } from "react-icons/fa";

function TaskCreate() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useAuthToken();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!token) return console.error("Please log in.");

    try {
      await addTask(
        { task: input, completed: isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInput("");
      setIsCompleted(false);

      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-gray-100 flex justify-center min-h-screen">
        <div className="bg-white min-h-[100px] max-h-[600px] p-10 rounded-xl shadow-md w-full max-w-md overflow-y-auto">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
            My To-Do List
          </h2>

          <TaskForm
            input={input}
            setInput={setInput}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
            onSubmit={handleAddTask}
            isEdit={false}
          />

          {loading ? (
            <div className="flex justify-center mt-4 text-blue-600">
              <FaSpinner className="animate-spin text-2xl" />
              <span className="ml-2">Loading tasks...</span>
            </div>
          ) : (
            <TaskList tasks={tasks} setTasks={setTasks} compact />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TaskCreate;
