"use client";
import { signIn, signOut } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import Link from "next/link";
import { toast } from "sonner";

export const GoogleButton = () => {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-between border border-gray-400 px-4 py-3 transition-colors ease-in-out hover:bg-[#e9e8e8]"
      onClick={() => signIn("google")}
    >
      <FcGoogle size={20} />

      <span>Continue with Google</span>

      <div></div>
    </div>
  );
};

export const GithubButton = () => {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-between border border-gray-400 bg-gray-600 px-4 py-3 font-semibold text-white transition-colors ease-in-out hover:brightness-90"
      onClick={() => signIn("github")}
    >
      <FaGithub size={20} />

      <span>Continue with Github</span>

      <div></div>
    </div>
  );
};

export const LoginButton = ({ closeDrawer }: { closeDrawer: () => void }) => {
  return (
    <Link
      href={"/login"}
      onClick={closeDrawer}
      className="mt-3 flex w-full cursor-pointer items-center justify-center bg-primary px-4 py-3 text-center font-semibold text-white transition-colors ease-in-out hover:brightness-90"
    >
      <span>Login</span>
    </Link>
  );
};

export const SignUpButton = ({ closeDrawer }: { closeDrawer: () => void }) => {
  return (
    <Link
      href={"/signup"}
      onClick={closeDrawer}
      className="mt-2 flex w-full cursor-pointer items-center justify-center border border-primary-foreground px-4 py-3 text-center font-semibold text-primary shadow-xl transition-colors ease-in-out hover:border-transparent hover:bg-[#e9e8e8] hover:brightness-90"
    >
      <span>SignUp</span>
    </Link>
  );
};

export const LogoutButton = ({ className }: { className?: string }) => {
  return (
    <span
      className={`flex cursor-pointer items-center gap-3 ${className}`}
      onClick={() => {
        signOut();
        toast.success("Logged out!");
      }}
    >
      <IoMdLogOut />
      <span>Logout</span>
    </span>
  );
};
