export const dynamic = "force-dynamic";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Building2,
  Users,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Globe
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EmployersPublicPage() {
  const companies = await prisma.company.findMany({
    include: {
      _count: {
        select: { jobs: { where: { status: 'ACTIVE' } } }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      
      {/* Hero Section - Premium & Clean */}
      <section className="bg-white border-b border-slate-100 py-24 lg:py-32 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px] translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[0.95]">
              Descubra onde o <br />
              <span className="text-blue-600">futuro</span> acontece.
            </h1>
            <p className="text-slate-500 font-medium mb-12 text-lg lg:text-xl leading-relaxed">
              Conecte-se com as organizações mais inovadoras do mercado e encontre <br className="hidden lg:block" /> a cultura que impulsiona o seu propósito.
            </p>
            
            {/* Integrated Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 p-2 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm max-w-2xl">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Search className="h-5 w-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Buscar empresa ou setor..."
                  className="w-full h-12 bg-transparent border-none focus:ring-0 text-slate-900 font-bold placeholder-slate-400"
                />
              </div>
              <Button className="h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[12px] uppercase tracking-widest shadow-lg shadow-blue-200 transition-all">
                Pesquisar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
         <div className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-6 border-b border-slate-200/60 gap-4">
            <div className="text-slate-500 text-[14px] font-bold flex items-center gap-2 uppercase tracking-widest">
              <TrendingUp className="h-4 w-4 text-blue-600" /> 
              Exibindo <span className="text-slate-900">{companies.length}</span> corporações
            </div>
            <div className="flex gap-4">
              <select className="bg-white border border-slate-200 text-slate-700 text-[13px] rounded-xl focus:ring-blue-600 focus:border-blue-600 block px-4 py-2.5 outline-none cursor-pointer font-bold shadow-sm transition-all">
                <option>Ordenar por Nome</option>
                <option>Mais Vagas Abertas</option>
                <option>Recém Adicionadas</option>
              </select>
            </div>
         </div>

         {/* Employers Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <Link key={company.id} href={`/empresas/${company.slug}`}>
                <Card className="group border-slate-100 bg-white hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(25,103,210,0.08)] transition-all duration-500 rounded-[2.5rem] p-8 flex flex-col h-full relative overflow-hidden">
                  {/* Subtle hover background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-600 text-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-500">
                      {company.logoUrl ? (
                        <img src={company.logoUrl} alt={company.name} className="h-full w-full object-cover" />
                      ) : (
                        company.name.charAt(0)
                      )}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10 mb-8">
                    <h3 className="font-black text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {company.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-slate-50 text-slate-500 border-none font-bold text-[11px] px-3 py-1 uppercase tracking-widest">
                        {company.industry || "Tecnologia"}
                      </Badge>
                      {company.location && (
                        <Badge className="bg-slate-50 text-slate-400 border-none font-bold text-[11px] px-3 py-1 uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {company.location}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[14px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                      {company.description || "Inovação e cultura focada em excelência e pessoas."}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-black text-[13px] text-slate-900">
                        {company._count.jobs} vagas <span className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">Abertas</span>
                      </span>
                    </div>
                    {company.website && (
                      <div className="text-slate-300 hover:text-blue-600 transition-colors">
                        <Globe className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
         </div>

         {/* Empty State if no companies */}
         {companies.length === 0 && (
           <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
             <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-6" />
             <h3 className="text-xl font-black text-slate-900 mb-2">Nenhuma empresa encontrada</h3>
             <p className="text-slate-500 font-medium">Tente ajustar seus filtros de busca.</p>
           </div>
         )}
      </div>
    </div>
  );
}
