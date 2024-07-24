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

const ToolsTodo = () => {
  const [tasks, setTasks] = useState<Payment[]>([
    {
      id: "728ed52f",
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At expedita delectus quod optio fuga consequatur!",
      status: "Backlog",
      priority: "Low",
      label: "Bug",
    },
    {
      id: "728ed52f",
      title: "Lorem, ipsum dolor sit fuga consequatur!",
      status: "Todo",
      priority: "High",
      label: "Documentation",
    },
  ]);

  const handleRemoveTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
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
          <TabsContent value="create"></TabsContent>
        </Tabs>
      </aside>
    </main>
  );
};

export default ToolsTodo;
