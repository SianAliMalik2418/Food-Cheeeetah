import LoginForm from "@/components/AuthComponents/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen gap-10 items-center justify-center px-5">
      <h1 className="font-bold text-xl md:text-2xl ">
        Login Now to Start Managing Your Restaurant.
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
