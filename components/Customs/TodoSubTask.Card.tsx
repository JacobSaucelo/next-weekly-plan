import React from "react";
import { SubTaskType } from "./Custom.TodoSubTask";
import { Button } from "../ui/button";
import { ChevronRight, CircleCheck, CirclePlus, CircleX } from "lucide-react";
import ReusablesDivider from "../Reusables/Reusables.Divider";

type SubTaskCardPropsType = {
  props: SubTaskType;
  depth: number;
};

const TodoSubTaskCard = ({ props, depth }: SubTaskCardPropsType) => {
  if (props.parentId === null) {
    return (
      <aside className="border-b-2 border-black flex p-2 items-center justify-between ">
        <p className="font-bold">Subtasks</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex gap-1">
            <CirclePlus className="text-blue-400" />
            Add
          </Button>
        </div>
      </aside>
    );
  }

  if (props.isDeleted) {
    return;
  }

  return (
    <aside className="border-b-2 border-gray-400 flex py-1 px-2 items-center justify-between gap-2">
      {props.isDone ? (
        <p className="line-through font-semibold flex items-center">
          <ChevronRight /> {props.name}
        </p>
      ) : (
        <p className="font-semibold flex items-center">
          <ChevronRight /> {props.name}
        </p>
      )}
      {/* <p>{props.id}</p>
      <p>{props.isDone ? "true" : "false"}</p>
      <p>{props.isDeleted ? "true" : "false"}</p> */}

      <div className="flex gap-2 ps-2">
        <Button size="sm" variant="outline" className="flex gap-1">
          <CircleCheck className="text-green-400" />
          Done
        </Button>
        {depth < 3 && (
          <Button size="sm" variant="outline" className="flex gap-1 ">
            <CirclePlus className="text-blue-400" />
            Add
          </Button>
        )}
        <Button size="sm" variant="outline" className="flex gap-1 ">
          <CircleX className="text-red-600" />
          Remove
        </Button>
      </div>
    </aside>
  );
};

export default TodoSubTaskCard;
