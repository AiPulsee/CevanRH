"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Briefcase, 
  Star, 
  Globe, 
  Mail, 
  Phone, 
  Share2, 
  Bookmark,
  Users,
  Calendar,
  Eye,
  CheckCircle2,
  DollarSign,
  Clock,
  ArrowLeft,
  Heart,
  Coffee,
  Laptop,
  GraduationCap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EmployerProfilePage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data for the layout
  const company = {
    name: "Google Cloud BR",
    industry: "Tecnologia",
    location: "São Paulo, SP",
    rating: 4.8,
    size: "10.000+ Funcionários",
    founded: "1998",
    views: "125k",
    about: "O Google Cloud acelera a capacidade das organizações em transformar digitalmente seus negócios e áreas de TI por meio de inovação baseada em dados e uma infraestrutura flexível, confiável e segura. Entregamos soluções criadas na infraestrutura mais limpa do setor com escalabilidade sem precedentes.",
    logo: "G",
    bg: "bg-blue-600",
    openJobs: [
      { title: "Senior Frontend Engineer", type: "Tempo Integral", loc: "Remoto / SP", salary: "R$ 15k - 22k", time: "Há 2 dias" },
      { title: "Arquiteto de Soluções AWS/GCP", type: "Tempo Integral", loc: "São Paulo, SP", salary: "R$ 20k - 28k", time: "Há 5 dias" },
      { title: "DevOps / SRE Pleno", type: "Híbrido", loc: "São Paulo, SP", salary: "R$ 12k - 16k", time: "Há 1 semana" }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      
      {/* Top Background Cover */}
      <div className="h-64 lg:h-80 w-full relative overflow-hidden bg-slate-900 top-0">
        <Image src="/feature-woman.png" alt="Company Cover" fill className="object-cover opacity-40 mix-blend-overlay" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFC] via-transparent to-transparent opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full -mt-24 lg:-mt-32 relative z-10 pb-20">
         
         <Link href="/empresas" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-8 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para Empresas
         </Link>

         {/* Main Box Header */}
         <Card className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-none mb-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                  <div className={`h-28 w-28 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-white text-[40px] shadow-lg ${company.bg} border-4 border-white`}>
                    {company.logo}
                  </div>
                  <div className="pt-2">
                     <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                       <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{company.name}</h1>
                       <Badge className="bg-blue-50 text-[#1967D2] border-none font-bold shadow-sm flex items-center gap-1.5 px-3 py-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Verificada
                       </Badge>
                     </div>
                     <p className="text-slate-500 font-medium text-[16px] mb-4">{company.industry}</p>
                     
                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-[14px] text-slate-600 font-medium">
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {company.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> Vagas: <b className="text-slate-900">{company.openJobs.length}</b></span>
                        <span className="flex items-center gap-1.5"><Eye className="h-4 w-4 text-slate-400" /> {company.views} views</span>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                   <Button variant="outline" size="lg" className="flex-1 lg:flex-none border-blue-100 text-[#1967D2] font-bold bg-blue-50/50 hover:bg-blue-100 h-14 rounded-xl px-8 shadow-sm">
                     <Mail className="h-5 w-5 mr-2" /> Mensagem
                   </Button>
                   <Button size="lg" className="flex-1 lg:flex-none bg-[#1967D2] hover:bg-blue-700 font-bold h-14 rounded-xl px-10 shadow-md shadow-blue-500/25">
                     Seguir Empresa
                   </Button>
                </div>

            </div>
         </Card>

         {/* Content Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 space-y-10">
               
               {/* About Section */}
               <section>
                 <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Sobre a Empresa</h3>
                 <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium text-[15px]">
                   <p>{company.about}</p>
                   <p className="mt-4">
                     Temos o compromisso de criar um ambiente onde todos pertencem. Procuramos pessoas de diversas origens e experiências porque acreditamos firmemente que isso promove a inovação.
                   </p>
                 </div>
               </section>

               {/* Video/Image Gallery */}
               <section>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Estrutura & Cultura</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="h-48 rounded-2xl overflow-hidden relative group cursor-pointer">
                        <Image src="/feature-woman.png" alt="Office" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="h-48 rounded-2xl overflow-hidden relative group cursor-pointer bg-slate-100">
                        <Image src="/hero-man.png" alt="People" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                           <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                             <div className="border-y-[8px] border-y-transparent border-l-[12px] border-l-[#1967D2] ml-1"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Benefits */}
               <section>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Benefícios e Vantagens</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                       { icon: Heart, label: "Saúde & Bem-estar" },
                       { icon: Laptop, label: "Equipamento Top" },
                       { icon: Coffee, label: "Auxílio Alimentação" },
                       { icon: GraduationCap, label: "Bolsa de Estudos" }
                     ].map((ben, i) => (
                       <div key={i} className="bg-white border border-slate-100 rounded-[1.5rem] p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all hover:border-blue-100 group">
                         <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           <ben.icon className="h-6 w-6" />
                         </div>
                         <span className="font-bold text-slate-700 text-sm">{ben.label}</span>
                       </div>
                     ))}
                  </div>
               </section>

               {/* Testimonials */}
               <section>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">O que dizem os Googlers</h3>
                  <div className="bg-slate-900 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px]" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                      <div className="h-24 w-24 rounded-full overflow-hidden relative flex-shrink-0 border-4 border-slate-800">
                        <Image src="/hero-man.png" alt="Testimonial" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-slate-300 italic mb-4 leading-relaxed">
                          "Trabalhar aqui é ter a certeza de que você está construindo o futuro. A cultura de autonomia e os benefícios focados no bem-estar me ajudaram a alcançar meu melhor desempenho."
                        </p>
                        <h4 className="font-bold text-white">Carlos Mendes</h4>
                        <p className="text-sm text-blue-400 font-medium">Senior Software Engineer</p>
                      </div>
                    </div>
                  </div>
               </section>

               {/* Open Jobs */}
               <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight">Vagas Abertas</h3>
                    <Link href="#" className="font-bold text-[#1967D2] text-[14px] hover:underline">Ver todas</Link>
                  </div>
                  
                  <div className="space-y-4">
                     {company.openJobs.map((job, j) => (
                       <Card key={j} className="p-6 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all rounded-[1rem] flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group">
                           <div>
                             <h4 className="font-bold text-lg text-slate-900 group-hover:text-[#1967D2] transition-colors">{job.title}</h4>
                             <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-500 font-medium mt-2">
                               <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.loc}</span>
                               <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</span>
                               <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {job.time}</span>
                             </div>
                           </div>
                           <Button className="md:w-32 rounded-xl font-bold bg-[#f2f6ff] text-[#1967D2] hover:bg-[#1967D2] hover:text-white transition-colors h-11 w-full mt-2 md:mt-0">
                             Candidatar
                           </Button>
                       </Card>
                     ))}
                  </div>
               </section>
            </div>

            {/* Right Column (Sidebar details) */}
            <aside className="space-y-6">
               
               <Card className="bg-white border-slate-100 rounded-[1.5rem] p-8 shadow-sm">
                  <h4 className="font-extrabold text-slate-900 mb-6 text-[18px]">Informações</h4>
                  
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1967D2] flex-shrink-0">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-500 font-medium">Fundação</p>
                        <p className="font-bold text-slate-900">{company.founded}</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1967D2] flex-shrink-0">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-500 font-medium">Tamanho da Empresa</p>
                        <p className="font-bold text-slate-900">{company.size}</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1967D2] flex-shrink-0">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-500 font-medium">Website</p>
                        <p className="font-bold text-[#1967D2]">www.googlecloud.com.br</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="pt-6 mt-6 border-t border-slate-100">
                     <p className="text-[13px] text-slate-500 font-medium mb-3">Redes Sociais</p>
                     <div className="flex gap-2">
                        <button className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
                          <Globe className="h-4 w-4 text-slate-600" />
                        </button>
                        <button className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors font-bold font-serif text-slate-600">
                          f
                        </button>
                        <button className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors font-bold font-serif text-slate-600">
                          in
                        </button>
                     </div>
                  </div>
               </Card>

               {/* Rating Card */}
               <Card className="bg-gradient-to-br from-slate-900 to-[#1967D2] text-white border-none rounded-[1.5rem] p-8 shadow-lg text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <h4 className="font-extrabold mb-1 text-[16px] text-blue-100">Avaliação Média</h4>
                  <p className="text-5xl font-black mb-3 text-white drop-shadow-md">{company.rating}</p>
                  <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-[13px] font-medium text-blue-200">Baseado em +25.000 avaliações de funcionários aprovadas.</p>
               </Card>

            </aside>
         </div>
      </div>
    </div>
  );
}
