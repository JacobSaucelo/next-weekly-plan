import React from "react";
import { SubTaskType } from "./Custom.TodoSubTask";

type SubTaskCardPropsType = {
  props: SubTaskType;
};

const TodoSubTaskCard = ({ props }: SubTaskCardPropsType) => {
  return (
    <div>
      <p>{props.id}</p>
      <p>{props.name}</p>
      <p>{props.isDone ? "true" : "false"}</p>
      <p>{props.isDeleted ? "true" : "false"}</p>
    </div>
  );
};

export default TodoSubTaskCard;
