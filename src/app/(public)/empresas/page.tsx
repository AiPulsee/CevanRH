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
  Users,
  ChevronRight,
  TrendingUp,
  Bookmark
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EmployersPublicPage() {
  const employers = [
    { name: "Google Cloud BR", industry: "Tecnologia e Nuvem", jobs: 12, loc: "São Paulo, SP", rating: 4.8, emp: "10k+", logo: "G", bg: "bg-gradient-to-br from-blue-600 to-blue-800", cover: "bg-blue-50" },
    { name: "Nubank", industry: "Serviços Financeiros", jobs: 45, loc: "São Paulo, SP", rating: 4.9, emp: "5k+", logo: "NU", bg: "bg-gradient-to-br from-blue-600 to-blue-800", cover: "bg-blue-50" },
    { name: "Stripe", industry: "Tecnologia Fintech", jobs: 8, loc: "Remoto / Global", rating: 4.7, emp: "7k+", logo: "S", bg: "bg-gradient-to-br from-blue-700 to-slate-900", cover: "bg-slate-100" },
    { name: "MercadoLivre", industry: "E-Commerce", jobs: 120, loc: "Osasco, SP", rating: 4.5, emp: "15k+", logo: "ML", bg: "bg-gradient-to-br from-yellow-400 to-amber-500", cover: "bg-yellow-50" },
    { name: "Itaú Unibanco", industry: "Setor Bancário", jobs: 89, loc: "São Paulo, SP", rating: 4.4, emp: "90k+", logo: "IU", bg: "bg-gradient-to-br from-orange-500 to-red-500", cover: "bg-orange-50" },
    { name: "Amazon", industry: "Tecnologia / Varejo", jobs: 34, loc: "São Paulo, SP", rating: 4.6, emp: "1M+", logo: "AMZ", bg: "bg-gradient-to-br from-yellow-600 to-orange-600", cover: "bg-yellow-50/50" },
    { name: "Spotify", industry: "Mídia e Streaming", jobs: 5, loc: "Remoto / SP", rating: 4.9, emp: "8k+", logo: "SP", bg: "bg-gradient-to-br from-green-500 to-emerald-700", cover: "bg-green-50" },
    { name: "Airbnb", industry: "Turismo e Viagens", jobs: 3, loc: "Remoto Global", rating: 4.8, emp: "6k+", logo: "A", bg: "bg-gradient-to-br from-red-500 to-rose-700", cover: "bg-red-50" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      
      {/* Banner Ultra Premium */}
      <div className="bg-slate-900 py-16 lg:py-24 relative overflow-hidden">
        {/* Abstract Background Vectors */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl lg:text-[52px] font-extrabold text-white mb-5 tracking-tight leading-tight">
              Acesso Exclusivo às <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Melhores Empresas</span>
            </h1>
            <p className="text-slate-300 font-medium mb-12 text-lg max-w-2xl mx-auto">Explore corporações que lideram o setor tecnológico e corporativo. Analise detalhes de cultura, expansão e descubra as melhores vagas abertas.</p>
            
            <div className="bg-white/10 backdrop-blur-xl p-2.5 md:rounded-full rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] max-w-3xl mx-auto flex flex-col md:flex-row gap-3 border border-white/20 items-center">
                <div className="flex-1 w-full flex items-center px-4 relative group">
                  <Search className="h-5 w-5 text-blue-200 group-focus-within:text-white transition-colors" />
                  <Input placeholder="Qual empresa você busca?" className="h-12 border-none bg-transparent focus-visible:ring-0 text-[16px] shadow-none text-white placeholder-blue-200/60 font-medium" />
                </div>
                <div className="hidden md:block w-px h-8 bg-white/10" />
                <div className="flex-1 w-full flex items-center px-4 relative group">
                  <MapPin className="h-5 w-5 text-blue-200 group-focus-within:text-white transition-colors" />
                  <Input placeholder="Localização" className="h-12 border-none bg-transparent focus-visible:ring-0 text-[16px] shadow-none text-white placeholder-blue-200/60 font-medium" />
                </div>
                <Button className="w-full md:w-auto h-12 md:rounded-full rounded-xl px-10 bg-[#1967D2] hover:bg-blue-600 font-bold shadow-lg hover:-translate-y-0.5 transition-all text-white border border-blue-400/30">
                  Pesquisar
                </Button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
         <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-slate-200/60 gap-4">
            <div className="text-slate-500 text-[16px] font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#1967D2]" /> Exibindo <span className="font-bold text-slate-900">{employers.length}</span> corporações em destaque
            </div>
            <div className="flex gap-4">
              <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-[#1967D2] focus:border-[#1967D2] block px-4 py-3 outline-none cursor-pointer font-semibold shadow-sm hover:border-slate-300 transition-colors">
                <option>Filtrar: Mais Relevantes</option>
                <option>Maior Nota Média</option>
                <option>Mais Vagas Abertas</option>
                <option>Crescimento Acelerado</option>
              </select>
            </div>
         </div>

         {/* Premium Employers Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {employers.map((emp, i) => (
              <Card key={i} className="group border-none bg-white hover:shadow-[0_20px_50px_rgba(25,103,210,0.12)] hover:-translate-y-1.5 transition-all duration-500 rounded-[1.5rem] flex flex-col justify-between h-full cursor-pointer overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-slate-100 relative">
                 
                 {/* Top Mini Cover */}
                 <div className={`h-24 w-full ${emp.cover} absolute top-0 inset-x-0 z-0 transition-colors duration-500 opacity-60 group-hover:opacity-100`} />
                 
                 {/* Top Right Save Icon */}
                 <button className="absolute top-4 right-4 text-slate-400 hover:text-[#1967D2] bg-white/50 backdrop-blur-sm p-2 rounded-full z-20 hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all">
                   <Bookmark className="h-4 w-4" />
                 </button>

                 <div className="relative z-10 px-8 pt-6 pb-2">
                    <div className="flex items-end justify-between mb-5">
                       {/* Floating Logo Badge */}
                       <div className={`h-[72px] w-[72px] rounded-[1.2rem] flex items-center justify-center font-black text-white text-2xl shadow-xl border-4 border-white ${emp.bg} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                         {emp.logo}
                       </div>
                    </div>

                    <h4 className="font-extrabold text-[22px] text-slate-900 group-hover:text-[#1967D2] transition-colors mb-2 tracking-tight">{emp.name}</h4>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="bg-slate-50 text-slate-600 border-slate-100 font-semibold text-[12px] flex items-center gap-1.5 px-2.5 py-1">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400" /> {emp.industry}
                      </Badge>
                      <Badge className="bg-slate-50 text-slate-600 border-slate-100 font-semibold text-[12px] flex items-center gap-1.5 px-2.5 py-1 hidden sm:flex">
                        <Users className="h-3.5 w-3.5 text-slate-400" /> {emp.emp} Func.
                      </Badge>
                    </div>
                 </div>

                 <div className="px-8 pb-8 pt-4 mt-auto space-y-4 relative z-10 bg-gradient-to-b from-transparent to-white">
                   <div className="flex items-center justify-between text-[14px]">
                     <span className="flex items-center gap-1.5 text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-md"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {emp.loc}</span>
                     <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-yellow-50 px-2 py-1 rounded-md"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {emp.rating}</span>
                   </div>
                   
                   {/* Lower Call to actions area */}
                   <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                     <span className="flex-1 font-extrabold text-[#1967D2] text-[15px] flex items-center gap-1 bg-blue-50/50 py-2.5 px-4 rounded-xl border border-blue-50">
                        {emp.jobs} Vagas Abertas
                     </span>
                     
                     <Link href={`/empresas/perfil`} className="w-12 h-12 flex items-center justify-center bg-slate-900 group-hover:bg-[#1967D2] transition-colors text-white rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-0.5 duration-300">
                        <ChevronRight className="h-5 w-5" />
                     </Link>
                   </div>
                 </div>
              </Card>
            ))}
         </div>

         {/* Deep Pagination Area */}
         <div className="pt-20 pb-8 flex flex-col items-center justify-center">
            <Button size="lg" className="text-white font-bold bg-[#1967D2] hover:bg-blue-700 rounded-2xl h-14 px-12 shadow-md shadow-blue-500/20 hover:shadow-xl hover:-translate-y-1 transition-all">
               Descobrir Mais Organizações
            </Button>
            <p className="text-slate-400 text-[13px] font-medium mt-4">Foram encontradas 1.832 organizações ativas</p>
         </div>
      </div>
    </div>
  );
}
