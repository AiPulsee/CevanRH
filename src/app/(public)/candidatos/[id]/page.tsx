"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Briefcase, 
  Globe, 
  Mail, 
  Calendar,
  CheckCircle2,
  DollarSign,
  ArrowLeft,
  GraduationCap,
  Award,
  Download
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data for the candidate
  const candidate = {
    name: "Camila Fernandes",
    role: "UX/UI Designer Sênior",
    location: "São Paulo, SP",
    experience: "8 Anos",
    salary: "R$ 10.000 /mês",
    availability: "Imediata",
    about: "Sou uma UX/UI Designer apaixonada por resolver problemas complexos com soluções elegantes e centradas no usuário. Nos últimos 8 anos, liderei o design de produtos para startups em fase de hipercrescimento e grandes corporações, focando sempre em métricas de conversão e acessibilidade.",
    skills: ["Figma", "Design System", "Ágil", "UX Research", "Prototipagem Alta Fidelidade", "HTML/CSS"],
    education: [
      { degree: "Mestrado em Interação Humano-Computador", school: "Universidade de São Paulo (USP)", period: "2018 - 2020" },
      { degree: "Bacharelado em Design Gráfico", school: "Belas Artes", period: "2013 - 2017" }
    ],
    bg: "bg-blue-100",
    img: "/feature-woman.png"
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      
      {/* Top Banner Cover */}
      <div className="h-48 lg:h-64 w-full relative overflow-hidden bg-slate-900 top-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1967D2] to-blue-800 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFC] via-transparent to-transparent opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full -mt-24 lg:-mt-32 relative z-10 pb-20">
         
         <Link href="/candidatos" className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium mb-8 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para Talentos
         </Link>

         {/* Main Candiate Box Header */}
         <Card className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_20px_40px_-15px_rgba(25,103,210,0.08)] border-slate-100 mb-10 border-none">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                  <div className={`h-32 w-32 rounded-full overflow-hidden relative shadow-xl border-4 border-white ${candidate.bg}`}>
                    <Image src={candidate.img} alt="Candidate Profile" fill className="object-cover" />
                  </div>
                  <div className="pt-2">
                     <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                       <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{candidate.name}</h1>
                       <Badge className="bg-blue-50 text-[#1967D2] border-none font-bold shadow-sm flex items-center gap-1.5 px-3 py-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Disponível
                       </Badge>
                     </div>
                     <p className="text-slate-500 font-bold text-[18px] mb-4 text-[#1967D2]">{candidate.role}</p>
                     
                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-[14px] text-slate-600 font-medium">
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {candidate.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-slate-400" /> {candidate.experience}</span>
                        <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-slate-400" /> Pretenção: <b className="text-slate-900">{candidate.salary}</b></span>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                   <Button variant="outline" size="lg" className="flex-1 lg:flex-none border-blue-200 text-[#1967D2] font-bold bg-blue-50/50 hover:bg-blue-100 hover:text-blue-700 h-14 rounded-xl px-8 shadow-sm">
                     <Download className="h-5 w-5 mr-2" /> Baixar CV
                   </Button>
                   <Button size="lg" className="flex-1 lg:flex-none bg-[#1967D2] hover:bg-blue-700 font-bold h-14 rounded-xl px-10 shadow-md shadow-blue-500/25">
                     Convidar para Entrevista
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
                 <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Sobre o Profissional</h3>
                 <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium text-[16px]">
                   <p>{candidate.about}</p>
                 </div>
               </section>

               {/* Skills */}
               <section>
                 <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Principais Competências</h3>
                 <div className="flex flex-wrap gap-3">
                    {candidate.skills.map(skill => (
                      <Badge key={skill} className="bg-white border-blue-100 text-slate-600 hover:border-blue-300 font-bold px-4 py-2 text-[14px] shadow-sm">
                         {skill}
                      </Badge>
                    ))}
                 </div>
               </section>

               {/* Education */}
               <section>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">Formação Acadêmica</h3>
                  <div className="space-y-6">
                     {candidate.education.map((edu, i) => (
                       <div key={i} className="flex gap-5">
                          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-[#1967D2] flex-shrink-0 mt-1">
                             <GraduationCap className="h-6 w-6" />
                          </div>
                          <div>
                             <h4 className="font-bold text-lg text-slate-900 mb-1">{edu.degree}</h4>
                             <p className="text-slate-600 font-medium text-[15px]">{edu.school}</p>
                             <p className="text-slate-400 text-[13px] font-semibold mt-1">{edu.period}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>
            </div>

            {/* Right Column (Sidebar details) */}
            <aside className="space-y-6">
               
               <Card className="bg-white border-slate-100 rounded-[1.5rem] p-8 shadow-sm">
                  <h4 className="font-extrabold text-slate-900 mb-6 text-[18px]">Resumo do Perfil</h4>
                  
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1967D2] flex-shrink-0">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-500 font-medium">Experiência Total</p>
                        <p className="font-bold text-slate-900">{candidate.experience}</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1967D2] flex-shrink-0">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-500 font-medium">Nível de Inglês</p>
                        <p className="font-bold text-slate-900">Fluente / Avançado</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1967D2] flex-shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-500 font-medium">Disponibilidade</p>
                        <p className="font-bold text-blue-600">{candidate.availability}</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="pt-6 mt-6 border-t border-slate-100">
                     <Button className="w-full font-bold bg-[#1967D2] hover:bg-blue-700 text-white gap-2 h-12 rounded-xl">
                       <Mail className="h-4 w-4" /> Enviar E-mail Direto
                     </Button>
                  </div>
               </Card>

            </aside>
         </div>
      </div>
    </div>
  );
}
