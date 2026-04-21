"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  ChevronRight,
  TrendingUp,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ApplyModal } from "@/components/public/apply-modal";

export default function JobsPublicPage() {
  const jobs = [
    { title: "Senior Frontend Engineer", company: "Google Cloud", type: "Full-time", location: "Remoto / SP", salary: "R$ 15k - 22k", tags: ["React", "Next.js"], managed: true },
    { title: "Product Designer (UX/UI)", company: "Nubank", type: "Híbrido", location: "São Paulo, SP", salary: "Confidencial", tags: ["Figma", "Design Systems"], managed: false },
    { title: "Backend Developer (Node.js)", company: "Stripe", type: "Full-time", location: "Remoto (Global)", salary: "USD 120k/yr", tags: ["Node.js", "Postgres"], managed: true },
    { title: "QA Automation Engineer", company: "Meta", type: "Full-time", location: "Remoto", salary: "R$ 12k - 18k", tags: ["Cypress", "QA"], managed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
      {/* Search Header */}
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Sua próxima grande oportunidade <br />
          <span className="text-primary underline underline-offset-8 decoration-primary/20">começa aqui</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore centenas de vagas em tecnologia nas melhores empresas do mundo. 
          Use nossos filtros de IA para encontrar o match perfeito.
        </p>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3 bg-white p-3 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 mt-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input placeholder="Cargo, tecnologia ou empresa..." className="h-14 pl-12 border-none bg-transparent focus-visible:ring-0 text-lg" />
          </div>
          <div className="flex-1 relative hidden md:block border-l border-slate-100">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input placeholder="Localização ou Remoto" className="h-14 pl-12 border-none bg-transparent focus-visible:ring-0 text-lg" />
          </div>
          <Button className="h-14 px-8 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
            Buscar Vagas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="space-y-8 hidden lg:block">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-between">
              Filtros
              <Filter className="h-4 w-4" />
            </h3>
            <div className="space-y-3">
              {["Remoto", "Híbrido", "Presencial"].map(type => (
                <label key={type} className="flex items-center gap-3 group cursor-pointer">
                  <div className="h-5 w-5 rounded-md border border-slate-200 bg-white group-hover:border-primary/50 transition-all" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Setor</h3>
            <div className="space-y-3">
              {["Tecnologia", "Finanças", "Educação", "Saúde"].map(type => (
                <label key={type} className="flex items-center gap-3 group cursor-pointer">
                  <div className="h-5 w-5 rounded-md border border-slate-200 bg-white" />
                  <span className="text-sm font-medium text-slate-600">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <Card className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h4 className="font-black text-slate-900 leading-tight">Receba alertas de novas vagas</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Te avisamos quando uma vaga perfeita para o seu perfil for publicada.</p>
            <Button variant="outline" className="w-full rounded-xl border-primary/20 text-primary font-bold hover:bg-primary/5 h-10">Ativar Alertas</Button>
          </Card>
        </aside>

        {/* Jobs List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-bold text-slate-900">Mostrando {jobs.length} vagas encontradas</h2>
            <select className="text-sm font-bold bg-transparent outline-none text-slate-500 border-none">
              <option>Mais recentes</option>
              <option>Maior salário</option>
            </select>
          </div>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <Card key={i} className="p-6 border-slate-200 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group overflow-hidden relative">
                {job.managed && (
                  <div className="absolute top-0 right-0 p-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg flex items-center gap-1 font-black text-[10px] uppercase tracking-widest">
                      <Zap className="h-3 w-3 fill-primary" />
                      Curadoria Cevan
                    </Badge>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-xl text-slate-400 group-hover:text-primary transition-colors">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-3">
                    <p className="font-black text-slate-900">{job.salary}</p>
                    <div className="flex gap-2">
                      {job.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-500 rounded-lg text-[10px] border-none font-bold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <ApplyModal jobTitle={job.title} companyName={job.company} isManaged={job.managed} />
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-8 text-center">
            <Button variant="ghost" className="text-primary font-bold rounded-xl h-12 px-8">Carregar mais vagas</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
