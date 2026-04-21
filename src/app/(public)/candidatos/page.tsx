"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Filter, 
  Briefcase,
  Star,
  ExternalLink,
  Code,
  DollarSign,
  ChevronRight,
  TrendingDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CandidatesPublicPage() {
  const candidates = [
    { name: "Camila Fernandes", role: "UX/UI Designer Sênior", loc: "São Paulo, SP", exp: "8 Anos", minSalary: "R$ 10.000", tags: ["Figma", "Design System", "User Research"], bg: "bg-blue-50/50", img: "/feature-woman.png" },
    { name: "Rafael Souza", role: "Engenheiro de Software", loc: "Campinas, SP", exp: "5 Anos", minSalary: "R$ 12.000", tags: ["React", "Typescript", "Node.js", "AWS"], bg: "bg-blue-50/50", img: "/hero-man.png" },
    { name: "Aline Barros", role: "Especialista em RH", loc: "Curitiba, PR", exp: "10 Anos", minSalary: "R$ 8.500", tags: ["Sourcing", "Tech Recruitment"], bg: "bg-teal-50/50", img: "/feature-woman.png" },
    { name: "Marcos Túlio", role: "Arquiteto de Soluções", loc: "Remoto (Brasil)", exp: "7 Anos", minSalary: "R$ 18.000", tags: ["Python", "Cloud Native", "Kubernetes"], bg: "bg-sky-50/50", img: "/hero-man.png" },
    { name: "Larissa Costa", role: "Growth Manager B2B", loc: "Belo Horizonte, MG", exp: "6 Anos", minSalary: "R$ 11.000", tags: ["Google Ads", "Inbound Marketing"], bg: "bg-blue-50/50", img: "/feature-woman.png" },
    { name: "Tiago Silva", role: "Cientista de Dados", loc: "Florianópolis, SC", exp: "4 Anos", minSalary: "R$ 14.000", tags: ["Machine Learning", "Databricks", "R"], bg: "bg-rose-50/50", img: "/hero-man.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      
      {/* Search Header Banner */}
      <div className="bg-[#f0f5fc] py-12 lg:py-16 border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left flex-1">
               <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Candidatos de Elite</h1>
               <p className="text-slate-500 font-medium">Ligue-se aos perfis de alta performance prontos para elevar a produtividade da sua organização.</p>
            </div>
            
            <div className="bg-white p-2.5 md:rounded-full rounded-2xl shadow-xl shadow-blue-900/5 flex-1 w-full max-w-2xl flex flex-col md:flex-row gap-2 border border-blue-50 items-center">
                <div className="flex-1 w-full flex items-center px-4 relative group">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#1967D2] transition-colors" />
                  <Input placeholder="Qual cargo ou habilidade?" className="h-12 border-none bg-transparent focus-visible:ring-0 text-[15px] shadow-none" />
                </div>
                <div className="hidden md:block w-px h-8 bg-slate-100" />
                <div className="flex-1 w-full flex items-center px-4 relative group">
                  <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-[#1967D2] transition-colors" />
                  <Input placeholder="Qualquer localização" className="h-12 border-none bg-transparent focus-visible:ring-0 text-[15px] shadow-none" />
                </div>
                <Button className="w-full md:w-auto h-12 md:rounded-full rounded-xl px-8 bg-[#1967D2] hover:bg-blue-700 font-bold shadow-md hover:-translate-y-0.5 transition-all text-white">
                  Buscar
                </Button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit sticky top-28">
               <div className="flex items-center gap-2 pb-5 border-b border-slate-100">
                  <Filter className="h-5 w-5 text-[#1967D2]" />
                  <h3 className="font-bold text-slate-900 text-[16px]">Filtros</h3>
               </div>

               <div className="space-y-4 pt-5">
                 <h4 className="font-bold text-slate-900 text-[14px]">Especialidade</h4>
                 <div className="space-y-3">
                   {["Estratégia UX", "Engenharia de Software", "Dados & BI", "Marketing B2B", "Liderança", "Produto"].map(type => (
                     <label key={type} className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#1967D2] focus:ring-[#1967D2]" />
                       <span className="text-[14px] font-medium text-slate-600 group-hover:text-slate-900">{type}</span>
                     </label>
                   ))}
                 </div>
               </div>

               <div className="space-y-4 pt-5 border-t border-slate-100 mt-5">
                 <h4 className="font-bold text-slate-900 text-[14px]">Nível Hierárquico</h4>
                 <div className="space-y-3">
                   {["Júnior", "Pleno", "Sênior", "Especialista / Principal"].map(exp => (
                     <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#1967D2] focus:ring-[#1967D2]" />
                       <span className="text-[14px] font-medium text-slate-600 group-hover:text-slate-900">{exp}</span>
                     </label>
                   ))}
                 </div>
               </div>

               <Button variant="outline" className="w-full mt-6 font-bold text-[#1967D2] border-blue-200 bg-blue-50/50 hover:bg-[#1967D2] hover:text-white transition-colors h-11">
                 Aplicar Filtros
               </Button>
           </div>
        </aside>

        {/* Horizontal Candidate List */}
        <div className="lg:col-span-3 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="text-slate-500 text-[15px] font-medium">
                 Apresentando <span className="font-bold text-slate-900">{candidates.length}</span> resultados de talentos disponíveis
              </div>
              <div className="flex items-center gap-3">
                 <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-[#1967D2] focus:border-[#1967D2] block px-4 py-2 outline-none cursor-pointer font-medium shadow-sm">
                   <option>Maior Relevância</option>
                   <option>Maior Experiência</option>
                   <option>Salário Fixo Menor</option>
                 </select>
              </div>
            </div>

            {/* Premium Horizontal Cards */}
            <div className="space-y-4">
              {candidates.map((cand, i) => (
                <Card key={i} className="p-6 border border-slate-200/60 bg-white hover:border-[#1967D2]/40 hover:shadow-[0_12px_40px_rgb(25,103,210,0.06)] hover:-translate-y-1 transition-all duration-300 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group">
                  
                  <div className="flex items-center gap-6 w-full md:w-auto">
                     <div className={`h-20 w-20 rounded-2xl mb-auto flex-shrink-0 overflow-hidden relative shadow-sm border border-slate-100 ${cand.bg}`}>
                       <Image src={cand.img} alt="Candidate" fill className="object-cover" />
                     </div>
                     
                     <div>
                       <Link href={`/candidatos/perfil`} className="font-extrabold text-[19px] text-slate-900 group-hover:text-[#1967D2] transition-colors leading-tight mb-1 block hover:underline underline-offset-4 decoration-2">{cand.name}</Link>
                       <p className="text-[14px] text-slate-500 font-bold mb-3">{cand.role}</p>
                       
                       <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {cand.loc}</span>
                          <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-slate-400"/> {cand.exp}</span>
                          <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-slate-400"/> Pretenção: {cand.minSalary}</span>
                       </div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-slate-50 md:border-none md:min-w-[200px]">
                     <div className="flex flex-wrap justify-end gap-2 mb-2 w-full max-w-[250px] md:max-w-none">
                        {cand.tags.map(tag => (
                          <Badge key={tag} className="bg-slate-50 text-slate-600 hover:text-slate-900 border-none px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                            {tag}
                          </Badge>
                        ))}
                     </div>
                     
                     <Link href={`/candidatos/perfil`} className="w-full sm:w-auto md:w-full">
                        <Button variant="outline" className="w-full bg-white text-[#1967D2] hover:bg-[#1967D2] border-blue-200 hover:border-[#1967D2] hover:text-white transition-colors h-10 rounded-xl font-bold gap-2">
                           Ver Currículo <ChevronRight className="h-4 w-4" />
                        </Button>
                     </Link>
                  </div>

                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pt-10 flex justify-center">
               <div className="flex items-center gap-2">
                 <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#1967D2] hover:border-[#1967D2] font-semibold transition-colors">1</button>
                 <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#1967D2] border border-[#1967D2] text-white font-semibold shadow-md">2</button>
                 <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#1967D2] hover:border-[#1967D2] font-semibold transition-colors">3</button>
               </div>
            </div>

        </div>
      </div>
    </div>
  );
}
