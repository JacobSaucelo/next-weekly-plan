import { LoaderCircle } from "lucide-react";

type SpinnerType = {
  SpinnerSize: number;
};

const ReusablesSpinner = ({ SpinnerSize }: SpinnerType) => {
  return (
    <LoaderCircle
      className="animate-spin"
      style={{ fontSize: SpinnerSize + "px" }}
    />
  );
};

export default ReusablesSpinner;
