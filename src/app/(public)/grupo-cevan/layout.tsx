import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grupo Cevan | Excelência em Finanças, Serviços e Varejo",
  description: "Conheça o Grupo Cevan: Líder em soluções financeiras, terceirização de RH (Cevan Serviços) e varejo alimentar (Cevan Supermercado). Tradição e inovação a serviço do seu crescimento.",
};

export default function GrupoCevanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
