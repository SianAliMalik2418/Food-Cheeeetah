"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProfileForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      city: "",
      adressLine: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
