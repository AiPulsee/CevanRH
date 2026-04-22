import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cevan Serviços Empresariais | Recrutamento e Seleção Moderna",
  description: "A plataforma inteligente para conectar talentos e empresas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
