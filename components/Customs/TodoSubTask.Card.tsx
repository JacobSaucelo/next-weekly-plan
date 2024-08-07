import React from "react";
import { SubTaskType } from "./Custom.TodoSubTask";
import { Button } from "../ui/button";
import {
  ChevronRight,
  CircleCheck,
  CirclePlus,
  CircleX,
  LayoutList,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ReusablesDivider from "../Reusables/Reusables.Divider";
import { Badge } from "../ui/badge";

type SubTaskCardPropsType = {
  props: SubTaskType;
  depth: number;
};

const TodoSubTaskCard = ({ props, depth }: SubTaskCardPropsType) => {
  if (props.parentId === null) {
    return (
      <aside className="border-b-2 border-black flex p-2 items-center justify-between ">
        <p className="font-bold flex gap-2 items-center text-xl">
          <LayoutList />
          Subtasks
        </p>
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

  const handleDoneTask = () => {};

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
        <AlertDialog>
          <AlertDialogTrigger>
            <Button size="sm" variant="outline" className="flex gap-1">
              <CircleCheck className="text-green-400" />
              Done
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to complete this task?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Confirm to proceed with marking this task named
                <Badge className="mx-1">&quot;{props.name}&quot;</Badge>as
                complete.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button className="flex gap-1">
                <CircleCheck /> Complete Subtask
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {depth < 3 && (
          <Button size="sm" variant="outline" className="flex gap-1 ">
            <CirclePlus className="text-blue-400" />
            Add
          </Button>
        )}

        <AlertDialog>
          <AlertDialogTrigger>
            <Button size="sm" variant="outline" className="flex gap-1 ">
              <CircleX className="text-red-600" />
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once you proceed, you won’t be able to reverse this action. It
                will permanently remove your subtask named{" "}
                <Badge>&quot;{props.name}&quot;</Badge>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button className="flex gap-1" variant="destructive">
                <CircleX /> Delete Subtask
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
};

export default TodoSubTaskCard;
