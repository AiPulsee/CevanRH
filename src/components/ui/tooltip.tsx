"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

function TooltipProvider({ ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider {...props} />
}

interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {}

function Tooltip({ ...props }: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  side = "top",
  ...props
}: TooltipPrimitive.Popup.Props & { 
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        sideOffset={sideOffset}
        side={side}
        style={{ zIndex: 9999 }}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "max-w-[180px] rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-50 shadow-xl",
            className
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
