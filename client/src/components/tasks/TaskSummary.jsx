import { useEffect, useState } from "react";
import { fetchTasks } from "../../services/api";
import { CheckCircle, Clock, List } from "lucide-react";

function TaskSummary() {
  const [summary, setSummary] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        const completed = tasks.filter((task) => task.completed).length;
        const total = tasks.length;
        const pending = total - completed;

        setSummary({ total, completed, pending });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  const statCard = (label, value, icon, bgColor) => (
    <div
      className={`bg-white rounded-2xl shadow p-6 flex items-center gap-4 ${bgColor}`}
    >
      {icon}
      <div>
        <h3 className="text-sm text-gray-500">{label}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {statCard(
        "Total Tasks",
        summary.total,
        <List className="text-blue-500" />,
        ""
      )}
      {statCard(
        "Completed",
        summary.completed,
        <CheckCircle className="text-green-500" />,
        ""
      )}
      {statCard(
        "Pending",
        summary.pending,
        <Clock className="text-yellow-500" />,
        ""
      )}
    </div>
  );
}

export default TaskSummary;
