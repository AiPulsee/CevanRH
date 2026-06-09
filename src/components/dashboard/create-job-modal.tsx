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
  Percent,
  Clock,
  Receipt,
  FileText,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createJob } from "@/actions/jobs";
import { generateJobContent } from "@/actions/generate-job";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STEPS = [
  { number: 1, label: "Básico", icon: Briefcase },
  { number: 2, label: "Conteúdo", icon: FileText },
  { number: 3, label: "Comercial", icon: Settings2 },
];

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
  const [openings, setOpenings] = useState(1);

  // Step 2
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [tips, setTips] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Step 3
  const [feeType, setFeeType] = useState<"percentage" | "fixed">("percentage");
  const [feeValue, setFeeValue] = useState("");
  const [trialDays, setTrialDays] = useState("90");

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
      toast.error("Erro ao conectar com a IA.");
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
      formData.append("openings", openings.toString());
      if (companyId) formData.append("companyId", companyId);
      formData.append("feeType", feeType);
      formData.append(feeType === "percentage" ? "feePercentage" : "feeFixed", feeValue);
      if (trialDays && trialDays !== "90") formData.append("trialDays", trialDays);

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
      setOpenings(1);
      setDescription(""); setRequirements(""); setResponsibilities("");
      setBenefits(""); setTips(""); setSkills([]); setNewSkill("");
      setFeeType("percentage"); setFeeValue(""); setTrialDays("90");
    }, 300);
  }

  const canNext1 = !!title && !!location;
  const canNext2 = !!description;
  const canPublish = !!feeValue && parseFloat(feeValue) > 0;

  const selectCls =
    "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetAndClose(); else setIsOpen(true); }}>
      <DialogTrigger
        render={
          <Button className="rounded-xl font-bold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Criar Nova Vaga
          </Button>
        }
      />

      <DialogContent className="sm:max-w-3xl w-[calc(100%-1rem)] sm:w-[95vw] bg-[#F8FAFC] rounded-3xl sm:rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col h-[95vh] sm:h-[88vh]">

        {/* Header */}
        <div className="bg-slate-900 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 text-white flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <DialogHeader className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <DialogTitle className="text-lg sm:text-xl font-black text-white leading-tight">
                    Nova Oportunidade
                  </DialogTitle>
                  <DialogDescription className="text-slate-400 font-medium mt-0.5 text-xs">
                    {step === 1 && "Defina os detalhes básicos da vaga"}
                    {step === 2 && "Descreva a oportunidade e os requisitos"}
                    {step === 3 && "Configure taxa e período de experiência"}
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Step indicators */}
          <div className="mt-5 flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s.number} className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (s.number < step) setStep(s.number);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all",
                    step === s.number
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : step > s.number
                      ? "bg-white/10 text-slate-300 hover:bg-white/15 cursor-pointer"
                      : "bg-white/5 text-slate-600 cursor-default"
                  )}
                >
                  <s.icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.number}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={cn("h-px w-4 sm:w-8 transition-all", step > s.number ? "bg-blue-500/50" : "bg-white/10")} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* Step 1 — Básico */}
          {step === 1 && (
            <div className="p-5 sm:p-8 space-y-5 animate-in fade-in duration-200">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">
                  Título da Vaga <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Ex: Analista de RH Sênior"
                  className="h-12 bg-white border-slate-200 rounded-xl text-base font-bold shadow-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companies && companies.length > 0 && (
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Empresa Cliente</Label>
                    <select className={selectCls} value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
                      <option value="">Selecione uma empresa...</option>
                      {companies.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
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
                  <Label className="font-bold text-slate-700">
                    Localização <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Cidade, Estado"
                      className="h-12 pl-10 bg-white border-slate-200 rounded-xl shadow-sm"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Faixa Salarial</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Ex: R$ 5k – 8k"
                      className="h-12 pl-10 bg-white border-slate-200 rounded-xl shadow-sm"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Nº de Vagas</Label>
                  <Input
                    type="number"
                    min={1}
                    className="h-12 bg-white border-slate-200 rounded-xl font-bold shadow-sm"
                    value={openings}
                    onChange={(e) => setOpenings(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-blue-200 transition-colors shadow-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                />
                <div>
                  <p className="font-bold text-slate-700 text-sm">Vaga 100% Remota</p>
                  <p className="text-[11px] text-slate-400 font-medium">Candidatos de qualquer localidade podem se candidatar</p>
                </div>
              </label>
            </div>
          )}

          {/* Step 2 — Conteúdo */}
          {step === 2 && (
            <div className="p-5 sm:p-8 space-y-5 animate-in fade-in duration-200">
              {/* AI */}
              <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-violet-900">Preencher com Inteligência Artificial</p>
                  <p className="text-xs text-violet-500 font-medium mt-0.5">
                    Gera todos os campos automaticamente com base no título e nível da vaga.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="shrink-0 h-10 px-5 rounded-xl font-black bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200/60 text-xs uppercase tracking-widest"
                >
                  {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  {isGenerating ? "Gerando..." : "Gerar com IA"}
                </Button>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Skills Principais</Label>
                <div className="p-3 bg-white border border-slate-200 rounded-xl min-h-[48px] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-blue-500/20 shadow-sm">
                  {skills.map((skill, i) => (
                    <Badge key={i} className="bg-blue-50 border border-blue-100 text-blue-700 flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => setSkills(skills.filter((s) => s !== skill))} />
                    </Badge>
                  ))}
                  <Input
                    placeholder="Adicionar skill (Enter)..."
                    className="flex-1 border-none bg-transparent shadow-none h-7 min-w-[160px] focus-visible:ring-0 px-1 text-sm font-medium"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">
                  Descrição da Vaga <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="Descreva a oportunidade de forma atraente..."
                  className="min-h-[90px] bg-white border-slate-200 rounded-xl font-medium resize-none shadow-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Requisitos</Label>
                  <Textarea
                    placeholder={"• Experiência em...\n• Conhecimento de..."}
                    className="min-h-[110px] bg-white border-slate-200 rounded-xl font-medium resize-none text-sm shadow-sm"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Responsabilidades</Label>
                  <Textarea
                    placeholder={"• Gerenciar...\n• Coordenar..."}
                    className="min-h-[110px] bg-white border-slate-200 rounded-xl font-medium resize-none text-sm shadow-sm"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Benefícios</Label>
                  <Textarea
                    placeholder={"• Vale Refeição\n• Plano de Saúde"}
                    className="min-h-[110px] bg-white border-slate-200 rounded-xl font-medium resize-none text-sm shadow-sm"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-bold text-slate-700">Dicas da Cevan</Label>
                    <span className="text-[9px] font-black text-violet-500 bg-violet-50 border border-violet-100 px-1.5 py-0.5 rounded-full uppercase">Curadoria</span>
                  </div>
                  <Textarea
                    placeholder={"• Destaque projetos...\n• Mencione contribuições..."}
                    className="min-h-[110px] bg-white border-slate-200 rounded-xl font-medium resize-none text-sm shadow-sm"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Comercial */}
          {step === 3 && (
            <div className="p-5 sm:p-8 space-y-6 animate-in fade-in duration-200">
              {/* Summary card */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-slate-900 truncate">{title || "—"}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    {[companies?.find(c => c.id === companyId)?.name, location].filter(Boolean).join(" · ") || "Sem empresa/localização"}
                  </p>
                </div>
              </div>

              {/* Taxa */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Taxa de Curadoria</p>
                    <p className="text-[11px] text-slate-400 font-medium">Valor cobrado da empresa na efetivação</p>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setFeeType("percentage")}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                        feeType === "percentage" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <Percent className="h-3.5 w-3.5" />
                      Percentual do salário
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeeType("fixed")}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                        feeType === "fixed" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <DollarSign className="h-3.5 w-3.5" />
                      Valor fixo (R$)
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">
                      {feeType === "percentage" ? "%" : "R$"}
                    </div>
                    <Input
                      type="number"
                      min={0}
                      placeholder={feeType === "percentage" ? "50" : "2500"}
                      className="h-14 pl-10 bg-slate-50 border-slate-200 rounded-xl font-black text-xl"
                      value={feeValue}
                      onChange={(e) => setFeeValue(e.target.value)}
                    />
                  </div>

                  {feeType === "percentage" && feeValue && (
                    <p className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-2 rounded-lg">
                      Para um salário de R$ 5.000, a taxa seria de{" "}
                      <strong className="text-slate-700">
                        R$ {((parseFloat(feeValue) / 100) * 5000).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Período */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Período de Experiência</p>
                    <p className="text-[11px] text-slate-400 font-medium">Duração antes da efetivação do candidato</p>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        min={1}
                        max={365}
                        className="h-14 bg-slate-50 border-slate-200 rounded-xl font-black text-xl pr-16"
                        value={trialDays}
                        onChange={(e) => setTrialDays(e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">dias</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {[30, 45, 90].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setTrialDays(String(d))}
                          className={cn(
                            "h-14 px-4 rounded-xl text-sm font-black transition-all border",
                            trialDays === String(d)
                              ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600"
                          )}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          {step > 1 ? (
            <Button
              variant="ghost"
              className="rounded-xl font-bold h-11 px-5 text-slate-500 hover:text-slate-900"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="rounded-xl font-bold h-11 px-5 text-slate-400 hover:text-red-500"
              onClick={resetAndClose}
            >
              Cancelar
            </Button>
          )}

          <div className="flex items-center gap-1.5">
            {STEPS.map((s) => (
              <div
                key={s.number}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  step === s.number ? "w-6 bg-blue-600" : step > s.number ? "w-3 bg-blue-300" : "w-3 bg-slate-200"
                )}
              />
            ))}
          </div>

          {step < 3 ? (
            <Button
              className="rounded-xl font-black h-11 px-6 bg-slate-900 hover:bg-slate-800 text-white uppercase text-xs tracking-widest"
              onClick={() => { if (step === 1 && canNext1) setStep(2); else if (step === 2 && canNext2) setStep(3); }}
              disabled={step === 1 ? !canNext1 : !canNext2}
            >
              Próximo <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="rounded-xl font-black h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 uppercase text-xs tracking-widest"
              onClick={handlePublish}
              disabled={isPending || !canPublish}
            >
              {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
              {isPending ? "Publicando..." : "Publicar Vaga"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
