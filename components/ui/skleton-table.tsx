import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable({rows=5,cols=8}) {
    return (
        <div className="flex w-full max-w-full flex-col gap-2">
            {Array.from({ length: rows }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                    {
                        Array.from({length:cols}).map((_,idx)=>{
                            return  <Skeleton key={idx} className="h-4 w-24 flex-1" />
                        })
                    }
                    
                </div>
            ))}
        </div>
    )
}
