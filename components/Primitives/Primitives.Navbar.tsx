import React from "react";
import ReusablesThemeToggler from "../Reusables/Reusables.ThemeToggler";
import { Button } from "../ui/button";
import Link from "next/link";

const PrimitivesNavbar = () => {
  return (
    <nav className="flex justify-between border max-w-[1200px] m-auto p-2">
      <header className="flex items-center text-lg px-2">
        <Link href={"/"}>
          <h1>app</h1>
        </Link>
      </header>
      <section className="flex gap-2">
        <Button>Button</Button>
        <ReusablesThemeToggler />
      </section>
    </nav>
  );
};

export default PrimitivesNavbar;
