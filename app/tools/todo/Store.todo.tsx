import { create } from "zustand";

type State = {
  count: number;
  tasks: Task[];
};
type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  handleAddTask: (task: Task) => void;
  handleRemoveTask: (taskId: string) => void;
};

type Task = {
  id: string;
  status: "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled";
  title: string;
  priority: "Low" | "Medium" | "High";
  label?: "Bug" | "Feature" | "Documentation" | "Backend" | "UI";
  description?: string;
};

const defaultTasks: Task[] = [
  {
    id: "728ed52f",
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At expedita delectus quod optio fuga consequatur!",
    status: "Backlog",
    priority: "Low",
    label: "Bug",
  },
  {
    id: "728ed52f",
    title: "Lorem, ipsum dolor sit fuga consequatur!",
    status: "Todo",
    priority: "High",
    label: "Documentation",
  },
];

export const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  tasks: defaultTasks,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
  handleRemoveTask: (taskId: string) =>
    set((state) => {
      const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
      return {
        tasks: filteredTasks,
      };
    }),
}));
