"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  UserProfileSchema,
  UserProfileSchemaType,
} from "@/schemas/UserProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonLoading from "../../components/ui/ButtonLoading";
import { useGetMyUser, useUpdateMyUserProfile } from "@/hooks/MyUserApi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import UserProfileFormSkeleton from "@/components/Skeletons/UserProfileFormSkeleton";

const ProfileForm = () => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const { updateMyUserProfile, isLoading: isUpdatingLoading } =
    useUpdateMyUserProfile();
  const {
    currentUser,
    isLoading: isGettingProfileLoading,
    error,
  } = useGetMyUser();

  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: currentUser,
  });

  const handleProfileUpdate = async (data: UserProfileSchemaType) => {
    await updateMyUserProfile({ userDetails: data, userId: userId as string });
  };

  useEffect(() => {
    if (currentUser) {
      form.reset(currentUser);
    }
  }, [form, currentUser]);

  if (isGettingProfileLoading || status === "loading") {
    return <UserProfileFormSkeleton />;
  }
  if (error) {
    return <span>Unable to load profile</span>;
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-3 p-2"
          onSubmit={form.handleSubmit(handleProfileUpdate)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-zinc-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter city name..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Entery country name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Entery adress line 1..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading isLoading={isUpdatingLoading} className="mt-4 w-fit">
            Save Changes
          </ButtonLoading>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
