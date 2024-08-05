import {
  Circle,
  CircleCheck,
  CircleHelp,
  CircleX,
  Timer,
  X,
  ArrowUp,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

import { create } from "zustand";

type State = {
  count: number;
  tasks: Task[];
  isFetchingTaskList: boolean;
};
type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  handleAddTask: (task: Task) => void;
  handleRemoveTask: (taskId: string) => void;
  handleSetTasks: (data: Task[]) => void;
  handleSetTaskFetching: (isFetching: boolean) => void;
};

export type Task = {
  id?: string;
  status: "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled";
  title: string;
  priority: "Low" | "Medium" | "High";
  label?: "Bug" | "Feature" | "Documentation" | "Backend" | "UI";
  description?: string;
  createdDate: string;
  updatedDate?: string | null;
};

export type FilterStatusType = {
  Title: string;
  Value: "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled" | "";
  Variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  Icon: any;
};
export type FilterPriorityType = {
  Title: string;
  Value: "Low" | "Medium" | "High" | "";
  Variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  Icon: any;
};

export const FilterStatusData: FilterStatusType[] = [
  {
    Title: "Backlog",
    Value: "Backlog",
    Variant: "outline",
    Icon: <CircleHelp className="text-gray-400" />,
  },
  {
    Title: "Todo",
    Value: "Todo",
    Variant: "outline",
    Icon: <Circle className="text-blue-400" />,
  },
  {
    Title: "In Progress",
    Value: "In Progress",
    Variant: "outline",
    Icon: <Timer className="text-yellow-400" />,
  },
  {
    Title: "Done",
    Value: "Done",
    Variant: "outline",
    Icon: <CircleCheck className="text-green-400" />,
  },
  {
    Title: "Canceled",
    Value: "Canceled",
    Variant: "outline",
    Icon: <CircleX className="text-red-700" />,
  },
  {
    Title: "Clear",
    Value: "",
    Variant: "ghost",
    Icon: <X />,
  },
];
export const FilterPriorityData: FilterPriorityType[] = [
  {
    Title: "High",
    Value: "High",
    Variant: "outline",
    Icon: <ArrowUp className="text-red-700" />,
  },
  {
    Title: "Medium",
    Value: "Medium",
    Variant: "outline",
    Icon: <ArrowRight className="text-yellow-400" />,
  },
  {
    Title: "Low",
    Value: "Low",
    Variant: "outline",
    Icon: <ArrowDown className="text-blue-400" />,
  },
  {
    Title: "Clear",
    Value: "",
    Variant: "ghost",
    Icon: <X />,
  },
];
export const LabelData = ["Bug", "Feature", "Documentation", "Backend", "UI"];

const defaultTasks: Task[] = [
  // {
  //   id: "728ed52f",
  //   title:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At expedita delectus quod optio fuga consequatur!",
  //   status: "Backlog",
  //   priority: "Low",
  //   label: "Bug",
  //   createdDate: Date.now().toString(),
  // },
  // {
  //   id: "728ed52f",
  //   title: "Lorem, ipsum dolor sit fuga consequatur!",
  //   status: "Todo",
  //   priority: "High",
  //   label: "Documentation",
  //   createdDate: Date.now().toString(),
  // },
];

export const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  tasks: defaultTasks,
  isFetchingTaskList: true,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
  handleAddTask: (task: Task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  handleRemoveTask: (taskId: string) =>
    set((state) => {
      const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
      return {
        tasks: filteredTasks,
      };
    }),
  handleSetTasks: (data: Task[]) => set((state) => ({ tasks: data })),
  handleSetTaskFetching: (isFetching: boolean) =>
    set((state) => ({ isFetchingTaskList: isFetching })),
}));
