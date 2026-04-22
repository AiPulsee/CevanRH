"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2 } from "lucide-react";

interface ConfirmActionProps {
  title: string;
  description: string;
  triggerText?: string;
  actionText?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  children?: React.ReactNode;
}

export function ConfirmAction({
  title,
  description,
  triggerText,
  actionText = "Confirmar",
  variant = "primary",
  onConfirm,
  children
}: ConfirmActionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger nativeButton={true}>
        {children || (
          <Button variant={variant === "danger" ? "destructive" : "default"} className="rounded-xl font-bold">
            {triggerText}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-10">
        <AlertDialogHeader className="space-y-4">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${variant === "danger" ? "bg-rose-50 text-rose-500" : "bg-primary/10 text-primary"}`}>
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <AlertDialogTitle className="text-2xl font-black tracking-tight">{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium leading-relaxed">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 gap-3">
          <AlertDialogCancel className="rounded-xl h-12 px-8 font-bold border-slate-200 hover:bg-slate-50">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`rounded-xl h-12 px-8 font-black uppercase text-xs tracking-widest shadow-lg ${
              variant === "danger" 
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-200" 
                : "bg-primary hover:bg-primary/90 shadow-primary/20"
            }`}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
