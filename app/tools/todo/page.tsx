import React from "react";
import styles from "./styles.page.module.css";

import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import ReusablesMainHeader from "@/components/Reusables/Reusables.MainHeader";
import ReusablesDivider from "@/components/Reusables/Reusables.Divider";
import PrimitivesSidebar from "@/components/Primitives/Primitives.Sidebar";

import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "BackLog",
      email: "m@example.com",
      title: "test",
      priority: "Low",
    },
  ];
}

const ToolsTodo = async () => {
  const data = await getData();

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
