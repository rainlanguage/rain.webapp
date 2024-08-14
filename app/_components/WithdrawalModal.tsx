"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  withdrawalAmount: z.preprocess(
    (value) => Number(value),
    z.number().min(0, "Amount must be a positive number")
  ),
});

interface WithdrawalModalProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export const WithdrawalModal = ({ onSubmit }: WithdrawalModalProps) => {
  const [open, setOpen] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      withdrawalAmount: 0,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-gray-500 hover:bg-gray-400 text-white font-bold px-2 mx-1 rounded">
        Withdraw
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async () => {
                console.log("submitting form");
                await onSubmit(form.getValues());
                console.log("form submitted");
                setOpen(false);
              })}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="withdrawalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
