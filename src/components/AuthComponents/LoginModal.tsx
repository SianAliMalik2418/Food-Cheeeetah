"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { IoIosCloseCircleOutline } from "react-icons/io";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";

import AuthButtonsContainer from "./AuthButtonsContainer";

type LoginModalProps = {
  text: React.ReactNode;
  stylingClasses: string;
};

const LoginModal = ({ text, stylingClasses }: LoginModalProps) => {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className={stylingClasses}>
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-2 text-3xl">Welcome!</DialogTitle>
            <DialogDescription className="">
              Sign up or log in to continue
            </DialogDescription>
          </DialogHeader>
          <AuthButtonsContainer closeDrawer={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className={stylingClasses}>
          {text}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pb-4">
        <DrawerHeader className="text-left">
          <DrawerClose asChild>
            <div className="mb-3 flex w-full items-end justify-end">
              <IoIosCloseCircleOutline
                size={30}
                className="rounded-full shadow-lg"
              />
            </div>
          </DrawerClose>
          <DrawerTitle className="mb-2 text-3xl">Welcome!</DrawerTitle>
          <DrawerDescription>Sign up or log in to continue</DrawerDescription>
        </DrawerHeader>

        <DrawerClose>
          <AuthButtonsContainer closeDrawer={() => setOpen(false)} />
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginModal;
