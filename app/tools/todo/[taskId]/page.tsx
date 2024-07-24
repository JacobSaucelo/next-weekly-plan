"use client";

import React from "react";
import { useParams } from "next/navigation";

const TaskPage = () => {
  const params = useParams();

  console.log("params: ", params);
  return <main>{params.taskId}</main>;
};

export default TaskPage;
