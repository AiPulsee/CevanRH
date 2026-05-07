import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a Cevan Serviços Empresariais",
  description: "Conheça a Cevan Serviços Empresariais — empresa especializada em recrutamento e seleção no Maranhão e em todo o Brasil. Nossa missão é conectar talentos e empresas com curadoria humana e tecnologia.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Sobre a Cevan Serviços Empresariais",
    description: "Conheça a Cevan Serviços Empresariais — especializada em recrutamento e seleção no Maranhão e no Brasil.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
