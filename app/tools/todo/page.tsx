import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import React from "react";
import styles from "./styles.page.module.css";
import ReusablesMainHeader from "@/components/Reusables/Reusables.MainHeader";
import ReusablesDivider from "@/components/Reusables/Reusables.Divider";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "553eads",
      amount: 70,
      status: "failed",
      email: "6fgs43d@example.com",
    },
    {
      id: "ydsv434",
      amount: 230,
      status: "success",
      email: "fds23rfr@example.com",
    },
    {
      id: "6bf34dd",
      amount: 21,
      status: "processing",
      email: "kdpoepol34@example.com",
    },
    {
      id: "k0de9de",
      amount: 120,
      status: "pending",
      email: "5dcs324@example.com",
    },
    {
      id: "vded3rd",
      amount: 360,
      status: "pending",
      email: "cdhtg4@example.com",
    },
    {
      id: "nyefv4",
      amount: 90,
      status: "failed",
      email: "fdadss@example.com",
    },
    {
      id: "g4refdv",
      amount: 270,
      status: "success",
      email: "vr4ead@example.com",
    },
    {
      id: "y645fgr",
      amount: 21,
      status: "processing",
      email: "hyb6t@example.com",
    },
    {
      id: "dvc4te",
      amount: 30,
      status: "pending",
      email: "judfv5d@example.com",
    },
    {
      id: "er3e3df",
      amount: 1030,
      status: "pending",
      email: "74fdads@example.com",
    },
    {
      id: "nyfgf",
      amount: 70,
      status: "failed",
      email: "nut45dc@example.com",
    },
    {
      id: "cdsfd",
      amount: 230,
      status: "success",
      email: "gfsdcd@example.com",
    },
    {
      id: "deasdfasd",
      amount: 2541,
      status: "processing",
      email: "deasdfasd@example.com",
    },
    {
      id: "tew34",
      amount: 60,
      status: "pending",
      email: "tew34@example.com",
    },
  ];
}

const ToolsTodo = async () => {
  const data = await getData();

  return (
    <main className={styles.TodoPageContainer}>
      <aside className={`${styles.TodoPageSideContent} border-r`}>
        <PrimitivesNavbar />
      </aside>
      <aside className={styles.TodoPageMainContent}>
        <ReusablesBreadCrumb
          BasePage="Home"
          CurrentPage="todo"
          ListPage={["tools", "Asdfas", "vcx", "hbvcv"]}
        />
        <ReusablesMainHeader Title="" Subtitle="" />
        <ReusablesDivider isVertical={false} />
        <DataTable columns={columns} data={data} />
      </aside>
    </main>
  );
};

export default ToolsTodo;
