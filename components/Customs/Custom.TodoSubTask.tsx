import React from "react";

type TodoSubTaskType = {
  id: string | undefined;
};

const CustomTodoSubTask = (task: TodoSubTaskType) => {
  if (!task.id) {
    return "failed to get subtask";
  }

  return <section>{task.id}</section>;
};

export default CustomTodoSubTask;
