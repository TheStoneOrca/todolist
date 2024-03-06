import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { ThemeProvider } from "@/components/themeprovider";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todoy",
  description: "The Only TodoList You'll Ever Need!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
    </html>
  );
}
