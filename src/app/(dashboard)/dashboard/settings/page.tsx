

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  User, 
  Shield, 
  Bell, 
  Globe,
  Upload,
  Image as ImageIcon,
  Heart,
  Plus,
  LayoutTemplate,
  Users,
  Mail,
  Settings,
  Lock
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  const tabs = [
    { id: "perfil", name: "Perfil da Empresa", icon: Building },
    { id: "equipe", name: "Gestão de Equipe", icon: Users },
    { id: "carreiras", name: "Portal de Carreiras", icon: LayoutTemplate },
    { id: "conta", name: "Minha Conta", icon: User },
    { id: "seguranca", name: "Segurança", icon: Shield },
    { id: "notificacoes", name: "Notificações", icon: Bell },
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Configurações</h1>
        <p className="text-slate-500 mt-1 font-medium">Gerencie seu perfil, empresa e preferências da conta.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Tabs (Vertical) */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((item) => (
            <Button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl font-bold transition-all ${activeTab === item.id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "perfil" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="h-24 w-24 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <Upload className="h-6 w-6 mb-1 group-hover:text-blue-600" />
                  <span className="text-[10px] font-bold uppercase">Logo</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Logo da Empresa</h3>
                  <p className="text-xs text-slate-500 font-medium">PNG ou JPG até 2MB. Recomendado 512x512px.</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="rounded-lg h-8 text-[10px] font-black uppercase text-slate-600">Remover</Button>
                    <Button size="sm" className="rounded-lg h-8 text-[10px] font-black uppercase bg-slate-900 hover:bg-slate-800 text-white">Alterar</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="font-bold text-slate-700">Nome da Empresa</Label>
                  <Input id="companyName" defaultValue="Google Cloud BR" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="font-bold text-slate-700">Website Oficial</Label>
                  <Input id="website" defaultValue="https://google.com" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description" className="font-bold text-slate-700">Sobre a Empresa</Label>
                  <Textarea 
                    id="description" 
                    className="bg-slate-50 border-slate-200 rounded-xl min-h-[120px] resize-none font-medium text-slate-900"
                    defaultValue="O Google Cloud acelera a capacidade das organizações em transformar digitalmente seus negócios..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-bold text-slate-700">Sede Principal</Label>
                  <Input id="location" defaultValue="São Paulo, SP" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="font-bold text-slate-700">Setor</Label>
                  <Input id="industry" defaultValue="Tecnologia" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <Button variant="ghost" className="rounded-xl font-bold h-12 px-8 text-slate-500">Descartar</Button>
                <Button className="rounded-xl font-bold h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">Salvar Perfil</Button>
              </div>
            </Card>
          )}

          {activeTab === "carreiras" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              
              {/* Banner Cover */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Capa do Portal (Banner)</h3>
                <div className="h-48 w-full rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/feature-woman.png')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">Trocar Imagem de Capa</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Benefícios Oferecidos</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Selecione os benefícios que aparecerão na sua página.</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg h-9 font-bold text-blue-600 border-blue-200 bg-blue-50">
                    <Plus className="h-4 w-4 mr-1" /> Novo
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Saúde & Bem-estar", "Equipamento Top", "Auxílio Alimentação", "Bolsa de Estudos", "Gympass", "Trabalho Remoto"].map((ben, i) => (
                    <div key={i} className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-bold text-slate-700">{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Photos */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Galeria de Cultura (Fotos do Escritório)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-32 rounded-2xl bg-[url('/hero-man.png')] bg-cover bg-center border border-slate-200"></div>
                  <div className="h-32 rounded-2xl bg-[url('/feature-woman.png')] bg-cover bg-center border border-slate-200"></div>
                  <div className="h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 transition-all">
                    <Plus className="h-6 w-6 mb-1 text-slate-300 group-hover:text-blue-500" />
                    <span className="text-[10px] font-bold uppercase">Adicionar</span>
                  </div>
                </div>
              </div>

              {/* Highlight / Testimonial */}
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-4">Depoimento em Destaque</h3>
                 <div className="space-y-4">
                    <Textarea 
                      className="bg-slate-50 border-slate-200 rounded-xl min-h-[80px] resize-none font-medium text-slate-900"
                      defaultValue='"Trabalhar aqui é ter a certeza de que você está construindo o futuro..."'
                    />
                    <div className="flex gap-4">
                      <Input placeholder="Nome do Funcionário" defaultValue="Carlos Mendes" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium" />
                      <Input placeholder="Cargo" defaultValue="Senior Software Engineer" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium" />
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <Button className="rounded-xl font-bold h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                  Atualizar Portal de Carreiras
                </Button>
              </div>
            </Card>
          )}
          
          {activeTab === "equipe" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Membros da Equipe</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">Gerencie quem tem acesso ao painel de recrutamento da sua empresa.</p>
                </div>
                <Button className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                  <Plus className="h-4 w-4 mr-2" /> Convidar Membro
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Danilo Almeida", email: "danilo@cevan.com.br", role: "Admin / Recrutador", status: "Ativo", avatar: "DA" },
                  { name: "Mariana Souza", email: "mariana@cevan.com.br", role: "Gestora de RH", status: "Ativo", avatar: "MS" },
                  { name: "Carlos Mendes", email: "carlos.tech@cevan.com.br", role: "Tech Lead", status: "Ativo", avatar: "CM" },
                  { name: "Beatriz Oliveira", email: "beatriz@cevan.com.br", role: "Recrutadora Junior", status: "Pendente", avatar: "BO" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-700">{member.role}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${member.status === 'Ativo' ? 'text-green-500' : 'text-amber-500'}`}>{member.status}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 group-hover:text-slate-600">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Controle de Permissões</h4>
                  <p className="text-xs text-blue-800/70 leading-relaxed font-medium mt-1">
                    Como Administrador, você pode definir níveis de acesso para cada membro. Membros com cargo de "Gestor" podem aprovar shortlists, enquanto "Recrutadores" gerenciam apenas o pipeline.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "conta" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Meus Dados</h3>
                <p className="text-sm text-slate-500 font-medium">Informações do responsável pela conta na plataforma.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="font-bold">Nome Completo</Label>
                  <Input defaultValue="Danilo Almeida" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">E-mail Profissional</Label>
                  <Input defaultValue="danilo@cevan.com.br" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Cargo</Label>
                  <Input defaultValue="Head de Recrutamento" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Telefone</Label>
                  <Input defaultValue="(11) 99999-8888" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <Button className="rounded-xl font-bold h-12 px-8 bg-slate-900 text-white">Salvar Alterações</Button>
              </div>
            </Card>
          )}

          {activeTab === "seguranca" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Segurança da Conta</h3>
                <p className="text-sm text-slate-500 font-medium">Proteja seu acesso com autenticação forte.</p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Autenticação de Dois Fatores (2FA)</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Adicione uma camada extra de segurança.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-lg h-9 font-bold text-blue-600 border-blue-200 bg-blue-50">Ativar</Button>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-600 shadow-sm">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Alterar Senha</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Recomendamos trocar a cada 90 dias.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-lg h-9 font-bold">Redefinir</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4">Sessões Ativas</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-700">Chrome no Windows (Atual)</span>
                    </div>
                    <span className="text-green-500 font-bold text-xs uppercase">Online</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-700">Safari no iPhone 15</span>
                    </div>
                    <span className="text-slate-400 font-medium">Há 2 horas</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notificacoes" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Preferências de Notificação</h3>
                <p className="text-sm text-slate-500 font-medium">Escolha como e quando quer ser avisado.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">E-mail</h4>
                  {[
                    "Novos candidatos inscritos",
                    "Aprovação de vagas pela Cevan",
                    "Resumo semanal de atividades",
                    "Atualizações do sistema",
                  ].map((label, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <span className="text-sm font-bold text-slate-700">{label}</span>
                      <div className={`h-6 w-10 rounded-full flex items-center px-1 transition-all ${i < 3 ? 'bg-blue-600' : 'bg-slate-200'}`}>
                        <div className={`h-4 w-4 bg-white rounded-full shadow-sm transition-all ${i < 3 ? 'ml-auto' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
