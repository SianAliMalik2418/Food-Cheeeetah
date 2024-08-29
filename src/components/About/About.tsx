import AboutImg from "@/../../public/About image.webp";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="mt-14 flex w-full flex-col gap-10">
      <span className="px-3 text-xl font-bold xl:px-6 xl:text-3xl">
        You prepare the food we handle the rest.
      </span>
      <div className="relative flex h-[30rem] w-full items-center justify-center">
        <Image
          fill
          src={AboutImg}
          className="object-cover"
          alt="About Image"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="z-20 mx-auto -mt-48 flex max-w-[400px] items-center justify-center py-4 md:max-w-[700px] md:justify-start lg:w-full">
        <div className="flex w-[90%] flex-col gap-6 rounded-lg bg-white px-5 py-5 shadow-2xl md:w-[70%] lg:w-[80%]">
          <span className="text-lg font-bold">
            List your restaurant or shop on Food Cheetah!
          </span>
          <span>
            Would you like millions of new customers to enjoy your amazing food
            and groceries? So would we!
          </span>
          <span>
            It&apos;s simple: we list your menu and product lists online, help
            you process orders, pick them up, and deliver them to hungry
            Cheetahs - in a heartbeat!
          </span>

          <span>Interested? Let&apos;s start our partnership today!</span>

          <Link
            href={"/restaurant/my-restaurant"}
            className="max-w-fit rounded bg-primary px-5 py-3 font-semibold text-white hover:brightness-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
export default About;
