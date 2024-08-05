"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.page.module.css";

import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import ReusablesMainHeader from "@/components/Reusables/Reusables.MainHeader";
import ReusablesDivider from "@/components/Reusables/Reusables.Divider";
import PrimitivesSidebar from "@/components/Primitives/Primitives.Sidebar";
import CustomTodoForm from "@/components/Customs/Custom.TodoForm";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCountStore, Task as TaskType } from "./Store.todo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/initSupabase";

const ToolsTodo = () => {
  const tasks = useCountStore((state) => state.tasks);
  const isFetchingTaskList = useCountStore((state) => state.isFetchingTaskList);
  const counter = useCountStore((state) => state.count);
  const add = useCountStore((state) => state.increment);
  const min = useCountStore((state) => state.decrement);
  const addTask = useCountStore((state) => state.handleAddTask);
  const setTasks = useCountStore((state) => state.handleSetTasks);
  const handleSetTaskFetching = useCountStore(
    (state) => state.handleSetTaskFetching
  );

  useEffect(() => {
    handleGetTasks();
  }, []);

  const TestTask: TaskType = {
    id: "Asdfasd",
    title: "test title",
    description: "description",
    priority: "Medium",
    status: "Todo",
    label: "Feature",
    createdDate: Date.now().toString(),
  };

  const handleGetTasks = async () => {
    handleSetTaskFetching(true);
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .range(0, 9);

    setTasks(data as TaskType[]);
    handleSetTaskFetching(false);
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
          ListPage={[{ name: "tools", route: "/" }]}
        />
        <ReusablesMainHeader
          Title="Todo Task List"
          Subtitle="Create and view pending tasks."
        />
        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="me-1" /> New Tasks
            </TabsTrigger>
          </TabsList>
          <ReusablesDivider isVertical={false} />
          <TabsContent value="tasks">
            <DataTable columns={columns} data={tasks} />
          </TabsContent>
          <TabsContent value="create">
            {/* <h6>{counter}</h6>
            <Button onClick={() => add(1)}>Add</Button>
            <Button onClick={() => min(1)}>Min</Button>
            <Button onClick={() => addTask(TestTask)}> Add Tasks</Button> */}
            <CustomTodoForm />
          </TabsContent>
        </Tabs>
      </aside>
    </main>
  );
};

export default ToolsTodo;
