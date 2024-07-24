"use client";

import React, { useState } from "react";
import styles from "./styles.page.module.css";

import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import ReusablesMainHeader from "@/components/Reusables/Reusables.MainHeader";
import ReusablesDivider from "@/components/Reusables/Reusables.Divider";
import PrimitivesSidebar from "@/components/Primitives/Primitives.Sidebar";

import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "zustand";
import { useCountStore, Task as TaskType } from "./Store.todo";
import { Button } from "@/components/ui/button";

const ToolsTodo = () => {
  const tasks = useCountStore((state) => state.tasks);
  const counter = useCountStore((state) => state.count);
  const add = useCountStore((state) => state.increment);
  const min = useCountStore((state) => state.decrement);
  const addTask = useCountStore((state) => state.handleAddTask);

  // const [tasks, setTasks] = useState<Payment[]>([
  //   {
  //     id: "728ed52f",
  //     title:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At expedita delectus quod optio fuga consequatur!",
  //     status: "Backlog",
  //     priority: "Low",
  //     label: "Bug",
  //   },
  //   {
  //     id: "728ed52f",
  //     title: "Lorem, ipsum dolor sit fuga consequatur!",
  //     status: "Todo",
  //     priority: "High",
  //     label: "Documentation",
  //   },
  // ]);

  const TestTask: TaskType = {
    id: "Asdfasd",
    title: "test title",
    description: "description",
    priority: "Medium",
    status: "Todo",
    label: "Feature",
  };

  return (
    <main className={styles.TodoPageContainer}>
      <aside className={`${styles.TodoPageSideContent} border-r`}>
        {/* <PrimitivesNavbar /> */}
        <PrimitivesSidebar />
      </aside>
      <aside className={styles.TodoPageMainContent}>
        <ReusablesBreadCrumb
          BasePage="Home"
          CurrentPage="todo"
          ListPage={["tools"]}
        />
        <ReusablesMainHeader Title="" Subtitle="" />
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="create">New Tasks</TabsTrigger>
          </TabsList>
          <ReusablesDivider isVertical={false} />
          <TabsContent value="tasks">
            <DataTable columns={columns} data={tasks} />
          </TabsContent>
          <TabsContent value="create">
            <h6>{counter}</h6>
            <Button onClick={() => add(1)}>Add</Button>
            <Button onClick={() => min(1)}>Min</Button>
            <Button onClick={() => addTask(TestTask)}> Add Tasks</Button>
          </TabsContent>
        </Tabs>
      </aside>
    </main>
  );
};

export default ToolsTodo;
