import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Eye, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  Zap
} from "lucide-react";
import { CreateJobModal } from "@/components/dashboard/create-job-modal";

export default function DashboardPage() {
  const stats = [
    { name: "Candidatos Totais", value: "1,284", icon: Users, change: "+12%", trend: "up" },
    { name: "Vagas Ativas", value: "24", icon: Briefcase, change: "+2", trend: "up" },
    { name: "Visualizações", value: "48.2k", icon: Eye, change: "+18%", trend: "up" },
    { name: "Taxa de Conversão", value: "14.2%", icon: TrendingUp, change: "+2.4%", trend: "up" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Bem-vindo de volta, Danilo</h2>
          <p className="text-muted-foreground mt-1">Aqui está o que está acontecendo com suas vagas hoje.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-border bg-white shadow-sm">
            Exportar Dados
          </Button>
          <CreateJobModal />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-border rounded-3xl hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-all">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 rounded-lg text-[10px] px-2">
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-muted-foreground">{stat.name}</p>
              <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applicants */}
        <Card className="lg:col-span-2 p-6 bg-white border-border rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Candidatos Recentes</h3>
            <Button variant="ghost" size="sm" className="text-primary font-bold">Ver Todos</Button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Alexandre Silva", role: "Senior Frontend Engineer", status: "Em Revisão", time: "2h atrás" },
              { name: "Beatriz Oliveira", role: "Product Designer", status: "Entrevista", time: "5h atrás" },
              { name: "Carlos Mendes", role: "Backend Developer (Node.js)", status: "Novo", time: "1d atrás" },
              { name: "Daniela Costa", role: "QA Engineer", status: "Recusado", time: "2d atrás" },
            ].map((applicant, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary transition-all group cursor-pointer border border-transparent hover:border-border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {applicant.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{applicant.name}</p>
                    <p className="text-xs text-muted-foreground">{applicant.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{applicant.status}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end">
                    <Clock className="h-3 w-3 mr-1" /> {applicant.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Managed Progress */}
        <Card className="p-6 bg-gradient-to-br from-primary to-indigo-700 border-none rounded-[2rem] relative overflow-hidden shadow-xl shadow-primary/20 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/80 font-black text-xs uppercase tracking-widest mb-4">
              <Zap className="h-4 w-4 fill-white" />
              Managed Active
            </div>
            <h3 className="text-2xl font-black mb-2 leading-tight text-white">Suas vagas sob nossa curadoria</h3>
            <p className="text-sm text-white/80 mb-6 font-medium">Nosso time já triou 45 candidatos para sua vaga de CTO. 3 estão na Shortlist final.</p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white">Vaga: CTO</span>
                  <span className="text-xs text-white font-black">80%</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
              <Button className="w-full h-12 rounded-2xl font-bold bg-white text-primary hover:bg-white/90 shadow-xl">
                Acessar Shortlist
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[60px]" />
        </Card>
      </div>
    </div>
  );
}
