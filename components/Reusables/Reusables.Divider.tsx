import React from "react";

type DividerProps = {
  isVertical: boolean;
};

const ReusablesDivider = ({ isVertical }: DividerProps) => {
  if (isVertical) {
    return <div className="h-full w-0 border"></div>;
  }
  return <div className="w-full border"></div>;
};

export default ReusablesDivider;
