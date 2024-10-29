import "./globals.css";
import type { Metadata } from "next";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeRegistry>{children}</ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
