import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/shared/Topbar";
import LeftSideBar from "@/components/shared/LeftsideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerBoost",
  description:
    "CareerBoost: A streamlined web app catering to students, teaching staff, and the training/placement cell. Tailored for seamless communication and efficient collaboration in educational settings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />

        <main className="flex flex-row">
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
        </main>

        <BottomBar />
      </body>
    </html>
  );
}
