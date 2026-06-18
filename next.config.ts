import type { NextConfig } from "next";

const securityHeaders = [
  // Impede MIME-type sniffing (ex: arquivo .txt sendo executado como JS)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Impede que a página seja embutida em iframes de outros domínios (anti-clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Controla o quanto do referrer é enviado em navegações cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desativa acesso a câmera, microfone e geolocalização por padrão
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Força HTTPS por 1 ano em produção (incluindo subdomínios)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const r2Hostname = process.env.R2_PUBLIC_DOMAIN
  ? new URL(process.env.R2_PUBLIC_DOMAIN).hostname
  : "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: r2Hostname
      ? [{ protocol: "https", hostname: r2Hostname }]
      : [],
  },
  async headers() {
    return [
      {
        // Aplica os headers de segurança em todas as rotas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
