import Button from "../ui/Button";

function TaskForm({
  input,
  setInput,
  isCompleted,
  setIsCompleted,
  onSubmit,
  isEdit = false,
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={input}
        placeholder="Enter task..."
        className="w-full p-5 mb-6 border border-gray-300 rounded-xl text-lg"
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="complete"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          className="mr-3 scale-150"
        />
        <label htmlFor="complete" className="text-lg text-gray-700">
          Mark as complete
        </label>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          {isEdit ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
