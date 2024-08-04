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
import ReusablesToolsTodoCard from "@/components/Reusables/Reusables.Tools.Todo.Card";

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

  if (isFetching) {
    return <section>Loading...</section>;
  }

  return (
    <main>
      <ReusablesToolsTodoCard Task={pageData} />

      <p className="border">id: {pageData.id}</p>
      <p className="border">{pageData.status}</p>
      <p className="border">{pageData.title}</p>
      <p className="border">{pageData.priority}</p>
      <p className="border">{pageData.label}</p>
      <Textarea
        className="whitespace-pre-wrap"
        value={pageData.description}
        disabled
      />

      {/* <p className="whitespace-pre-wrap border">{pageData.description}</p> */}
      <p className="border">{pageData.createdDate}</p>
      <p className="border">{pageData.updatedDate}</p>

      <hr />

      <h5>Status</h5>
      {FilterStatusData.filter((s) => s.Value !== "").map((statusItem) => (
        <Button
          className="flex flex-row gap-2"
          onClick={() => handleChangeSelects("status", statusItem.Value)}
          key={statusItem.Value}
        >
          {statusItem.Icon}
          {statusItem.Title}
        </Button>
      ))}

      <hr />
      <h5>priority</h5>
      {FilterPriorityData.filter((p) => p.Value !== "").map((priorityItem) => (
        <Button
          className="flex flex-row gap-2"
          onClick={() => handleChangeSelects("priority", priorityItem.Value)}
          key={priorityItem.Value}
        >
          {priorityItem.Icon}
          {priorityItem.Title}
        </Button>
      ))}

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
    </main>
  );
};

export default TaskPage;
