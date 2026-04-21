import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Eye
} from "lucide-react";
import { ApplicationDetailsModal } from "@/components/candidate/application-details-modal";

export default function CandidatePage() {
  const applications = [
    { 
      company: "Google Cloud", 
      role: "Senior Frontend Engineer", 
      status: "Em Triagem", 
      date: "2 dias atrás",
      location: "Remoto / SP",
      salary: "R$ 15k - 22k",
      color: "bg-blue-500"
    },
    { 
      company: "Nubank", 
      role: "React Specialist", 
      status: "Visualizado", 
      date: "1 semana atrás",
      location: "Híbrido (BH)",
      salary: "Confidencial",
      color: "bg-purple-500"
    },
    { 
      company: "Stripe", 
      role: "Full Stack Developer", 
      status: "Entrevista", 
      date: "3 dias atrás",
      location: "Remoto (Global)",
      salary: "USD 120k/yr",
      color: "bg-indigo-500"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Minhas Candidaturas</h1>
        <p className="text-muted-foreground mt-1">Acompanhe o progresso de suas aplicações em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border bg-white rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Aplicadas</p>
          <h3 className="text-3xl font-black mt-1">12</h3>
        </Card>
        <Card className="p-6 border-border bg-white rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Em Processo</p>
          <h3 className="text-3xl font-black mt-1 text-primary">3</h3>
        </Card>
        <Card className="p-6 border-border bg-white rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Convites</p>
          <h3 className="text-3xl font-black mt-1 text-green-500">1</h3>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 px-2">
          <Clock className="h-5 w-5 text-primary" />
          Atividades Recentes
        </h3>
        
        {applications.map((app, i) => (
          <Card key={i} className="p-6 border-border bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${app.color}`} />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-secondary border border-border flex items-center justify-center font-black text-xl text-primary shadow-inner">
                  {app.company.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{app.role}</h4>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {app.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {app.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-black text-foreground uppercase tracking-widest">{app.salary}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Sugerido p/ Perfil</p>
                </div>
                
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <Badge className={cn(
                    "rounded-lg px-3 py-1 font-bold text-[10px] uppercase",
                    app.status === "Entrevista" ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" :
                    app.status === "Visualizado" ? "bg-green-500/10 text-green-600 border-green-500/20" :
                    "bg-primary/10 text-primary border-primary/20"
                  )}>
                    {app.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Aplicado {app.date}
                  </span>
                </div>

                <ApplicationDetailsModal 
                  jobTitle={app.role} 
                  companyName={app.company} 
                  status={app.status} 
                  color={app.color} 
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tip Box */}
      <div className="p-6 rounded-[2rem] bg-indigo-500 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/20">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold">Dica: Melhore seu Perfil</h4>
            <p className="text-xs text-white/80">Candidatos com perfil completo têm 3x mais chances de serem selecionados para triagem.</p>
          </div>
        </div>
        <Button className="bg-white text-indigo-600 hover:bg-white/90 font-black rounded-xl h-12 px-8 shadow-xl">
          Completar Perfil
        </Button>
      </div>
    </div>
  );
}
