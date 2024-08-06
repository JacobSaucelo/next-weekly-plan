import React from "react";

type TodoSubTaskType = {
  id: string;
};

const CustomTodoSubTask = (task: TodoSubTaskType) => {
  return <div>task: {task.id}</div>;
};

export default CustomTodoSubTask;
