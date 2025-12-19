// src/components/RedLines.tsx
import { cn } from '../lib/cn'

export function RedLines() {
  return (
    <>
      {/* Left red line */}
      <div className="fixed left-0 top-0 bottom-0 w-1 bg-red-500 z-10" />
      
      {/* Right red line */}
      <div className="fixed right-0 top-0 bottom-0 w-1 bg-red-500 z-10" />
      
      {/* Four squares on left side of left red line */}
      <div className="fixed left-0 top-1/4 -translate-y-1/2 -translate-x-4 z-10">
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "w-8 h-8 border-2 border-red-500",
                "bg-transparent"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Four squares on right side of right red line */}
      <div className="fixed right-0 top-1/4 -translate-y-1/2 translate-x-4 z-10">
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "w-8 h-8 border-2 border-red-500",
                "bg-transparent"
              )}
            />
          ))}
        </div>
      </div>
    </>
  )
}

