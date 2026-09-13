import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import { QueryProvider } from "@/providers/query.provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeno Product Manager",
  description: "Sistema de gestão de produtos construído com Next.js e Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-zeno-neutral-surface text-zeno-black font-sans">
        <QueryProvider>
          <div className="flex w-full min-h-screen">
            {/* Sidebar no lado esquerdo */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
              {/* Header no topo */}
              <Navbar />

              {/* Conteúdo principal */}
              <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
