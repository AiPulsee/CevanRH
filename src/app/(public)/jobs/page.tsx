import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  ChevronDown,
  Clock,
  DollarSign,
  Bookmark,
  Building2,
  Zap,
  ChevronRight
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function JobsPublicPage() {
  const jobs = await prisma.job.findMany({
    where: {
      status: "ACTIVE"
    },
    include: {
      company: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-24">

      {/* Search & Banner Top (V6 Style) */}
      <div className="bg-[#f8faff] py-20 lg:py-28 border-b border-blue-100/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-blue-600/10 text-blue-600 border-none rounded-full px-4 py-1.5 font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
            Oportunidades Ativas
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
            O Próximo Passo da <br />
            <span className="text-blue-600">Sua Carreira</span>
          </h1>
          <p className="text-slate-500 font-medium mb-12 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Navegue pelas vagas mais cobiçadas do mercado e alcance seu potencial máximo com a curadoria especializada da Cevan.
          </p>

          {/* Search Box Refined */}
          <div className="p-1.5 bg-white rounded-2xl lg:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group/search">
            <div className="flex-[1.2] w-full flex items-center px-4 gap-3 group border-b md:border-b-0 md:border-r border-slate-100">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                <Search className="h-5 w-5 text-blue-600 group-focus-within:text-current transition-colors" />
              </div>
              <input
                placeholder="Qual cargo ou tecnologia?"
                className="h-14 w-full bg-transparent border-none outline-none focus:ring-0 text-[16px] font-bold placeholder:text-slate-300 px-2"
              />
            </div>
            <div className="flex-1 w-full flex items-center px-4 gap-3 group">
              <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-current transition-colors" />
              </div>
              <input
                placeholder="Localização (Ex: Remoto)"
                className="h-14 w-full bg-transparent border-none outline-none focus:ring-0 text-[16px] font-bold placeholder:text-slate-300 px-2"
              />
            </div>
            <Button className="w-full md:w-auto h-14 md:rounded-full rounded-xl px-12 bg-[#1967D2] hover:bg-blue-700 font-black shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all uppercase tracking-widest text-xs">
              Localizar Vaga
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] h-fit sticky top-28">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Filter className="h-5 w-5 text-[#1967D2]" />
            <h3 className="font-bold text-slate-900 text-[16px]">Filtros</h3>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-[14px]">Tipo de Vaga</h4>
            <div className="space-y-3">
              {["Tempo Integral", "Meio Período", "Freelancer", "Estágio", "Temporário"].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#1967D2] focus:ring-[#1967D2]" />
                  <span className="text-[14px] font-medium text-slate-600 group-hover:text-slate-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-[14px]">Nível de Experiência</h4>
            <div className="space-y-3">
              {["Estudante", "Júnior", "Pleno", "Sênior", "Diretor"].map(exp => (
                <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#1967D2] focus:ring-[#1967D2]" />
                  <span className="text-[14px] font-medium text-slate-600 group-hover:text-slate-900">{exp}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-[14px]">Faixa Salarial</h4>
            <p className="text-xs text-slate-500 font-medium pb-2">R$ 1.000 - R$ 30.000</p>
            <input type="range" min="1000" max="30000" defaultValue="10000" className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-[#1967D2]" />
          </div>

          <Button variant="outline" className="w-full font-bold text-[#1967D2] border-blue-100 bg-blue-50/50 hover:bg-[#1967D2] hover:text-white transition-colors">
            Aplicar Filtros
          </Button>
        </aside>

        {/* Jobs List Section */}
        <div className="lg:col-span-3 space-y-6">

          {/* Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div className="text-slate-500 text-[15px] font-medium">
              Mostrando <span className="font-bold text-slate-900">1 - {jobs.length}</span> de {jobs.length} vagas
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Ordenar por:</span>
              <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#1967D2] focus:border-[#1967D2] block p-2 outline-none cursor-pointer font-medium shadow-sm">
                <option>Mais Recentes</option>
                <option>Maior Salário</option>
                <option>Mais Relevantes</option>
              </select>
              <div className="lg:hidden">
                <Button variant="outline" size="icon" className="border-slate-200">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Job Cards (List Format) */}
          <div className="space-y-5">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6 border border-slate-100 bg-white hover:border-[#1967D2]/40 hover:shadow-[0_12px_40px_rgb(25,103,210,0.06)] hover:-translate-y-1 transition-all duration-300 rounded-[1.2rem] relative group cursor-pointer">
                
                <button className="absolute top-6 right-6 text-slate-300 hover:text-[#1967D2] bg-slate-50 hover:bg-blue-50 transition-colors p-2.5 rounded-full z-10">
                  <Bookmark className="h-4 w-4" />
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <Link href={`/jobs/${job.slug}`} className="flex items-start md:items-center gap-5 flex-1">
                    <div className={`h-14 w-14 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-xl shadow-sm ${job.type === 'MANAGED' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                      {job.company.logoUrl ? (
                         <img src={job.company.logoUrl} alt={job.company.name} className="h-full w-full object-cover rounded-xl" />
                      ) : (
                         job.company.name.charAt(0)
                      )}
                    </div>
                    <div className="pr-12 md:pr-0">
                      <h4 className="font-bold text-[18px] text-slate-900 group-hover:text-[#1967D2] transition-colors leading-tight mb-2">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-[#1967D2]" /> {job.company.name}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-slate-400" /> {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: ptBR })}</span>
                        <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-green-500 font-bold" /> {job.salaryRange || "A combinar"}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-slate-50 md:border-none">
                    <div className="flex gap-2">
                      <Badge className="bg-blue-50/80 hover:bg-blue-100 text-[#1967D2] border-none rounded-full px-3 py-1 text-[11px] font-semibold transition-colors">{job.isRemote ? "Remoto" : "Presencial"}</Badge>
                      {job.type === 'MANAGED' && (
                        <Badge className="bg-orange-50/80 hover:bg-orange-100 text-orange-600 border-none rounded-full px-3 py-1 text-[11px] font-semibold transition-colors flex items-center gap-1">
                          <Zap className="h-3 w-3 fill-current" /> Patrocinada
                        </Badge>
                      )}
                    </div>
                    <Link href={`/jobs/${job.slug}`}>
                      <Button className="rounded-lg h-9 w-9 p-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-200 bg-white text-slate-400">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Box */}
          {jobs.length > 10 && (
            <div className="pt-10 flex justify-center pb-8">
              <div className="flex items-center gap-2">
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#1967D2] hover:border-[#1967D2] font-semibold transition-colors">1</button>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1967D2] border border-[#1967D2] text-white font-semibold shadow-md">2</button>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#1967D2] hover:border-[#1967D2] font-semibold transition-colors">3</button>
                <span className="text-slate-400 font-bold px-2">...</span>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#1967D2] hover:border-[#1967D2] font-semibold transition-colors">24</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
