"use client";

import { SignUpSchema } from "@/schemas/SignUpSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ButtonLoading from "../ui/ButtonLoading";
import Link from "next/link";
import { useCreateMyUser } from "@/hooks/useCreateMyUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { signUpUser, isLoading, isError, isSuccess } = useCreateMyUser();
  const router = useRouter();

  const handleSignUp = async (data: z.infer<typeof SignUpSchema>) => {
    const resp = await signUpUser(data);
    router.push("/login");
  };

  if (isError) {
    toast.error("Something went wrong");
  }

  if (isSuccess) {
    toast.success("User registered!");
  }

  return (
    <div className="flex flex-col w-full md:w-[33%]  items-center justify-center gap-3">
      <Form {...form}>
        <form
          className=" flex flex-col gap-5 text-xl w-full"
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label>Username</Label>
                <FormControl>
                  <Input placeholder="Enter Username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Enter email..." {...field} />
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
                  <Input
                    type="password"
                    placeholder="Enter password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonLoading isLoading={isLoading}>Sign Up</ButtonLoading>
        </form>
      </Form>
      <p>
        Already have an account?{" "}
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
