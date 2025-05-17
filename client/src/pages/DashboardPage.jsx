import { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import TaskList from "../components/tasks/TaskList";
import TaskSummary from "../components/tasks/TaskSummary";
import { fetchTasks } from "../services/api";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks in DashboardPage:", err);
      }
    };

    loadTasks();
  }, []);

  return (
    <DashboardLayout>
      <TaskSummary tasks={tasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </DashboardLayout>
  );
}

export default DashboardPage;
