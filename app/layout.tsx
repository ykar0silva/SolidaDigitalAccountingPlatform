import type { Metadata, Viewport } from "next";
import "./globals.css";
import { urbanist, dreamAvenue } from "@/lib/fonts";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";


export const metadata: Metadata = {
  title: "Sólida Assessoria Contábil",
  description: "Contabilidade para pequenas empresas e MEIs em Palmas-TO.",
};

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${urbanist.variable} ${dreamAvenue.variable} font-sans`}>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-dourado focus:px-5 focus:py-2 focus:font-semibold focus:text-azul"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
