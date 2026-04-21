"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  GraduationCap, 
  Briefcase,
  ExternalLink
} from "lucide-react";

export default function ResumePage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Meu Currículo</h1>
          <p className="text-muted-foreground mt-1">Mantenha seus dados atualizados para atrair as melhores empresas.</p>
        </div>
        <Button className="rounded-xl font-bold h-12 px-6 shadow-lg shadow-primary/20">
          Visualizar Público
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* PDF Upload Section */}
      <Card className="p-8 border-dashed border-2 border-border bg-white rounded-[2rem] text-center space-y-4 hover:border-primary/50 transition-all cursor-pointer group">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Upload className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Atualizar Currículo em PDF</h3>
          <p className="text-sm text-muted-foreground">Arraste seu arquivo aqui ou clique para selecionar.</p>
        </div>
        <div className="pt-2">
          <Badge variant="secondary" className="rounded-lg bg-secondary text-muted-foreground px-4 py-1">curriculo_danilo_2026.pdf</Badge>
        </div>
      </Card>

      {/* Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Experiência Profissional
          </h2>
          <Button variant="ghost" size="sm" className="text-primary font-bold">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-4">
          {[
            { company: "Google", role: "Senior Frontend Developer", period: "2022 - Presente", desc: "Liderança técnica de projetos em larga escala utilizando Next.js e TypeScript." },
            { company: "Meta", role: "Software Engineer", period: "2019 - 2022", desc: "Desenvolvimento de interfaces performáticas para o Facebook Ads Manager." },
          ].map((exp, i) => (
            <Card key={i} className="p-6 border-border bg-white rounded-3xl shadow-sm group relative">
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg">{exp.role}</h4>
                  <p className="text-sm text-primary font-bold">{exp.company}</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{exp.period}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Formação Acadêmica
          </h2>
          <Button variant="ghost" size="sm" className="text-primary font-bold">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <Card className="p-6 border-border bg-white rounded-3xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">Ciência da Computação</h4>
              <p className="text-sm text-primary font-bold">Universidade de São Paulo (USP)</p>
            </div>
            <span className="text-xs text-muted-foreground font-medium">2014 - 2018</span>
          </div>
        </Card>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-2">Habilidades Técnicas</h2>
        <Card className="p-8 border-border bg-white rounded-[2rem] shadow-sm">
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Prisma", "PostgreSQL", "AWS", "Docker", "Figma"].map(skill => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-all cursor-pointer border-border font-bold">
                {skill}
              </Badge>
            ))}
            <Button variant="outline" className="rounded-xl h-10 border-dashed border-border text-muted-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Sugerir Skill
            </Button>
          </div>
        </Card>
      </div>

      <div className="pt-8 flex justify-end">
        <Button className="h-14 rounded-2xl px-10 font-black text-lg shadow-xl shadow-primary/20">
          Salvar Currículo
        </Button>
      </div>
    </div>
  );
}

function Badge({ children, className, variant = "default" }: any) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  )
}
