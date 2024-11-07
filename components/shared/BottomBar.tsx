"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks2, sidebarLinks3 } from "@/constants";
import { useAuth } from "@clerk/nextjs";

function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const links = pathname.includes("/tnp") ? sidebarLinks2 : sidebarLinks3;
  const isStudent = links === sidebarLinks3;

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {links.map((link) => {
          const route =
            link.route === "/tnp/profile"
              ? `${link.route}/${userId}`
              : link.route;
          const isActive = pathname === route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />

              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}

        {isStudent && (
          <Link
            className={`leftsidebar_link transition duration-200`}
            href={"https://resume-io-inky.vercel.app/"}
          >
            <Image
              src={"/assets/resume.png"}
              alt={"resume"}
              width={24}
              height={24}
            />
            <p className={`text-light-1 max-lg:hidden`}>Resume</p>
          </Link>
        )}
      </div>
    </section>
  );
}

export default Bottombar;
