import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como Funciona",
  description: "Entenda como funciona o processo de recrutamento da Cevan Serviços Empresariais — do cadastro à contratação. Curadoria especializada para candidatos e empresas no Maranhão e no Brasil.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "Como Funciona — Cevan Serviços Empresariais",
    description: "Entenda o processo de recrutamento da Cevan Serviços Empresariais do cadastro à contratação.",
    url: "/how-it-works",
    type: "website",
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
