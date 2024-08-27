import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectDB } from "@/db/dbConfig";
import { UserModel } from "@/db/Models/UserModel";
import { SignUpSchema } from "@/schemas/SignUpSchema";
import { UserProfileSchemaType } from "@/schemas/UserProfileSchema";
import { User } from "@/types/types";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useCreateMyUser = () => {
  const createMyUserRequest = async (user: z.infer<typeof SignUpSchema>) => {
    try {
      const response = await axios.post(`/api/auth/signup`, user);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutateAsync: signUpUser,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(createMyUserRequest);

  if (isSuccess) {
    toast.success("User registered successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { signUpUser, isLoading };
};

export const useGetMyUser = () => {
  const { data: session } = useSession();

  const getUserRequest = async () => {
    try {
      if (session) {
        const response = await axios.get(
          `/api/my-user/get-user/${session?.user.id}`,
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery(["user-profile"], getUserRequest, {
    enabled: !!session?.user.id,
  });

  return { currentUser, isLoading, error };
};

export const useUpdateMyUserProfile = () => {
  const updateMyUser = async ({
    userDetails,
    userId,
  }: {
    userDetails: UserProfileSchemaType;
    userId: string;
  }) => {
    try {
      const response = await axios.put(
        `/api/my-user/profile/${userId}`,
        userDetails,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const {
    mutateAsync: updateMyUserProfile,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUser);

  if (isSuccess) {
    toast.success("User Profile updated successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateMyUserProfile, isLoading };
};
