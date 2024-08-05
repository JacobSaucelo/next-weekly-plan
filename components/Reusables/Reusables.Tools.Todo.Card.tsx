import React from "react";
import { Task as TaskType } from "@/app/tools/todo/Store.todo";
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
import ReusablesDivider from "./Reusables.Divider";
import { Badge } from "../ui/badge";

type TodoCardType = {
  Task: TaskType;
};

const ReusablesToolsTodoCard = ({ Task }: TodoCardType) => {
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader className="pb-1">
        <header className="w-full flex justify-between">
          <aside>
            <CardTitle>Task Id: {Task.id}</CardTitle>
          </aside>
          <aside className="flex items-center gap-2">
            <ReusablesDivider isVertical={true} />
            <Badge variant="outline">{Task.label}</Badge>
            <Button>{Task.status}</Button>
            <Button>{Task.priority}</Button>
          </aside>
        </header>
        <ReusablesDivider isVertical={false} />
      </CardHeader>
      <CardContent className="pb-2">
        <aside className="w-full">
          <Label htmlFor="TaskCardTitle">Title</Label>
          <CardDescription id="TaskCardTitle" className="text-base mb-1">
            {Task.title}
          </CardDescription>
          <Label htmlFor="TaskCardDescription">Task Description</Label>
          <Textarea
            className="whitespace-pre-wrap"
            value={Task.description}
            id="TaskCardDescription"
            disabled
          />
        </aside>
      </CardContent>
      <CardFooter className="flex justify-end pb-2">
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
