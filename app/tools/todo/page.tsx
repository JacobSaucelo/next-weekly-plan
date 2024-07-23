import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import React from "react";
import styles from "./styles.page.module.css";

const ToolsTodo = () => {
  return (
    <main className={styles.TodoPageContainer}>
      <aside className={styles.TodoPageSideContent}>
        {/* <PrimitivesNavbar /> */}
      </aside>
      <aside className={styles.TodoPageMainContent}>
        <ReusablesBreadCrumb
          BasePage="Home"
          CurrentPage="todo"
          ListPage={["tools", "Asdfas", "vcx", "hbvcv"]}
        />
      </aside>
    </main>
  );
};

export default ToolsTodo;
