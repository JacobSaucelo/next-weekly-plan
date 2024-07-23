import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import ReusablesBreadCrumb from "@/components/Reusables/Reusables.BreadCrumb";
import React from "react";

const ToolsTodo = () => {
  return (
    <main className="max-w-[1200px] m-auto">
      <PrimitivesNavbar />
      <ReusablesBreadCrumb
        BasePage="Home"
        CurrentPage="todo"
        ListPage={["tools"]}
      />
    </main>
  );
};

export default ToolsTodo;
