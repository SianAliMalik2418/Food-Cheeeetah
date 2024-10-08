import Image from "next/image";
import { IoBagHandleOutline } from "react-icons/io5";
import logo from "@/../../public/Chester-Cheetah-LOGO.jpg";
import Link from "next/link";
import LoginModal from "@/components/AuthComponents/LoginModal";
import { FaRegUser } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ProfileButton from "../Profile/ProfileButton";
import DropDownProfileButton from "./DropDownProfileButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  return (
    <div className="sticky top-0 z-50 mx-auto flex h-20 items-center justify-between bg-white px-10 py-3 shadow-md md:container">
      {session ? (
        <>
          <div className="block flex-1 lg:hidden">
            <ProfileButton />
          </div>
          <Link href={"/"}>
            <div className="flex flex-1 items-center justify-center gap-2 lg:flex-none lg:gap-4">
              <div className="relative h-10 w-10 rounded-full lg:h-14 lg:w-14">
                <Image
                  src={logo}
                  width={"100"}
                  height={"100"}
                  alt="Logo"
                  className="rounded-full"
                  placeholder="blur"
                />
              </div>
              <span className="font-semibold text-primary lg:text-xl">
                Food Cheetah
              </span>
            </div>
          </Link>

          <div className="hidden items-center justify-center gap-8 lg:flex">
            <DropDownProfileButton email={email as string} />
          </div>

          <div className="flex flex-1 items-end justify-end lg:hidden">
            <div className="opacity-0"></div>
          </div>
        </>
      ) : (
        <>
          <LoginModal
            text={<FaRegUser />}
            stylingClasses={"text-primary-foreground lg:hidden border-none"}
          />
          <Link href={"/"}>
            <div className="flex flex-1 items-center justify-center gap-2 lg:flex-none lg:gap-4">
              <div className="relative h-10 w-10 rounded-full lg:h-14 lg:w-14">
                <Image
                  src={logo}
                  width={"100"}
                  height={"100"}
                  alt="Logo"
                  className="rounded-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                />
              </div>
              <span className="font-semibold text-primary lg:text-xl">
                Food Cheetah
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden items-center justify-center gap-3 lg:flex">
              <LoginModal
                text={"Login"}
                stylingClasses={
                  "rounded-lg border border-primary px-6 py-5 transition-all ease-in-out hover:bg-[#f0ecec]"
                }
              />
              <LoginModal
                text={"Sign Up"}
                stylingClasses={
                  "rounded-lg border border-primary bg-primary px-6 py-5 font-semibold text-white transition-all ease-in-out hover:brightness-90"
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;
