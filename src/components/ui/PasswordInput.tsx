"use client";

import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";

const PasswordInput = ({ field }: { field: any }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="flex w-full items-center justify-between rounded-lg border-border bg-input">
      <Input
        type={`${isShowPassword ? "text" : "password"}`}
        placeholder="Password"
        className="shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        {...field}
      />
      {isShowPassword ? (
        <EyeOff
          className="mx-2 w-5 cursor-pointer"
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      ) : (
        <Eye
          className="mx-2 w-5 cursor-pointer"
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
