import type { Metadata } from "next";
import "./globals.css";
import { urbanist, dreamAvenue } from "@/lib/fonts";
import Navbar from "@/components/Navbar/Navbar";


export const metadata: Metadata = {
  title: "Sólida Assessoria Contábil",
  description: "Contabilidade para pequenas empresas e MEIs em Palmas-TO.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${urbanist.variable} ${dreamAvenue.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}