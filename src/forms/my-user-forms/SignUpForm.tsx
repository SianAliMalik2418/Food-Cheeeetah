"use client";

import { SignUpSchema, SignUpSchemaType } from "@/schemas/SignUpSchema";
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
import { useCreateMyUser } from "@/hooks/MyUserApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { signUpUser, isLoading } = useCreateMyUser();
  const router = useRouter();

  const handleSignUp = async (data: SignUpSchemaType) => {
    const resp = await signUpUser(data);
    router.push("/login");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 md:w-[33%]">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-5 text-xl"
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
