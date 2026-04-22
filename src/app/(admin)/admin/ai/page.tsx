"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  BrainCircuit, 
  Settings2, 
  Zap, 
  Save,
  MessageSquareWarning,
  Activity,
  Cpu,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminAIPanel() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Configuração de Engine</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Controle da Inteligência Artificial</h1>
          <p className="text-slate-500 mt-1 font-medium">Ajuste os modelos de linguagem, prompts e limites de consumo em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <Button className="h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest px-8 shadow-xl shadow-blue-200 hover:scale-105 transition-all">
            <Save className="h-4 w-4 mr-2" /> Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 border-none bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex items-center gap-5 group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Cpu className="h-24 w-24" />
          </div>
          <div className="h-16 w-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Cpu className="h-8 w-8" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Modelo Ativo</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">GPT-4o</h3>
          </div>
        </Card>

        <Card className="p-8 border-none bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex items-center gap-5 group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Zap className="h-24 w-24" />
          </div>
          <div className="h-16 w-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Zap className="h-8 w-8" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Requisições (Mês)</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">12.450 <span className="text-sm text-slate-400 font-medium tracking-normal">/ 50k</span></h3>
          </div>
        </Card>

        <Card className="p-8 border-none bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex items-center gap-5 group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Activity className="h-24 w-24" />
          </div>
          <div className="h-16 w-16 rounded-[1.5rem] bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Activity className="h-8 w-8" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Custo Estimado</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">$ 142.50</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Prompts Configuration */}
        <Card className="lg:col-span-2 p-10 border-none bg-white rounded-[3rem] shadow-[0_25px_60px_rgba(0,0,0,0.03)] space-y-10">
          <div className="flex items-center justify-between border-b border-slate-50 pb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Engenharia de Prompts</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">Defina o comportamento neural da IA para as principais automações.</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Settings2 className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Prompt: Gerador de Vagas</Label>
                  <p className="text-[13px] font-bold text-slate-900">Contexto de Sistema (System Message)</p>
                </div>
                <Badge className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-wider">gpt-4o-mini</Badge>
              </div>
              <div className="relative group">
                <Textarea 
                  className="min-h-[160px] bg-slate-50 border-slate-100 rounded-[1.5rem] resize-none font-mono text-[13px] text-slate-700 p-6 leading-relaxed focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all"
                  defaultValue={"Você é um recrutador tech sênior trabalhando para a plataforma Cevan Serviços Empresariais. Quando receber um título de vaga, você deve gerar uma descrição altamente profissional e atrativa, contendo:\n\n1. Resumo inspirador da vaga\n2. Responsabilidades em bullet points\n3. Requisitos técnicos em bullet points\n\nSempre use tom de voz amigável mas corporativo."}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Prompt: Triagem Automática</Label>
                  <p className="text-[13px] font-bold text-slate-900">Regras de Classificação (System Message)</p>
                </div>
                <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-wider">gpt-4o</Badge>
              </div>
              <div className="relative group">
                <Textarea 
                  className="min-h-[160px] bg-slate-50 border-slate-100 rounded-[1.5rem] resize-none font-mono text-[13px] text-slate-700 p-6 leading-relaxed focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all"
                  defaultValue={"Analise o currículo (JSON) do candidato fornecido em relação à vaga em questão. Retorne EXATAMENTE um JSON com as chaves: \n- 'score' (0 a 100)\n- 'fit' (Baixo, Médio, Alto)\n- 'reason' (String com 2 frases explicando o score)."}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* System Limits & Settings */}
        <div className="space-y-8">
          <Card className="p-10 border-none bg-white rounded-[3rem] shadow-[0_25px_60px_rgba(0,0,0,0.03)] space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Parâmetros</h3>
              <MessageSquareWarning className="h-6 w-6 text-amber-500" />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">Tokens por Resposta</Label>
              <Input type="number" defaultValue="800" className="h-14 bg-slate-50 border-slate-100 rounded-[1.2rem] font-bold px-6 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all" />
              <p className="text-[10px] text-slate-400 font-medium px-1 italic">Controla o comprimento máximo das descrições.</p>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">Temperature</Label>
              <Input type="number" step="0.1" defaultValue="0.7" className="h-14 bg-slate-50 border-slate-100 rounded-[1.2rem] font-bold px-6 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all" />
              <div className="flex justify-between px-1 mt-1">
                <span className="text-[9px] font-black uppercase text-slate-400">Conservador</span>
                <span className="text-[9px] font-black uppercase text-blue-600">Criativo</span>
              </div>
            </div>
          </Card>

          <Card className="p-10 border-none bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-[3rem] shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tight">Chave da API</h3>
                <p className="text-xs text-blue-100 font-medium">Segurança e autenticação da Engine</p>
              </div>
              <div className="relative">
                <Input type="password" value="sk-proj-**********************************" readOnly className="h-14 bg-white/10 border-white/20 rounded-[1.2rem] text-white font-mono focus:ring-0 cursor-default" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-[1.2rem] pointer-events-none" />
              </div>
              <Button variant="ghost" className="w-full h-12 bg-white text-blue-700 hover:bg-blue-50 rounded-[1.2rem] font-black uppercase text-[10px] tracking-widest shadow-lg">
                Atualizar Chave
              </Button>
            </div>
            <BrainCircuit className="absolute -bottom-10 -right-10 h-48 w-48 text-white/10 group-hover:scale-110 transition-transform duration-700" />
          </Card>
        </div>
      </div>
    </div>
  );
}
