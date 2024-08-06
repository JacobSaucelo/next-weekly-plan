"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import PrimitivesLoading from "@/components/Primitives/Primitives.Loading";
import CustomTodoSubTask from "@/components/Customs/Custom.TodoSubTask";

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = { ...pageData, updatedDate: new Date().toISOString() };

    const { error } = await supabase
      .from("Tasks")
      .update(formData)
      .eq("id", pageData.id)
      .select();

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem updating your request.",
      });

      console.log(error);
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "Success",
      description: (
        <p>
          Your task{" "}
          <span className="font-semibold">&quot;{pageData.title}&quot;</span>{" "}
          has been updated please wait.
        </p>
      ),
    });
    router.push("/tools/todo");
    setIsSubmitting(false);
  };

  return (
    <main className={styles.TodoTaskContainer}>
      <aside className={`${styles.TodoTaskSideContent} border-r`}>
        <PrimitivesSidebar />
      </aside>
      <aside className={styles.TodoTaskMainContent}>
        {isFetching ? (
          <PrimitivesLoading />
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
                <TabsTrigger value="Subtask">Subtask</TabsTrigger>
              </TabsList>
              <ReusablesDivider isVertical={false} />
              <TabsContent value="Task">
                <section className="flex justify-center px-2 py-4 rounded bg-gray-200 mb-2">
                  <ReusablesToolsTodoCard Task={pageData} />
                </section>

                <Separator />

                <section className="grid grid-cols-3 gap-2">
                  <aside className="col-span-2 flex flex-col gap-2 p-2">
                    <div>
                      <Label htmlFor="TaskTitle">Title</Label>
                      <Input
                        type="text"
                        id="TaskTitle"
                        placeholder="Title"
                        value={pageData.title}
                        disabled={isSubmitting ? true : false}
                        onChange={(e) =>
                          handleChangeSelects("title", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="TaskDescription">Task Description</Label>
                      <Textarea
                        className="h-[200px]"
                        placeholder="Task Description"
                        disabled={isSubmitting ? true : false}
                        id="TaskDescription"
                        value={pageData.description}
                        onChange={(e) =>
                          handleChangeSelects("description", e.target.value)
                        }
                      />
                    </div>

                    <Separator />

                    <Button
                      disabled={isSubmitting ? true : false}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </aside>

                  <aside className="col-span-1 border-s">
                    <div className="p-2">
                      <Label>Status</Label>
                      <article className="flex flex-wrap gap-1 p-2">
                        {FilterStatusData.filter((s) => s.Value !== "").map(
                          (statusItem) => (
                            <Button
                              className="flex flex-row gap-2"
                              disabled={isSubmitting ? true : false}
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
                      </article>
                    </div>

                    <Separator />

                    <div className="p-2">
                      <Label>Priority</Label>
                      <article className="flex flex-wrap gap-1 p-2">
                        {FilterPriorityData.filter((p) => p.Value !== "").map(
                          (priorityItem) => (
                            <Button
                              className="flex flex-row gap-2"
                              disabled={isSubmitting ? true : false}
                              onClick={() =>
                                handleChangeSelects(
                                  "priority",
                                  priorityItem.Value
                                )
                              }
                              key={priorityItem.Value}
                            >
                              {priorityItem.Icon}
                              {priorityItem.Title}
                            </Button>
                          )
                        )}
                      </article>
                    </div>

                    <Separator />

                    <div className="p-2">
                      <Label>Label</Label>
                      <article className="flex flex-wrap gap-1 p-2">
                        {LabelData.map((priorityItem) => (
                          <Button
                            disabled={isSubmitting ? true : false}
                            onClick={() =>
                              handleChangeSelects("label", priorityItem)
                            }
                            key={priorityItem}
                          >
                            {priorityItem}
                          </Button>
                        ))}
                      </article>
                    </div>
                  </aside>
                </section>
              </TabsContent>
              <TabsContent value="Subtask">
                <CustomTodoSubTask id={pageData.id} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </aside>
    </main>
  );
};

export default TaskPage;
