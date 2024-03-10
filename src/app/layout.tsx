import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { ThemeProvider } from "@/components/themeprovider";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfiloy",
  description: "The only portfilo maker you will ever need!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={cn(fredoka.className, "w-full h-full flex flex-col")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

          <div className="flex flex-col w-full h-full items-end justify-end">
            <div className="flex w-full text-center items-center ml-5 mt-5">
              <Footer />
            </div>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
