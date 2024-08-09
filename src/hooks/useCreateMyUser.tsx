import { SignUpSchema } from "@/schemas/SignUpSchema";
import axios from "axios";
import { useMutation } from "react-query";
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
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { signUpUser, isLoading, isError, isSuccess };
};
