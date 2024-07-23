import PrimitivesNavbar from "@/components/Primitives/Primitives.Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <PrimitivesNavbar />
      <Link href="tools/todo">Todo</Link>
    </main>
  );
}
