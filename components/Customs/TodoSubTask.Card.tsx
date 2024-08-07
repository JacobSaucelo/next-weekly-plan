import React from "react";
import { SubTaskType } from "./Custom.TodoSubTask";
import { Button } from "../ui/button";

type SubTaskCardPropsType = {
  props: SubTaskType;
};

const TodoSubTaskCard = ({ props }: SubTaskCardPropsType) => {
  if (props.parentId === null) {
    return (
      <aside className="border rounded flex p-2 text-white bg-black dark:text-black dark:bg-white ">
        Subtasks
      </aside>
    );
  }

  if (props.isDeleted) {
    return;
  }

  return (
    <aside className="border rounded flex py-1 px-2 items-center justify-between gap-2">
      {props.isDone ? (
        <p className="line-through">{props.name}</p>
      ) : (
        <p>{props.name}</p>
      )}
      {/* <p>{props.id}</p>
      <p>{props.isDone ? "true" : "false"}</p>
      <p>{props.isDeleted ? "true" : "false"}</p> */}
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Done
        </Button>
        <Button size="sm" variant="secondary">
          Add
        </Button>
        <Button size="sm" variant="destructive">
          Remove
        </Button>
      </div>
    </aside>
  );
};

export default TodoSubTaskCard;
