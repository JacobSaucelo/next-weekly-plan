import { LoaderCircle } from "lucide-react";

type SpinnerType = {
  SpinnerSize: string;
};

const ReusablesSpinner = ({ SpinnerSize }: SpinnerType) => {
  return (
    <LoaderCircle className="animate-spin" style={{ fontSize: SpinnerSize }} />
  );
};

export default ReusablesSpinner;
