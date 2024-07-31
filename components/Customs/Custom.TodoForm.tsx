"use client";

import styles from "./Custom.TodoForm.module.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/initSupabase";
import { Task as TaskType } from "@/app/tools/todo/Store.todo";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FilterStatusData,
  FilterPriorityData,
  LabelData,
} from "@/app/tools/todo/Store.todo";
import { useState } from "react";
import ReusablesSpinner from "../Reusables/Reusables.Spinner";

const FormSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(30, {
    message: "Description must be at least 30 characters.",
  }),
  status: z.enum(["Backlog", "Todo", "In Progress", "Done", "Canceled"], {
    required_error: "Status is a required field.",
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Priority is a required field.",
  }),
  label: z
    .enum(["Bug", "Feature", "Documentation", "Backend", "UI"])
    .optional(),
});

const ToolsTodo = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    const submitFormData: TaskType = {
      status: data.status,
      title: data.title,
      priority: data.priority,
      label: data.label,
      description: data.description,
      createdDate: new Date().toISOString(),
      updatedDate: null,
    };

    const { data: resData, error } = await supabase
      .from("Tasks")
      .insert([submitFormData])
      .select();
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your request.",
      });

      console.log(error);
      setIsSubmitting(false);
      return;
    }

    console.log("resData: ", resData);
    toast({
      title: "Success",
      description: (
        <p>
          Your task{" "}
          <span className="font-semibold">&quot;{data.title}&quot;</span> has
          been created please wait.
        </p>
      ),
    });
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 mt-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Work on the frontend part, Commit new changes, delete unused..."
                  disabled={isSubmitting ? true : false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Task Label</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting ? true : false}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a label for your task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LabelData.map((statusItem, index) => (
                    <SelectItem value={statusItem} key={statusItem + index}>
                      <div>
                        <Badge variant="outline">{statusItem}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Task labels are optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting ? true : false}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status for your task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FilterStatusData.filter(
                    (stat) => stat.Value && stat.Value.length > 1
                  ).map((statusItem) => (
                    <SelectItem value={statusItem.Value} key={statusItem.Value}>
                      <div className="flex items-center gap-2 ">
                        {statusItem.Icon}
                        {statusItem.Title}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting ? true : false}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status for your task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {FilterPriorityData.filter(
                    (stat) => stat.Value && stat.Value.length > 1
                  ).map((statusItem) => (
                    <SelectItem value={statusItem.Value} key={statusItem.Value}>
                      <div className="flex items-center gap-2 ">
                        {statusItem.Icon}
                        {statusItem.Title}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2 row-start-auto md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-4 md:border-l md:ps-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[80%]"
                  placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, adipisci."
                  disabled={isSubmitting ? true : false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="col-span-2 mt-4"
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? (
            <>
              <ReusablesSpinner SpinnerSize={10} />
              <p>Submitting...</p>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ToolsTodo;
