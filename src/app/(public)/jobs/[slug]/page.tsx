import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MapPin, DollarSign, Clock, Zap, Building2, ChevronLeft, 
  ShieldCheck, Share2, Info, Star, CheckCircle2, Lightbulb
} from "lucide-react";
import Link from "next/link";
import { JobApplicationForm } from "@/components/public/job-application-form";
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
    <div className="bg-[#FAFBFC] min-h-screen pt-24 pb-20">
      
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10 py-12 lg:py-16">
          <Link href="/jobs" className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 mb-8 transition-all group">
            <ChevronLeft className="h-4 w-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Vagas Disponíveis
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                {job.type === "MANAGED" && (
                  <Badge className="bg-blue-600 text-white border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                    <Zap className="h-3 w-3 mr-1.5 fill-white" />
                    Curadoria Ativa Cevan
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                  {job.isRemote ? "100% Remoto" : "Presencial / Híbrido"}
                </Badge>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] max-w-4xl">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Empresa</p>
                    <p className="text-[15px] font-black text-slate-900">{job.company.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Localização</p>
                    <p className="text-[15px] font-black text-slate-900">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Remuneração</p>
                    <p className="text-[15px] font-black text-emerald-600">{job.salaryRange || "A combinar"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="h-14 w-14 rounded-2xl border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all">
                <Star className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Job Description Card */}
            <div className="bg-white rounded-[2rem] p-10 lg:p-12 border border-slate-100 shadow-sm">
              <div className="prose prose-slate max-w-none">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1 bg-blue-600 rounded-full" />
                  <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] m-0">Sobre a Oportunidade</h3>
                </div>
                
                <div className="text-slate-600 leading-[1.8] whitespace-pre-wrap text-[16px] font-medium">
                  {job.description}
                </div>

                {job.responsibilities && (
                  <div className="mt-12 space-y-4">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" /> Responsabilidades
                    </h4>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[14px] font-medium pl-6">
                      {job.responsibilities}
                    </div>
                  </div>
                )}

                {job.requirements && (
                  <div className="mt-12 space-y-4">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" /> Requisitos & Qualificações
                    </h4>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[14px] font-medium pl-6">
                      {job.requirements}
                    </div>
                  </div>
                )}

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <Star className="h-4 w-4 text-blue-600" /> Benefícios & Vantagens
                    </h4>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[13px] font-medium">
                      {job.benefits || "Não informado"}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" /> Informações Adicionais
                    </h4>
                    <div className="space-y-3">
                      <p className="text-[13px] text-slate-500 font-medium m-0">Tipo: <span className="text-slate-900 font-bold">Contratação {job.type === "MANAGED" ? "Premium" : "CLT"}</span></p>
                      <p className="text-[13px] text-slate-500 font-medium m-0">Modelo: <span className="text-slate-900 font-bold">{job.isRemote ? "100% Remoto" : "Híbrido/Presencial"}</span></p>
                      <p className="text-[13px] text-slate-500 font-medium m-0">Postada: <span className="text-slate-900 font-bold">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: ptBR })}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Deep Dive Card - NOW ON LEFT */}
            <Card className="p-8 lg:p-10 rounded-[2rem] border-slate-100 bg-white shadow-sm space-y-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-600 text-2xl overflow-hidden shadow-sm">
                    {job.company.logoUrl ? (
                      <img src={job.company.logoUrl} alt={job.company.name} className="h-full w-full object-cover" />
                    ) : (
                      job.company.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-slate-900 leading-tight mb-2">Sobre a {job.company.name}</h3>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> Empresa Verificada pela Cevan
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="h-12 px-8 rounded-xl font-black text-[11px] uppercase tracking-widest border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all">
                  Conhecer a Empresa
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="md:col-span-2">
                  <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                    {job.company.description || "Líder no segmento, com foco total em inovação e pessoas. Uma empresa que valoriza o desenvolvimento profissional e a diversidade em seus times."}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tamanho</p>
                    <p className="text-[14px] font-black text-slate-900">500+ Colaboradores</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Indústria</p>
                    <p className="text-[14px] font-black text-slate-900">Tecnologia & Inovação</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Dicas Cevan Card - NOW AS A BANNER ON LEFT */}
            {job.tips && (
              <Card className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none shadow-xl shadow-blue-200 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-400/10 opacity-50" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                      <Lightbulb className="h-7 w-7 text-white" />
                  </div>
                  <div className="space-y-1 text-center md:text-left flex-1">
                    <h4 className="text-xl font-black leading-tight">Dicas da Cevan para esta vaga</h4>
                    <p className="text-[13px] font-medium text-blue-100 leading-relaxed">
                      {job.tips}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              {/* Application Card */}
              <JobApplicationForm jobId={job.id} jobType={job.type} />
              
              {/* Pequeno Card de Ajuda ou Atalho */}
              <Card className="p-6 rounded-2xl bg-slate-50 border-slate-100 text-slate-600 space-y-3">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Precisa de Ajuda?</h5>
                <p className="text-[12px] font-medium leading-relaxed">
                  Tem alguma dúvida sobre esta vaga? Entre em contato com nosso suporte ao candidato.
                </p>
                <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">
                  Falar com Consultor
                </Link>
              </Card>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}

