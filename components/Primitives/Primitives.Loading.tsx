import { LoaderCircle } from "lucide-react";
import React from "react";

const PrimitivesLoading = () => {
  return (
    <section className="flex items-center justify-center h-[80vh]">
      <LoaderCircle className="animate-spin" />
    </section>
  );
};

export default PrimitivesLoading;
