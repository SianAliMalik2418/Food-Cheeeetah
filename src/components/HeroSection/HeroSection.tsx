import Image from "next/image";
import heroImg from "@/../../public/Cheetah eating.jpeg";
import appDownloadImage from "@/../../public/appDownload.png";
import landingImage from "@/../../public/landing.png";
import About from "../About/About";

import HeroSectionSearch from "./HeroSectionSearch";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between bg-gray-100 py-10">
        <div className="title flex-1 gap-4 px-3 py-3 lg:flex lg:flex-col xl:px-10">
          <span className="max-w-full text-xl font-bold text-secondary lg:px-3 lg:text-3xl xl:text-4xl">
            It&apos;s the food and groceries you love, delivered
          </span>
          <div className="z-10 mt-5 hidden lg:block">
            <HeroSectionSearch />
          </div>
        </div>
        <div className="image relative flex h-[16rem] flex-1 items-center justify-center px-3 lg:h-[30rem] xl:h-[35rem]">
          <Image
            src={heroImg}
            alt="Image"
            fill
            priority
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="z-10 mx-5 -mt-14 lg:hidden">
        <HeroSectionSearch />
      </div>
      <About />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Image
          alt="About Image"
          sizes="(max-width: 768px) 100vw, 33vw"
          width={1000}
          height={1000}
          src={landingImage}
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the Food Cheetah App for faster ordering and personalised
            recommendations
          </span>
          <Image
            alt="About Image"
            sizes="(max-width: 768px) 100vw, 33vw"
            width={200}
            height={200}
            src={appDownloadImage}
          />
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
