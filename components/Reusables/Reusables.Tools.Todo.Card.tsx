import React from "react";

import ReusablesDivider from "./Reusables.Divider";

import {
  FilterStatusData,
  Task as TaskType,
} from "@/app/tools/todo/Store.todo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ReusablesPriorityIcon, ReusablesStatusIcon } from "./Reusables.Icons";

type TodoCardType = {
  Task: TaskType;
};

const ReusablesToolsTodoCard = ({ Task }: TodoCardType) => {
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader className="pb-1">
        <header className="w-full flex justify-between">
          <aside className="flex items-center">
            <CardTitle>Task Id: {Task.id}</CardTitle>
          </aside>
          <aside className="flex items-center gap-2">
            <Badge variant="outline">{Task.label}</Badge>
            <ReusablesDivider isVertical={true} />
            {ReusablesStatusIcon(Task.status)}
          </aside>
        </header>
        <ReusablesDivider isVertical={false} />
      </CardHeader>
      <CardContent className="pb-2">
        <aside className="w-full">
          <section className="grid grid-cols-3">
            <div className="col-span-2">
              <Label htmlFor="TaskCardTitle">Title</Label>
              <CardDescription
                id="TaskCardTitle"
                className="text-base ps-1 mb-1"
              >
                {Task.title}
              </CardDescription>
            </div>
            <div className="col-span-1">
              <Label htmlFor="Priority">Priority</Label>
              <div className="border rounded">
                {ReusablesPriorityIcon(Task.priority)}
              </div>
            </div>
          </section>

          <Label htmlFor="TaskCardDescription">Task Description</Label>
          <Textarea
            className="whitespace-pre-wrap h-[150px]"
            value={Task.description}
            id="TaskCardDescription"
            disabled
          />
        </aside>
      </CardContent>
      <CardFooter className="flex justify-end pb-3">
        <aside className="flex gap-2 text-xs">
          <p>
            Created Date:{" "}
            <span className="text-muted-foreground">{Task.createdDate}</span>
          </p>
          <p>
            Updated Date:{" "}
            <span className="text-muted-foreground">
              {Task.updatedDate || "0000-00-00"}
            </span>
          </p>
        </aside>
      </CardFooter>
    </Card>
  );
};

export default ReusablesToolsTodoCard;
