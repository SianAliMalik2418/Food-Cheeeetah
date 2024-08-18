"use client";

import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";

const ImageSection = () => {
  type CloudinaryUploadResult = {
    info: {
      secure_url: string;
    };
  };
  const { setValue, control, watch } = useFormContext();

  const existingImageUrl = watch("coverImage");

  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    if (existingImageUrl) {
      setCoverImage(existingImageUrl);
    }
  }, [existingImageUrl]);

  const handleFileUpload = (url: string) => {
    setCoverImage(url);
    setValue("coverImage", url, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <h1 className="mb-2 text-xl font-bold lg:text-3xl">Cover Image</h1>

      <span className="mt-10 text-sm text-muted-foreground">
        {" "}
        This will be your Restaurant Cover Image. Adding a new one will replace
        the existing one.
      </span>
      {coverImage ? (
        <CldUploadWidget
          uploadPreset="food-cheetah"
          onSuccess={(res: any, { widget }) => {
            handleFileUpload(res?.info?.secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="my-10 flex h-[10rem] w-full items-center justify-center md:h-[15rem] lg:h-[17rem]"
                onClick={() => open()}
              >
                <div className="relative flex h-full w-[80%] cursor-pointer items-center justify-center border-2 border-dotted md:w-1/2">
                  <Skeleton className="h-full w-full"></Skeleton>
                  <Image
                    src={coverImage}
                    fill
                    alt="Cover Image"
                    className="z-10 object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            );
          }}
        </CldUploadWidget>
      ) : (
        <>
          <CldUploadWidget
            uploadPreset="food-cheetah"
            onSuccess={(res: any, { widget }) => {
              handleFileUpload(res?.info?.secure_url);

              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="my-10 flex h-[10rem] w-full cursor-pointer items-center justify-center md:h-[15rem] lg:h-[17rem]"
                  onClick={() => open()}
                >
                  <div className="flex h-full w-[80%] items-center justify-center border-2 border-dotted md:w-1/2">
                    <BiImageAdd className="text-5xl text-primary md:text-7xl" />
                  </div>
                </div>
              );
            }}
          </CldUploadWidget>

          <FormField
            name="coverImage"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormMessage />

                <Input {...field} type="hidden" />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
};

export default ImageSection;
