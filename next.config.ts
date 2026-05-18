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
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: permite o próprio domínio + inline necessário para Next.js hidration
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Estilos: permite inline (Tailwind CSS) e Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fontes: Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Imagens: permite o próprio domínio + o bucket R2 público
      `img-src 'self' data: blob: ${process.env.R2_PUBLIC_DOMAIN ?? ""}`,
      // Conexões: permite API calls para o próprio domínio + Groq AI + R2 (upload direto)
      `connect-src 'self' https://api.groq.com ${process.env.R2_ENDPOINT ?? ""} https://*.r2.cloudflarestorage.com`,
      // Upload direto para o R2 via pre-signed URL
      `form-action 'self'`,
      // Frames: nunca
      "frame-ancestors 'none'",
    ]
      .join("; ")
      .trim(),
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
