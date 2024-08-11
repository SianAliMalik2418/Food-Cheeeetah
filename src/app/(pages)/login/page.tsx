import LoginForm from "@/forms/my-user-forms/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-5">
      <h1 className="text-xl font-bold md:text-2xl">
        Login Now to Start Managing Your Restaurant.
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
