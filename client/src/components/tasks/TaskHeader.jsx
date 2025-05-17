function TaskHeader() {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-700 mb-4">
      <span className="flex items-center justify-start">Task Name</span>
      <span className="flex items-center justify-center">Status</span>
      <span className="flex items-center justify-end">Actions</span>
    </div>
  );
}

export default TaskHeader;
