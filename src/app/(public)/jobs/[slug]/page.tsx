import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Zap, Building2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ResumeUpload } from "@/components/forms/resume-upload";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
    },
  });

  if (!job) notFound();

  return (
    <div className="container mx-auto max-w-5xl py-12 px-6">
      <Link href="/jobs" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar para vagas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {job.type === "MANAGED" && (
                <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1">
                  <Zap className="h-3 w-3 mr-2 fill-primary" />
                  Managed Service
                </Badge>
              )}
              <Badge variant="outline" className="rounded-full border-white/10 text-muted-foreground px-4 py-1">
                {job.isRemote ? "Remoto" : "Presencial"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary/60" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary/60" />
                {job.salaryRange || "Não informado"}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary/60" />
                Publicada {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: ptBR })}
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-4">Sobre a vaga</h3>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
              {job.description}
            </div>
          </div>
        </div>

        {/* Sidebar / Application Form */}
        <aside className="space-y-8">
          {/* Company Card */}
          <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center font-black text-primary text-xl">
                {job.company.logoUrl ? (
                  <img src={job.company.logoUrl} alt={job.company.name} className="object-cover" />
                ) : (
                  job.company.name.charAt(0)
                )}
              </div>
              <div>
                <p className="font-black text-lg leading-none">{job.company.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Empresa verificada</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.company.description || "Nenhuma descrição fornecida pela empresa."}
            </p>
            <Button variant="outline" className="w-full rounded-xl font-bold border-white/5 bg-white/5">
              <Building2 className="h-4 w-4 mr-2" />
              Ver Perfil
            </Button>
          </div>

          {/* Application Box */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-blue-600 shadow-2xl shadow-primary/20 text-primary-foreground space-y-6">
            <h3 className="text-2xl font-black leading-tight">Envie sua candidatura</h3>
            <p className="text-sm text-primary-foreground/80">
              {job.type === "MANAGED" 
                ? "Esta vaga está sob nossa curadoria. Nossos especialistas analisarão seu currículo."
                : "Seu currículo será enviado diretamente para o time de RH da empresa."}
            </p>
            
            <div className="space-y-4">
              {/* Note: In a real app, we'd handle the application state here */}
              <ResumeUpload onUploadComplete={(url) => console.log("Uploaded:", url)} />
              
              <Button className="w-full h-14 rounded-2xl bg-white text-black font-black text-lg hover:bg-white/90 shadow-xl">
                Finalizar Candidatura
              </Button>
            </div>
            
            <p className="text-[10px] text-center text-primary-foreground/60 uppercase tracking-widest font-bold">
              Processo 100% seguro e criptografado
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
