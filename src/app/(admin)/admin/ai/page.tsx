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
  Cpu
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminAIPanel() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Controle da Inteligência Artificial</h1>
          <p className="text-slate-500 mt-1">Ajuste os modelos de linguagem, promps e limites de consumo.</p>
        </div>
        <div className="flex gap-3">
          <Button className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 shadow-xl shadow-slate-200">
            <Save className="h-4 w-4 mr-2" /> Salvar Configurações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200 bg-white rounded-[2rem] shadow-sm flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modelo Ativo</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">GPT-4o</h3>
          </div>
        </Card>

        <Card className="p-6 border-slate-200 bg-white rounded-[2rem] shadow-sm flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Requisições (Mês)</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">12.450 <span className="text-sm text-slate-400 font-medium">/ 50k</span></h3>
          </div>
        </Card>

        <Card className="p-6 border-slate-200 bg-white rounded-[2rem] shadow-sm flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Custo Estimado</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">$ 142.50</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Prompts Configuration */}
        <Card className="lg:col-span-2 p-8 border-slate-200 bg-white rounded-[2rem] shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Engenharia de Prompts</h3>
              <p className="text-sm text-slate-500 font-medium">Defina o comportamento base da IA para diferentes ações.</p>
            </div>
            <Settings2 className="h-6 w-6 text-slate-400" />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-bold text-slate-700">Prompt: Gerador de Vagas (System)</Label>
                <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-500">gpt-4o-mini</Badge>
              </div>
              <Textarea 
                className="min-h-[120px] bg-slate-50 border-slate-200 rounded-xl resize-none font-mono text-xs text-slate-700 p-4"
                defaultValue={"Você é um recrutador tech sênior trabalhando para a plataforma CevanRH. Quando receber um título de vaga, você deve gerar uma descrição altamente profissional e atrativa, contendo:\n\n1. Resumo inspirador da vaga\n2. Responsabilidades em bullet points\n3. Requisitos técnicos em bullet points\n\nSempre use tom de voz amigável mas corporativo."}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-bold text-slate-700">Prompt: Triagem Automática (System)</Label>
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600">gpt-4o</Badge>
              </div>
              <Textarea 
                className="min-h-[120px] bg-slate-50 border-slate-200 rounded-xl resize-none font-mono text-xs text-slate-700 p-4"
                defaultValue={"Analise o currículo (JSON) do candidato fornecido em relação à vaga em questão. Retorne EXATAMENTE um JSON com as chaves: \n- 'score' (0 a 100)\n- 'fit' (Baixo, Médio, Alto)\n- 'reason' (String com 2 frases explicando o score)."}
              />
            </div>
          </div>
        </Card>

        {/* System Limits & Settings */}
        <div className="space-y-8">
          <Card className="p-8 border-slate-200 bg-white rounded-[2rem] shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Limites</h3>
              <MessageSquareWarning className="h-5 w-5 text-amber-500" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Max Tokens por Resposta (Vagas)</Label>
              <Input type="number" defaultValue="800" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Temperature (Criatividade)</Label>
              <Input type="number" step="0.1" defaultValue="0.7" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
              <p className="text-[10px] text-slate-500 font-medium">0 = Robótico/Rígido, 1 = Muito criativo</p>
            </div>
          </Card>

          <Card className="p-8 border-indigo-500/20 bg-indigo-500/5 rounded-[2rem] shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">Chave da API (OpenAI)</h3>
              <Input type="password" value="sk-proj-**********************************" readOnly className="h-12 bg-white border-indigo-200 rounded-xl text-indigo-900 font-mono" />
              <Button variant="link" className="px-0 text-indigo-600 font-bold mt-2">Alterar Chave API</Button>
            </div>
            <BrainCircuit className="absolute -bottom-6 -right-6 h-32 w-32 text-indigo-500/10" />
          </Card>
        </div>
      </div>
    </div>
  );
}
