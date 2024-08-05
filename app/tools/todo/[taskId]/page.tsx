"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/initSupabase";
import {
  FilterStatusData,
  FilterPriorityData,
  LabelData,
  Task as TaskType,
} from "../Store.todo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReusablesToolsTodoCard from "@/components/Reusables/Reusables.Tools.Todo.Card";
import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";

import styles from "./styles.TodoTask.module.css";
import PrimitivesSidebar from "@/components/Primitives/Primitives.Sidebar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import ReusablesMainHeader from "@/components/Reusables/Reusables.MainHeader";
import { Plus } from "lucide-react";
import ReusablesDivider from "@/components/Reusables/Reusables.Divider";

const TaskPage = () => {
  const [pageData, setPageData] = useState<TaskType>({
    id: "",
    status: "Canceled",
    title: "",
    priority: "Low",
    label: "Bug",
    description: "",
    createdDate: "",
    updatedDate: "",
  });
  const [isFetching, setIsFetching] = useState<Boolean>(true);
  const params = useParams();

  useEffect(() => {
    handleGetTask();
  }, []);

  const handleGetTask = async () => {
    setIsFetching(true);

    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("id", params.taskId);

    if (error) {
      console.log("error: ", error);
      setIsFetching(false);

      return;
    }

    setIsFetching(false);
    setPageData(data[0] as TaskType);
  };

  const handleChangeSelects = (name: string, value: string) => {
    setPageData({ ...pageData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("pageData : ", pageData);
  };

  return (
    <main className={styles.TodoTaskContainer}>
      <aside className={`${styles.TodoTaskSideContent} border-r`}>
        <PrimitivesSidebar />
      </aside>
      <aside className={styles.TodoTaskMainContent}>
        {isFetching ? (
          <section> Loading...</section>
        ) : (
          <>
            <ReusablesBreadCrumb
              BasePage="Home"
              CurrentPage={`Task ${pageData.id}` || ""}
              ListPage={[
                { name: "tools", route: "/tools" },
                { name: "todo", route: "/tools/todo" },
              ]}
            />
            <ReusablesMainHeader
              Title="Todo Task Editor"
              Subtitle="View & Edit your task with Status, Priority, and Complete Information."
            />

            <Tabs defaultValue="Task">
              <TabsList>
                <TabsTrigger value="Task">Task {pageData.id}</TabsTrigger>
              </TabsList>
              <ReusablesDivider isVertical={false} />
              <TabsContent value="Task">
                <section className="flex justify-center px-2 py-4 rounded bg-gray-200 mb-2">
                  <ReusablesToolsTodoCard Task={pageData} />
                </section>

                <hr />

                <h5>Status</h5>
                {FilterStatusData.filter((s) => s.Value !== "").map(
                  (statusItem) => (
                    <Button
                      className="flex flex-row gap-2"
                      onClick={() =>
                        handleChangeSelects("status", statusItem.Value)
                      }
                      key={statusItem.Value}
                    >
                      {statusItem.Icon}
                      {statusItem.Title}
                    </Button>
                  )
                )}

                <hr />
                <h5>priority</h5>
                {FilterPriorityData.filter((p) => p.Value !== "").map(
                  (priorityItem) => (
                    <Button
                      className="flex flex-row gap-2"
                      onClick={() =>
                        handleChangeSelects("priority", priorityItem.Value)
                      }
                      key={priorityItem.Value}
                    >
                      {priorityItem.Icon}
                      {priorityItem.Title}
                    </Button>
                  )
                )}

                <hr />
                <h5>label</h5>
                {LabelData.map((priorityItem) => (
                  <Button
                    onClick={() => handleChangeSelects("label", priorityItem)}
                    key={priorityItem}
                  >
                    {priorityItem}
                  </Button>
                ))}

                <hr />
                <Button onClick={handleSubmit}>Submit</Button>
              </TabsContent>
            </Tabs>
          </>
        )}
      </aside>
    </main>
  );
};

export default TaskPage;
