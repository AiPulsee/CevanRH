import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

interface RelatedJobsProps {
  currentJobId: string;
}

export async function RelatedJobs({ currentJobId }: RelatedJobsProps) {
  const jobs = await prisma.job.findMany({
    where: {
      id: { not: currentJobId },
      status: "ACTIVE",
    },
    include: {
      company: true,
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (jobs.length === 0) return null;

  return (
    <div className="space-y-8 pt-16 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Vagas <span className="text-blue-600">Relacionadas</span></h3>
        <Link href="/jobs" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
          Ver todas as vagas
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.slug}`}>
            <Card className="p-6 border-slate-100 bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 rounded-2xl group h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center font-black text-blue-600 text-sm overflow-hidden">
                    {job.company.logoUrl ? (
                      <img src={job.company.logoUrl} alt={job.company.name} className="h-full w-full object-cover" />
                    ) : (
                      job.company.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">{job.company.name}</p>
                    <h4 className="font-bold text-[15px] text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{job.title}</h4>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-slate-50 text-slate-500 hover:bg-slate-100 border-none rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                    {job.isRemote ? "Remoto" : "Presencial"}
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                    {job.salaryRange || "A combinar"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <MapPin className="h-3 w-3" /> {job.location}
                </span>
                <div className="h-7 w-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
