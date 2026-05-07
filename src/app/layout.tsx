import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://grupocevan.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cevan Serviços Empresariais | Recrutamento e Seleção no Maranhão",
    template: "%s | Cevan Serviços Empresariais",
  },
  description: "A Cevan Serviços Empresariais conecta talentos e empresas no Maranhão e em todo o Brasil com curadoria especializada. Encontre vagas de emprego ou contrate profissionais qualificados.",
  keywords: ["recrutamento", "seleção", "vagas de emprego", "RH", "recursos humanos", "Maranhão", "São Luís", "Brasil", "Cevan", "emprego", "consultoria RH"],
  authors: [{ name: "Cevan Serviços Empresariais" }],
  creator: "Cevan Serviços Empresariais",
  publisher: "Cevan Serviços Empresariais",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cevan Serviços",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Cevan Serviços Empresariais",
    title: "Cevan Serviços Empresariais | Recrutamento e Seleção no Maranhão",
    description: "A Cevan Serviços Empresariais conecta talentos e empresas no Maranhão e em todo o Brasil com curadoria especializada.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cevan Serviços Empresariais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cevan Serviços Empresariais | Recrutamento e Seleção no Maranhão",
    description: "Conectamos talentos e empresas no Maranhão e no Brasil com curadoria especializada.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { Toaster } from "sonner";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cevan Serviços Empresariais",
  url: "https://grupocevan.com.br",
  logo: "https://grupocevan.com.br/logo.png",
  description: "Empresa especializada em recrutamento e seleção no Maranhão e em todo o Brasil com curadoria especializada.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "MA",
    addressCountry: "BR",
  },
  areaServed: ["MA", "BR"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
