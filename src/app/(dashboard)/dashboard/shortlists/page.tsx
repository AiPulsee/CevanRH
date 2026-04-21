import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, MessageSquare, Download, ExternalLink, UserCheck } from "lucide-react";

export default function ShortlistsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-2">
            <Zap className="h-4 w-4 fill-primary" />
            Curadoria Ativa
          </div>
          <h1 className="text-3xl font-black tracking-tight">Candidatos Recomendados</h1>
          <p className="text-muted-foreground mt-1">Nossos especialistas já fizeram a triagem. Aqui estão os melhores talentos para suas vagas.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-border bg-white font-bold shadow-sm">
          Falar com Consultor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Vaga CTO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold">Vaga: <span className="text-primary underline underline-offset-4 decoration-primary/30">Chief Technology Officer (CTO)</span></h2>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-lg">3 Candidatos na Lista</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Carlos Magno", exp: "15 anos", match: "98%", tags: ["Ex-Google", "Python", "Cloud"], avatar: "CM" },
              { name: "Ana Beatriz", exp: "12 anos", match: "95%", tags: ["Scalability", "Fintech", "Teams"], avatar: "AB" },
              { name: "Pedro Holanda", exp: "18 anos", match: "92%", tags: ["Security", "CTO", "IPO Experience"], avatar: "PH" },
            ].map((candidate, i) => (
              <Card key={i} className="relative overflow-hidden p-6 border-border bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                <div className="absolute top-0 right-0 p-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-secondary border border-border flex items-center justify-center font-black text-primary text-xl shadow-inner">
                    {candidate.avatar}
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{candidate.name}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{candidate.exp} de experiência</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="rounded-lg bg-secondary/50 text-muted-foreground border-border text-[10px] font-bold">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Grau de Afinidade</span>
                      <span className="text-xs font-black text-primary">{candidate.match}</span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: candidate.match }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" className="rounded-xl border-border bg-white text-xs font-bold h-10">
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Currículo
                    </Button>
                    <Button className="rounded-xl font-bold text-xs h-10 shadow-md shadow-primary/20">
                      <UserCheck className="h-3.5 w-3.5 mr-2" />
                      Aprovar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-8 rounded-[2.5rem] bg-secondary/50 border border-border flex flex-col md:flex-row items-center gap-8">
          <div className="h-16 w-16 rounded-3xl bg-white shadow-sm flex items-center justify-center text-primary border border-border">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-black mb-1">Precisa de mais opções?</h3>
            <p className="text-muted-foreground text-sm">Se nenhum destes candidatos for o ideal, fale agora com seu consultor dedicado para refinarmos a busca.</p>
          </div>
          <Button size="lg" className="rounded-2xl font-bold px-8 h-14">
            Abrir Chat de Suporte
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
