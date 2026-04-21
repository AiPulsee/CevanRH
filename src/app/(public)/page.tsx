"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Zap, 
  Code, 
  Database, 
  BarChart, 
  Palette, 
  HeartPulse, 
  Headset, 
  Briefcase, 
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Smartphone,
  Apple,
  Play,
  Building2,
  Clock,
  DollarSign
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#202124]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-[#F5F7FC] overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#202124] leading-tight">
                There Are <span className="text-[#1967D2]">93,178</span> Postings Here <br /> For you!
              </h1>
              <p className="text-slate-500 text-lg">
                Find Jobs, Employment & Career Opportunities
              </p>

              {/* Search Bar Exact Style */}
              <div className="p-2 bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center">
                <div className="flex-1 flex items-center px-4 gap-3 w-full border-r border-slate-100">
                  <Search className="h-5 w-5 text-slate-400" />
                  <Input placeholder="Job title, keywords, or company" className="border-none bg-transparent h-14 focus-visible:ring-0 text-sm" />
                </div>
                <div className="flex-1 flex items-center px-4 gap-3 w-full">
                  <MapPin className="h-5 w-5 text-slate-400" />
                  <Input placeholder="City, state, zip code" className="border-none bg-transparent h-14 focus-visible:ring-0 text-sm" />
                </div>
                <Button size="lg" className="rounded-xl px-10 h-14 font-medium bg-[#1967D2] hover:bg-blue-700 w-full md:w-auto">
                  Find Jobs
                </Button>
              </div>
              
              <p className="text-sm text-slate-500">
                <span className="font-bold text-[#202124]">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior, Engineer,
              </p>
            </div>

            <div className="flex-1 relative">
              {/* Floating Badges Exact as Print */}
              <div className="absolute top-10 left-0 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                   <Clock className="h-5 w-5" />
                 </div>
                 <p className="text-xs font-bold">Upload Your CV</p>
              </div>

              <div className="absolute top-40 -left-10 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                   <Briefcase className="h-5 w-5" />
                 </div>
                 <p className="text-xs font-bold">10k+ Candidates</p>
              </div>

              <div className="absolute bottom-20 -right-5 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                   <Headset className="h-5 w-5" />
                 </div>
                 <p className="text-xs font-bold">Contact Agents</p>
              </div>

              <div className="relative h-[550px] w-full max-w-md mx-auto">
                <Image src="/hero-man.png" alt="Hero" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPULAR CATEGORIES --- */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Popular Job Categories</h2>
          <p className="text-slate-500 mb-12">2020 jobs live - 293 added today.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Accounting / Finance", icon: Database, count: "(2 open positions)" },
              { name: "Marketing", icon: BarChart, count: "(86 open positions)" },
              { name: "Design", icon: Palette, count: "(43 open positions)" },
              { name: "Development", icon: Code, count: "(12 open positions)" },
              { name: "Human Resources", icon: HeartPulse, count: "(55 open positions)" },
              { name: "Automotive Jobs", icon: Smartphone, count: "(20 open positions)" },
              { name: "Customer Service", icon: Headset, count: "(2 open positions)" },
              { name: "Health and Care", icon: HeartPulse, count: "(25 open positions)" },
              { name: "Project Management", icon: Briefcase, count: "(92 open positions)" },
            ].map((cat, i) => (
              <Card key={i} className="p-8 border-slate-100 hover:shadow-lg transition-all cursor-pointer text-left flex items-center gap-6">
                <div className="h-14 w-14 rounded-lg bg-slate-50 flex items-center justify-center text-[#1967D2]">
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{cat.name}</h4>
                  <p className="text-xs text-slate-400">{cat.count}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED JOBS --- */}
      <section className="py-24 bg-[#F5F7FC]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
          <p className="text-slate-500 mb-12">Know your worth and find the job that qualify your life.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-8 border-slate-100 bg-white hover:shadow-lg transition-all flex items-start gap-6 relative">
                 <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#1967D2] text-xl">
                   S
                 </div>
                 <div className="flex-1 space-y-2">
                   <div className="flex items-center justify-between">
                     <h4 className="font-bold text-lg">Software Engineer (Android), Libraries</h4>
                     <Badge variant="outline" className="text-xs font-medium text-slate-400 border-none px-0"><Star className="h-4 w-4" /></Badge>
                   </div>
                   <div className="flex items-center gap-4 text-xs text-slate-400">
                     <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> Segment</span>
                     <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> London, UK</span>
                     <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 11 hours ago</span>
                     <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> $35k - $45k</span>
                   </div>
                   <div className="flex gap-2 pt-2">
                     <Badge className="bg-blue-50 text-blue-600 border-none rounded-full px-4 text-[10px]">Full Time</Badge>
                     <Badge className="bg-green-50 text-green-600 border-none rounded-full px-4 text-[10px]">Private</Badge>
                     <Badge className="bg-orange-50 text-orange-600 border-none rounded-full px-4 text-[10px]">Urgent</Badge>
                   </div>
                 </div>
              </Card>
            ))}
          </div>
          
          <Button size="lg" className="bg-[#1967D2] rounded-lg px-12 h-14 font-medium">Load More Listing</Button>
        </div>
      </section>

      {/* --- FEATURE SECTION 2 --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 relative">
             <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image src="/feature-woman.png" alt="Working" fill className="object-cover" />
             </div>
             {/* Floating chat icon as in print */}
             <div className="absolute -bottom-6 -right-6 h-12 w-12 bg-[#1967D2] rounded-full flex items-center justify-center text-white shadow-xl">
                <div className="h-6 w-6 bg-white/20 rounded-full" />
             </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold leading-tight">Millions of Jobs. Find the <br /> one that suits you.</h2>
            <p className="text-slate-500 leading-relaxed">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.</p>
            <ul className="space-y-4">
              {["Bring to the table win-win survival", "Capitalize on low hanging fruit to identify", "But I must explain to you how all this"].map(t => (
                <li key={t} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="h-5 w-5 rounded-full bg-blue-50 text-[#1967D2] flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-[#1967D2] rounded-lg px-12 h-14 font-medium">Get Started</Button>
            
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-slate-100">
              <div className="text-center">
                <p className="text-4xl font-bold">4M</p>
                <p className="text-xs text-slate-400 mt-2">4 million daily active users</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">12k</p>
                <p className="text-xs text-slate-400 mt-2">Over 12k open job positions</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">20M</p>
                <p className="text-xs text-slate-400 mt-2">Over 20 million stories shared</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- APP PROMO --- */}
      <section className="py-24 bg-[#F5F7FC]">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 relative flex justify-center">
            <div className="relative w-80 h-[500px]">
               <div className="absolute top-0 left-0 w-64 h-[480px] bg-slate-300 rounded-[3rem] shadow-2xl border-4 border-white" />
               <div className="absolute top-10 right-0 w-64 h-[480px] bg-slate-400 rounded-[3rem] shadow-2xl border-4 border-white" />
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <p className="text-[#1967D2] font-bold text-sm">DOWNLOAD & ENJOY</p>
            <h2 className="text-4xl font-bold">Get the Superio Job <br /> Search App</h2>
            <p className="text-slate-500">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.</p>
            <div className="flex gap-4">
              <Button className="bg-slate-900 h-16 px-8 rounded-xl flex gap-3 text-white">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase opacity-50">Download on</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </Button>
              <Button className="bg-slate-900 h-16 px-8 rounded-xl flex gap-3 text-white">
                <Play className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase opacity-50">Get it on</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-[#1967D2] rounded-full flex items-center justify-center text-white">
                  <Zap className="h-5 w-5 fill-white" />
                </div>
                <span className="text-2xl font-bold">CevanRH</span>
              </div>
              <p className="text-slate-500 font-medium">Call us <br /> <span className="text-slate-900 text-lg font-bold">123 456 7890</span></p>
              <p className="text-sm text-slate-500 max-w-xs">329 Queensberry Street, North Melbourne VIC 3051, Australia. support@superio.com</p>
            </div>
            
            {["For Candidates", "For Employers", "About Us", "Helpful Resources"].map((col) => (
              <div key={col} className="space-y-6">
                <h4 className="font-bold text-lg">{col}</h4>
                <ul className="space-y-3 text-slate-500 text-sm">
                  <li>Browse Jobs</li>
                  <li>Browse Candidates</li>
                  <li>Candidate Dashboard</li>
                  <li>Job Alerts</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2026 CevanRH by Purethemes. All Rights Reserved.</p>
            <div className="flex gap-4">
              <div className="h-8 w-8 bg-slate-50 rounded flex items-center justify-center text-slate-400">f</div>
              <div className="h-8 w-8 bg-slate-50 rounded flex items-center justify-center text-slate-400">t</div>
              <div className="h-8 w-8 bg-slate-50 rounded flex items-center justify-center text-slate-400">in</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
