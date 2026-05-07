"use client";

import { useState, useTransition } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Briefcase,
  MapPin,
  DollarSign,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createJob } from "@/actions/jobs";
import { generateJobContent } from "@/actions/generate-job";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateJobModal({ companies }: { companies?: { id: string; name: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1
  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [contractType, setContractType] = useState("Tempo Integral (CLT)");
  const [level, setLevel] = useState("Sênior");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  // Step 2
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [tips, setTips] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  async function handleGenerateAI() {
    if (!title) return;
    setIsGenerating(true);
    try {
      const res = await generateJobContent(title, level, contractType);
      if (res.success) {
        setDescription(res.data.description);
        setRequirements(res.data.requirements);
        setResponsibilities(res.data.responsibilities);
        setBenefits(res.data.benefits);
        setTips(res.data.tips);
        setSkills(res.data.skills);
        toast.success("Conteúdo gerado com IA!");
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error("Erro ao conectar com a IA. Verifique sua conexão e tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleAddSkill(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  }

  function handlePublish() {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("isRemote", isRemote.toString());
      formData.append("salaryRange", salaryRange);
      formData.append("type", "MANAGED");
      formData.append("requirements", requirements || skills.map((s) => `• ${s}`).join("\n"));
      formData.append("responsibilities", responsibilities);
      formData.append("benefits", benefits);
      formData.append("tips", tips);
      formData.append("contractType", contractType);
      formData.append("experienceLevel", level);
      if (companyId) formData.append("companyId", companyId);

      const result = await createJob({}, formData);
      if (result.success) {
        toast.success("Vaga publicada com sucesso!");
        resetAndClose();
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao criar vaga.");
      }
    });
  }

  function resetAndClose() {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setTitle(""); setCompanyId(""); setLocation(""); setSalaryRange("");
      setIsRemote(false); setLevel("Sênior"); setContractType("Tempo Integral (CLT)");
      setDescription(""); setRequirements(""); setResponsibilities("");
      setBenefits(""); setTips(""); setSkills([]); setNewSkill("");
    }, 300);
  }

  const selectCls =
    "w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetAndClose();
        else setIsOpen(true);
      }}
    >
      <DialogTrigger
        render={
          <Button className="rounded-xl font-bold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Criar Nova Vaga
          </Button>
        }
      />

      <DialogContent className="sm:max-w-4xl w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col h-[90vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white relative flex-shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-white">Nova Oportunidade</DialogTitle>
                <DialogDescription className="text-blue-100/70 font-medium mt-1">
                  Passo {step} de 2 —{" "}
                  {step === 1 ? "Detalhes Básicos" : "Descrição e Requisitos"}
                </DialogDescription>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    step >= i ? "w-6 bg-blue-500" : "w-1.5 bg-white/20"
                  )}
                />
              ))}
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <div className="space-y-2 md:col-span-2">
                <Label className="font-bold text-slate-700">
                  Título da Vaga <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Ex: Senior Frontend Engineer"
                  className="h-14 bg-slate-50 border-slate-200 rounded-xl text-lg font-bold"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>

              {companies && companies.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Empresa Cliente</Label>
                  <select
                    className={selectCls}
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                  >
                    <option value="">Selecione uma empresa...</option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Tipo de Contrato</Label>
                <select className={selectCls} value={contractType} onChange={(e) => setContractType(e.target.value)}>
                  <option>Tempo Integral (CLT)</option>
                  <option>PJ / Contractor</option>
                  <option>Freelancer / Autônomo</option>
                  <option>Meio Período</option>
                  <option>Estágio</option>
                  <option>Temporário</option>
                  <option>Cooperado</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Nível de Experiência</Label>
                <select className={selectCls} value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option>Estagiário / Trainee</option>
                  <option>Assistente / Auxiliar</option>
                  <option>Júnior</option>
                  <option>Pleno</option>
                  <option>Sênior</option>
                  <option>Especialista</option>
                  <option>Liderança / Coordenação</option>
                  <option>Gerência</option>
                  <option>Diretoria / Executivo</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Localização</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Cidade, Estado"
                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl font-medium"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Faixa Salarial (Opcional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Ex: R$ 10k - 15k"
                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl font-medium"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 md:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <input
                  type="checkbox"
                  id="isRemote"
                  className="h-5 w-5 rounded border-slate-300 text-blue-600"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                />
                <Label htmlFor="isRemote" className="font-bold text-slate-700 cursor-pointer">
                  Vaga 100% Remota
                </Label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* AI Generate */}
              <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-violet-900">Preencher com Inteligência Artificial</p>
                  <p className="text-xs text-violet-500 font-medium mt-0.5">
                    Gera descrição, requisitos, responsabilidades, benefícios e dicas automaticamente.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="shrink-0 h-10 px-5 rounded-xl font-black bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 text-xs uppercase tracking-widest"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  {isGenerating ? "Gerando..." : "Gerar com IA"}
                </Button>
              </div>

              {/* Skills tags */}
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Skills Principais</Label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl min-h-[52px] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-blue-500/20">
                  {skills.map((skill, i) => (
                    <Badge
                      key={i}
                      className="bg-white border border-slate-200 text-slate-700 flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold shadow-sm"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer text-slate-400 hover:text-red-500"
                        onClick={() => setSkills(skills.filter((s) => s !== skill))}
                      />
                    </Badge>
                  ))}
                  <Input
                    placeholder="Adicionar skill (Enter)..."
                    className="flex-1 border-none bg-transparent shadow-none h-8 min-w-[180px] focus-visible:ring-0 px-2 font-medium"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">
                  Descrição da Vaga <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="Descreva a oportunidade de forma atraente..."
                  className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl font-medium resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requirements */}
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Requisitos & Qualificações</Label>
                  <Textarea
                    placeholder={"• Node.js avançado\n• PostgreSQL e Redis\n• Experiência com APIs REST"}
                    className="min-h-[130px] bg-slate-50 border-slate-200 rounded-xl font-medium resize-none text-sm"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  />
                </div>

                {/* Responsibilities */}
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Responsabilidades</Label>
                  <Textarea
                    placeholder={"• Desenvolver APIs escaláveis\n• Revisar código do time\n• Participar do planejamento de sprint"}
                    className="min-h-[130px] bg-slate-50 border-slate-200 rounded-xl font-medium resize-none text-sm"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Benefícios</Label>
                  <Textarea
                    placeholder={"• Vale Refeição\n• Plano de Saúde\n• Auxílio Home Office"}
                    className="min-h-[130px] bg-slate-50 border-slate-200 rounded-xl font-medium resize-none text-sm"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                  />
                </div>

                {/* Tips */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-bold text-slate-700">Dicas da Cevan</Label>
                    <span className="text-[10px] font-black text-violet-500 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full uppercase">
                      Curadoria
                    </span>
                  </div>
                  <Textarea
                    placeholder={"• Destaque projetos com alta escala\n• Mencione contribuições open source\n• Prepare exemplos concretos de problemas resolvidos"}
                    className="min-h-[130px] bg-slate-50 border-slate-200 rounded-xl font-medium resize-none text-sm"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 sm:px-8 bg-white border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          {step > 1 ? (
            <Button
              variant="ghost"
              className="rounded-xl font-bold h-12 px-6 text-slate-500 hover:text-slate-900"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="rounded-xl font-bold h-12 px-6 text-slate-500 hover:text-red-500"
              onClick={resetAndClose}
            >
              Cancelar
            </Button>
          )}

          {step < 2 ? (
            <Button
              className="rounded-xl font-black h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white uppercase text-xs tracking-widest ml-auto"
              onClick={() => { if (title) setStep(2); }}
              disabled={!title}
            >
              Próximo Passo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="rounded-xl font-black h-12 px-10 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200 uppercase text-xs tracking-widest ml-auto"
              onClick={handlePublish}
              disabled={isPending || !description}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              {isPending ? "Publicando..." : "Publicar Vaga"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
