"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks3, sidebarLinks2 } from "@/constants";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const links = pathname.includes("/tnp") ? sidebarLinks2 : sidebarLinks3;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="mt-5 flex w-full flex-1 flex-col gap-6 px-6">
        {links.map((link) => {
          // Update the route for the profile link to include the userId
          const route =
            link.route === "/tnp/profile"
              ? `${link.route}/${userId}`
              : link.route;

          // Determine if the link is active
          const isActive = pathname === route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`leftsidebar_link ${
                isActive ? "bg-primary-500" : "bg-transparent"
              } transition duration-200`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p
                className={`text-light-1 ${
                  isActive ? "font-bold" : ""
                } max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}

        <Link
          href="https://resume-io-inky.vercel.app/"
          className={`leftsidebar_link bg-primary-500 flex flex-row items-center justify-center xl:hidden`}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/90/FFFFFF/resume.png"
            alt=""
            className="w-[35px] h-[35px]"
          />
          <p className="text-light-1 max-lg:hidden">Generate Resume</p>
        </Link>
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
