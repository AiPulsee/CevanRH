import { Job } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, DollarSign, Clock, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface JobCardProps {
  job: Job & { company: { name: string; logoUrl: string | null } };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.slug}`}>
      <Card className="p-6 bg-white/[0.02] border-white/5 hover:border-primary/50 transition-all cursor-pointer group shadow-sm hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem]">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-black/40 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all">
            {job.company.logoUrl ? (
              <img src={job.company.logoUrl} alt={job.company.name} className="object-cover h-full w-full" />
            ) : (
              <span className="text-2xl font-black text-primary">
                {job.company.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-black text-xl group-hover:text-primary transition-colors tracking-tight">
                {job.title}
              </h3>
              {job.type === "MANAGED" && (
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 rounded-lg text-[10px] px-2 py-0">
                  <Zap className="h-3 w-3 mr-1 fill-primary" />
                  Curadoria
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground font-medium mb-4">{job.company.name}</p>

            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground/70">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4 text-primary/60" />
                {job.isRemote ? "Remoto" : job.location}
              </div>
              {job.salaryRange && (
                <div className="flex items-center gap-1.5 font-medium">
                  <DollarSign className="h-4 w-4 text-primary/60" />
                  {job.salaryRange}
                </div>
              )}
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-primary/60" />
                {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: ptBR })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="h-12 w-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
