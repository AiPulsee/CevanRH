import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Grupo Cevan | Missão, Visão e História",
  description: "Conheça a história do Grupo Cevan: 15+ anos transformando o cenário corporativo do Maranhão com excelência em finanças, serviços e varejo. Nossa missão, visão e valores.",
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
