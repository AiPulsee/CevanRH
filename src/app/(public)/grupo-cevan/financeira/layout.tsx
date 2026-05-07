import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cevan Financeira | Crédito Empresarial e Antecipação de Recebíveis",
  description: "A Cevan Financeira oferece soluções ágeis de crédito empresarial, antecipação de recebíveis, capital de giro e consultoria financeira para empresas de todos os portes no Maranhão.",
};

export default function FinanceiraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
