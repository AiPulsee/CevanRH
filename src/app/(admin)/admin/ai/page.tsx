"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1 text-blue-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Motor de Inteligência</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Inteligência Artificial</h1>
          <p className="text-sm text-slate-500 font-medium">Ajuste modelos, prompts e limites da Cevan Engine.</p>
        </div>
        <div className="flex gap-2">
          <Button className="h-10 rounded-lg bg-slate-900 text-white font-bold text-xs px-6">
            <Save className="h-3.5 w-3.5 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm flex items-center gap-4 group">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modelo Ativo</p>
            <h3 className="text-xl font-black text-slate-900">GPT-4o</h3>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm flex items-center gap-4 group">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requisições / Mês</p>
            <h3 className="text-xl font-black text-slate-900">12.4k <span className="text-xs text-slate-400 font-medium tracking-normal">/ 50k</span></h3>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm flex items-center gap-4 group">
          <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Custo Estimado</p>
            <h3 className="text-xl font-black text-slate-900">$ 142.50</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Configuração de Prompts */}
        <Card className="lg:col-span-2 p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Prompts do Sistema</h3>
              <p className="text-[11px] text-slate-500 font-medium">Defina o comportamento neural da IA.</p>
            </div>
            <Settings2 className="h-5 w-5 text-slate-300" />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Gerador de Vagas</Label>
                <Badge className="bg-slate-100 text-slate-500 border-none px-2 py-0.5 text-[9px] font-bold">gpt-4o-mini</Badge>
              </div>
              <Textarea 
                className="min-h-[120px] bg-slate-50 border-slate-100 rounded-xl resize-none font-mono text-xs text-slate-700 p-4 leading-relaxed focus:bg-white transition-all"
                defaultValue={"Você é um recrutador tech sênior trabalhando para a plataforma Cevan. Quando receber um título de vaga, você deve gerar uma descrição altamente profissional e atrativa."}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Triagem Automática</Label>
                <Badge className="bg-slate-100 text-slate-500 border-none px-2 py-0.5 text-[9px] font-bold">gpt-4o</Badge>
              </div>
              <Textarea 
                className="min-h-[120px] bg-slate-50 border-slate-100 rounded-xl resize-none font-mono text-xs text-slate-700 p-4 leading-relaxed focus:bg-white transition-all"
                defaultValue={"Analise o currículo (JSON) do candidato fornecido em relação à vaga em questão. Retorne EXATAMENTE um JSON com as chaves score e fit."}
              />
            </div>
          </div>
        </Card>

        {/* Parâmetros do Modelo */}
        <div className="space-y-6">
          <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Parâmetros</h3>
              <MessageSquareWarning className="h-5 w-5 text-amber-500" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Máximo de Tokens</Label>
              <Input type="number" defaultValue="800" className="h-10 bg-slate-50 border-slate-100 rounded-lg font-bold px-4 text-sm" />
            </div>

            <div className="space-y-1.5 pt-2">
              <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Temperatura</Label>
              <Input type="number" step="0.1" defaultValue="0.7" className="h-10 bg-slate-50 border-slate-100 rounded-lg font-bold px-4 text-sm" />
              <div className="flex justify-between px-1 mt-1 text-[8px] font-bold uppercase text-slate-400 tracking-widest">
                <span>Preciso</span>
                <span className="text-blue-600">Criativo</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none bg-blue-600 text-white rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="text-sm font-bold">Chave API (OpenAI)</h3>
                <p className="text-[10px] text-blue-100">Autenticação da Cevan Engine</p>
              </div>
              <div className="relative">
                <Input type="password" value="sk-proj-****************" readOnly className="h-10 bg-white/10 border-white/20 rounded-lg text-white font-mono text-xs cursor-default" />
              </div>
              <Button variant="ghost" className="w-full h-9 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-black uppercase text-[10px] tracking-widest">
                Atualizar Chave
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

