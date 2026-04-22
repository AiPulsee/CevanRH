"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Zap,
  Info,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Type,
  Bold,
  Italic,
  List
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CreateJobModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState(["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAIGenerate = () => {
    if (!title) return;
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(`**Resumo da Vaga:**\nProcuramos um ${title} talentoso para integrar nossa equipe. Você será responsável por construir o futuro do nosso produto, focando em escalabilidade e experiência do usuário.\n\n**Responsabilidades:**\n- Desenvolver soluções escaláveis.\n- Colaborar com a equipe de design e produto.\n- Escrever código limpo e testável.\n\n**Requisitos:**\n- 5+ anos de experiência na área.\n- Domínio de tecnologias web modernas.\n- Inglês avançado.\n\n**Benefícios:**\n- Plano de saúde e odontológico.\n- Vale-refeição e Gympass.\n- Trabalho 100% remoto.`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if(!open) resetAndClose();
      else setIsOpen(true);
    }}>
      <DialogTrigger 
        nativeButton={true}
        render={
          <Button className="rounded-xl font-bold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white" />
        }
      >
        <Plus className="h-4 w-4 mr-2" />
        Criar Nova Vaga
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col h-[85vh] sm:h-auto sm:max-h-[90vh]">
        
        {/* Header - Fixed */}
        <div className="bg-slate-900 p-8 text-white relative flex-shrink-0">
          <div className="absolute inset-0 bg-[url('/login-bg.png')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center backdrop-blur-md shadow-lg">
                  <Briefcase className="h-7 w-7 text-blue-400" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-black tracking-tight text-white">Nova Oportunidade</DialogTitle>
                  <DialogDescription className="text-blue-100/70 font-medium mt-1">
                    Passo {step} de 3 — {step === 1 ? 'Detalhes Básicos' : step === 2 ? 'Descrição e Requisitos' : 'Configurações Finais'}
                  </DialogDescription>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8 flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ease-out ${step >= i ? 'bg-blue-500' : 'bg-transparent'}`} />
                </div>
              ))}
            </div>
          </DialogHeader>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title" className="font-bold text-slate-700">Título da Vaga <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="Ex: Senior Frontend Engineer" 
                  className="h-14 bg-slate-50 border-slate-200 rounded-xl text-lg font-bold"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="font-bold text-slate-700">Tipo de Contrato</Label>
                <select id="type" className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none">
                  <option>Tempo Integral (CLT)</option>
                  <option>PJ / Contractor</option>
                  <option>Meio Período</option>
                  <option>Estágio</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="font-bold text-slate-700">Nível de Experiência</Label>
                <select id="level" className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none">
                  <option>Júnior</option>
                  <option>Pleno</option>
                  <option selected>Sênior</option>
                  <option>Especialista</option>
                  <option>Liderança</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="font-bold text-slate-700">Localização</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input id="location" placeholder="Remoto ou Cidade" className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="font-bold text-slate-700">Faixa Salarial (Opcional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input id="salary" placeholder="Ex: R$ 10k - 15k" className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl font-medium" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Skills Tags */}
              <div className="space-y-3">
                <Label className="font-bold text-slate-700">Habilidades Exigidas (Skills)</Label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl min-h-[60px] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  {skills.map((skill, i) => (
                    <Badge key={i} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 px-3 py-1.5 shadow-sm text-sm font-bold">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                  <Input 
                    placeholder="Digite uma skill e aperte Enter..." 
                    className="flex-1 border-none bg-transparent shadow-none h-8 min-w-[200px] focus-visible:ring-0 px-2 font-medium"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
              </div>

              {/* Job Description with AI */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Label htmlFor="description" className="font-bold text-slate-700">Descrição Completa</Label>
                  <Button 
                    type="button"
                    onClick={handleAIGenerate}
                    disabled={!title || isGenerating}
                    className="h-9 px-4 rounded-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                  >
                    {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                    {isGenerating ? "Gerando mágica..." : "Gerar com Inteligência Artificial"}
                  </Button>
                </div>
                
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  {/* Mock Toolbar */}
                  <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500"><Type className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500"><Bold className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500"><Italic className="h-4 w-4" /></Button>
                    <div className="w-px h-4 bg-slate-300 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500"><List className="h-4 w-4" /></Button>
                  </div>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva as responsabilidades, nossa inteligência artificial pode ajudar a preencher isso em segundos baseada no título da vaga..." 
                    className="min-h-[250px] border-none focus-visible:ring-0 rounded-none resize-none font-medium text-slate-700 leading-relaxed p-4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center sm:text-left">
              
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 text-left">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Selecione o Modelo de Recrutamento</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border-2 border-blue-600 bg-blue-50 cursor-pointer relative overflow-hidden group shadow-md shadow-blue-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-black text-blue-700 uppercase tracking-tighter">Curadoria Cevan</p>
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-blue-800/80 leading-relaxed font-medium">Nossa equipe de especialistas e IA farão a triagem. Você só entrevista os melhores.</p>
                    <Zap className="absolute -right-4 -bottom-4 h-16 w-16 text-blue-200 fill-blue-200" />
                  </div>
                  
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:border-slate-300 transition-all opacity-70 hover:opacity-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-black text-slate-600 uppercase tracking-tighter">Self-Service</p>
                      <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Os candidatos cairão no Kanban e você será responsável por todo o processo de triagem.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-4 text-left">
                <Info className="h-6 w-6 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm mb-1">Aviso sobre créditos</h4>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    Ao escolher o modelo <span className="font-bold uppercase">Curadoria Cevan</span>, 1 crédito de curadoria será descontado do seu plano <span className="font-bold">Pro</span> após a aprovação da vaga por nossa equipe interna.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer - Fixed */}
        <div className="p-6 sm:px-8 sm:py-6 bg-white border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          {step > 1 ? (
            <Button variant="ghost" className="rounded-xl font-bold h-12 px-6 text-slate-500 hover:text-slate-900" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
            </Button>
          ) : (
            <Button variant="ghost" className="rounded-xl font-bold h-12 px-6 text-slate-500 hover:text-red-500" onClick={resetAndClose}>
              Cancelar
            </Button>
          )}

          {step < 3 ? (
            <Button 
              className="rounded-xl font-black h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 uppercase text-xs tracking-widest ml-auto"
              onClick={() => { if(title) setStep(step + 1) }}
              disabled={!title && step === 1}
            >
              Próximo Passo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              className="rounded-xl font-black h-12 px-10 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200 uppercase text-xs tracking-widest ml-auto"
              onClick={resetAndClose}
            >
              Publicar Vaga <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
