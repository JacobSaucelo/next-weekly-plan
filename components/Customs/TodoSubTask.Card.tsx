import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReusablesDivider from "../Reusables/Reusables.Divider";
import { Badge } from "../ui/badge";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type SubTaskCardPropsType = {
  props: SubTaskType;
  depth: number;
  childrenLength: number;
};

const TodoSubTaskCard = ({
  props,
  depth,
  childrenLength,
}: SubTaskCardPropsType) => {
  const [subTaskText, setSubTaskText] = useState<string | null>(null);

  if (props.parentId === null) {
    return (
      <aside className="border-b-2 border-black flex p-2 items-center justify-between ">
        <p className="font-bold flex gap-2 items-center text-xl">
          <LayoutList />
          Subtasks
        </p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="flex gap-1">
                <CirclePlus className="text-blue-400" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </aside>
    );
  }

  if (props.isDeleted) {
    return;
  }

  const handleChangeTaskDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeTaskDetails: ", e.target.value);
  };

  const handleAddTask = () => {
    setSubTaskText(null);

    toast({
      title: "Subtask Added",
      description: (
        <p>
          Your subtask <span className="font-semibold">&quot;name&quot;</span>{" "}
          has been added.
        </p>
      ),
    });
  };

  const handleDoneTask = () => {
    toast({
      title: "Subtask Completed",
      description: (
        <p>
          Your subtask{" "}
          <span className="font-semibold">&quot;{props.name}&quot;</span> is
          marked complete.
        </p>
      ),
    });
  };

  const handleRemoveTask = () => {
    toast({
      title: "Subtask Removed",
      description: (
        <p>
          Your subtask{" "}
          <span className="font-semibold">&quot;{props.name}&quot;</span> has
          been removed.
        </p>
      ),
    });
  };

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
              <AlertDialogAction asChild>
                <Button className="flex gap-1" onClick={handleDoneTask}>
                  <CircleCheck /> Complete Subtask
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {depth < 3 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="flex gap-1 ">
                <CirclePlus className="text-blue-400" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new subtask</DialogTitle>
                <DialogDescription>
                  Fill in the information below to create a new subtask.
                </DialogDescription>
              </DialogHeader>
              <article>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="addSubTask" className="text-right">
                    Subtask
                  </Label>
                  <Input
                    id="addSubTask"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    onChange={handleChangeTaskDetails}
                  />
                </div>
              </article>
              <DialogFooter>
                <Button className="flex gap-1" onClick={handleAddTask}>
                  <CirclePlus /> Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {childrenLength === 0 && (
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
                  Once you proceed, you won&apos;t be able to reverse this
                  action. It will permanently remove your subtask named{" "}
                  <Badge>&quot;{props.name}&quot;</Badge>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    className="flex gap-1"
                    variant="destructive"
                    onClick={handleRemoveTask}
                  >
                    <CircleX /> Delete Subtask
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </aside>
  );
};

export default TodoSubTaskCard;
