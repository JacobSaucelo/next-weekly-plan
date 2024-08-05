import {
  FilterStatusData,
  FilterPriorityData,
  LabelData,
} from "@/app/tools/todo/Store.todo";

export const ReusablesStatusIcon = (status: string) => {
  return FilterStatusData.filter((s) => s.Title === status).map((stat) => (
    <aside key={stat.Title} className="flex gap-2 items-center justify-center">
      {stat.Icon} {stat.Title}
    </aside>
  ));
};

export const ReusablesPriorityIcon = (priority: string) => {
  return FilterPriorityData.filter((p) => p.Title === priority).map((stat) => (
    <aside key={stat.Title} className="flex gap-2 items-center justify-center">
      {stat.Icon} {stat.Title}
    </aside>
  ));
};
