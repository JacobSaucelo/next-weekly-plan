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

type TodoCardType = {
  Task: TaskType;
};

const ReusablesToolsTodoCard = ({ Task }: TodoCardType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ReusablesToolsTodoCard;
