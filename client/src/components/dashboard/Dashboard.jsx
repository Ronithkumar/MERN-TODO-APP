import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { fetchTasks } from "../../services/api";
import TaskItem from "../tasks/TaskItem";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired");
        localStorage.clear();
        setLoading(false);
        return;
      }

      setUser(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));

      fetchTasks()
        .then(setTasks)
        .catch((err) => console.error("Failed to fetch tasks:", err))
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Failed to decode token:", err);
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return <p className="text-center mt-20">User not authenticated</p>;

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-xl shadow-md border">
      {/* mt-24 adds margin to avoid overlap with fixed navbar (assuming navbar height ~96px) */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome back, {user.username}!
      </h2>

      <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found. Start by adding one!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} setTasks={setTasks} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
