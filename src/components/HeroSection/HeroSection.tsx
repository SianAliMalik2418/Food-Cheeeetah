import Image from "next/image";
// import heroImg from "@/../../public/NEW_CHEETAH_EATING.png";
import heroImg from "@/../../public/Cheetah eating.jpeg";
import HeroSectionInput from "./HeroSectionInput";
import About from "../About/About";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between bg-gray-100 py-10">
        <div className="title flex-1 gap-4 px-3 py-3 lg:flex lg:flex-col xl:px-10">
          <span className="max-w-full text-xl font-bold text-secondary lg:px-3 lg:text-3xl xl:text-4xl">
            It&apos;s the food and groceries you love, delivered
          </span>
          <div className="z-10 mt-5 hidden lg:block">
            <HeroSectionInput />
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
      <div className="z-10 -mt-20 lg:hidden">
        <HeroSectionInput />
      </div>
      <About />
    </div>
  );
};
export default HeroSection;
