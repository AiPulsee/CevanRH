import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Receipt, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Download
} from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Financeiro e Plano</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas assinaturas, faturas e métodos de pagamento.</p>
        </div>
        <Button className="rounded-xl font-bold h-12 px-6 shadow-lg shadow-primary/20">
          Upgrade de Plano
          <TrendingUp className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan Card */}
        <Card className="lg:col-span-2 p-8 border-border bg-white rounded-[2.5rem] shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <p className="text-xs font-black text-primary uppercase tracking-widest">Plano Atual</p>
                <h3 className="text-4xl font-black">Pro Business</h3>
                <p className="text-muted-foreground">Sua assinatura renova em 12 de Maio, 2026.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground font-bold mb-1">Vagas Usadas</p>
                  <p className="text-2xl font-black">8 <span className="text-sm font-medium text-muted-foreground">/ 10</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground font-bold mb-1">Candidatos/Mês</p>
                  <p className="text-2xl font-black">Ilimitado</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Consumo de Vagas</span>
                  <span className="text-primary">80%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" style={{ width: "80%" }} />
                </div>
              </div>
            </div>

            <div className="w-full md:w-72 space-y-4 p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <h4 className="font-bold text-sm">O que está incluso no Pro:</h4>
              <ul className="space-y-3">
                {[
                  "Suporte prioritário 24/7",
                  "Filtros de IA avançados",
                  "Multiusuários (Time até 5)",
                  "Custom Branding no Job Board",
                ].map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-xl border-primary/20 text-primary font-bold hover:bg-primary/5 mt-4">
                Gerenciar Recursos
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment Method Card */}
        <Card className="p-8 border-border bg-white rounded-[2.5rem] shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Pagamento</h3>
            </div>
            
            <div className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative group cursor-pointer overflow-hidden">
              <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
              <p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-tighter">Cartão Principal</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-10 bg-white border border-border rounded flex items-center justify-center font-bold text-[8px] italic">VISA</div>
                <span className="font-black text-lg">•••• 4242</span>
              </div>
              <Badge variant="outline" className="rounded-lg border-primary/20 text-primary bg-white text-[10px] font-black">EXP 12/28</Badge>
            </div>
          </div>

          <Button variant="ghost" className="w-full rounded-xl font-bold text-primary hover:bg-primary/5 h-12">
            Alterar Método
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>

        {/* Invoice Table */}
        <Card className="lg:col-span-3 p-8 border-border bg-white rounded-[2.5rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Histórico de Faturas</h3>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-border bg-white font-bold h-10 px-4">Filtrar Ano</Button>
          </div>

          <div className="space-y-2">
            {[
              { id: "#INV-2026-001", date: "12 Abr, 2026", amount: "R$ 499,00", status: "Pago" },
              { id: "#INV-2026-002", date: "12 Mar, 2026", amount: "R$ 499,00", status: "Pago" },
              { id: "#INV-2026-003", date: "12 Fev, 2026", amount: "R$ 499,00", status: "Pago" },
            ].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-all border border-transparent hover:border-border">
                <div className="flex items-center gap-8">
                  <span className="font-bold text-sm w-32">{invoice.id}</span>
                  <span className="text-sm text-muted-foreground w-32">{invoice.date}</span>
                  <span className="font-black text-sm w-24">{invoice.amount}</span>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-lg">{invoice.status}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 border border-border bg-white shadow-sm hover:text-primary">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
