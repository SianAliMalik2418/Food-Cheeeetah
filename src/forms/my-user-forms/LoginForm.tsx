"use client";

import { LoginSchema } from "@/schemas/LoginSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import ButtonLoading from "../../components/ui/ButtonLoading";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    try {
      setIsLoading(true);
      const resp = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (resp && resp?.status === 401) {
        return toast.error("Invalid Credentials!");
        setIsLoading(false);
      }

      if (resp && resp?.status === 200) {
        toast.success("Logged in successfully 🎊");

        router.replace("/");
        router.refresh();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex w-full flex-col gap-5 text-xl md:w-[33%]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Enter email here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <Input placeholder="Enter password here..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <ButtonLoading isLoading={isLoading}>Login</ButtonLoading>
        </form>
      </Form>
      <p>
        Dont have an account?{" "}
        <Link href={"/signup"} className="underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
