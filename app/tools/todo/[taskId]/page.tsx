"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/initSupabase";
import { Task, Task as TaskType } from "../Store.todo";
import { Button } from "@/components/ui/button";

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
      <p className="border">{pageData.id}</p>
      <p className="border">{pageData.status}</p>
      <p className="border">{pageData.title}</p>
      <p className="border">{pageData.priority}</p>
      <p className="border">{pageData.label}</p>
      <p className="whitespace-pre-wrap border">{pageData.description}</p>
      <p className="border">{pageData.createdDate}</p>
      <p className="border">{pageData.updatedDate}</p>

      <hr />

      <h5>Status</h5>
      <Button onClick={() => handleChangeSelects("status", "Backlog")}>
        Backlog
      </Button>
      <Button onClick={() => handleChangeSelects("status", "Todo")}>
        Todo
      </Button>
      <Button onClick={() => handleChangeSelects("status", "In Progress")}>
        In Progress
      </Button>
      <Button onClick={() => handleChangeSelects("status", "Done")}>
        Done
      </Button>
      <Button onClick={() => handleChangeSelects("status", "Canceled")}>
        Canceled
      </Button>

      <hr />
      <h5>priority</h5>
      <Button onClick={() => handleChangeSelects("priority", "Low")}>
        Low
      </Button>
      <Button onClick={() => handleChangeSelects("priority", "Medium")}>
        Medium
      </Button>
      <Button onClick={() => handleChangeSelects("priority", "High")}>
        High
      </Button>

      <hr />
      <h5>label</h5>
      <Button onClick={() => handleChangeSelects("label", "Bug")}>Bug</Button>
      <Button onClick={() => handleChangeSelects("label", "Feature")}>
        Feature
      </Button>
      <Button onClick={() => handleChangeSelects("label", "Documentation")}>
        Documentation
      </Button>
      <Button onClick={() => handleChangeSelects("label", "Backend")}>
        Backend
      </Button>
      <Button onClick={() => handleChangeSelects("label", "UI")}>UI</Button>

      <hr />

      <Button onClick={handleSubmit}>Submit</Button>
    </main>
  );
};

export default TaskPage;
