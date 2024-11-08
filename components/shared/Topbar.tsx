"use client";

import Link from "next/link";
import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

function TopBar() {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-2">
        <img src="/assets/logo6.png" alt="logo" width={60} height={60} />
        {/* <img src="/assets/logo3.png" alt="logo" width={180} height={180} /> */}
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className="flex cursor-pointer">
                <img
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </nav>
  );
}

export default TopBar;
