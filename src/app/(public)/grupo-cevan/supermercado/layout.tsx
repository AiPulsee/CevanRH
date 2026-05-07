import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cevan Supermercado | Frescor e Qualidade no Maranhão",
  description: "O Cevan Supermercado traz tradição, frescor e qualidade premium ao varejo alimentar maranhense. Hortifrúti, açougue, padaria e delivery. Diversas unidades em São Luís/MA.",
};

export default function SupermercadoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
