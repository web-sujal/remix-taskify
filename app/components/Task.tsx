const Task = () => {
  return (
    <div className="flex bg-white gap-x-6 justify-between rounded-md items-center px-3 py-2">
      {/* checkbox */}
      <input type="checkbox" name="status" id="status" />
      {/* title, desc, due date, status */}
      <div className="flex flex-col items-start justify between gap-y-4">
        title description
      </div>
    </div>
  );
};

export default Task;
