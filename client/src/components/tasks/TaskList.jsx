import { useEffect } from "react";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import { fetchTasks } from "../../services/api";

function TaskList({ tasks, setTasks }) {
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    loadTasks();
  }, [setTasks]);

  return (
    <div className="max-w-lg mx-auto mt-6 px-2">
      <div className="p-4 bg-slate-100 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
          Task List
        </h3>

        <TaskHeader />

        <ul
          className="divide-y divide-gray-300 overflow-y-auto"
          style={{
            maxHeight: "180px",
          }}
        >
          {!Array.isArray(tasks) || tasks.length === 0 ? (
            <li className="text-center text-gray-500 py-3">
              No tasks available. Add some tasks!
            </li>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task._id} task={task} setTasks={setTasks} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
