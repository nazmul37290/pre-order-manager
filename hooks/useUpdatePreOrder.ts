import { updatePreOrder } from "@/lib/api/preorder";
import { PreOrderBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdatePreOrder=()=>{
    const queryClient=useQueryClient();
    const router=useRouter()
    const mutation= useMutation({
        mutationFn:({data,id}:{data:PreOrderBody,id:number})=>updatePreOrder(data,id),
        onSuccess:(result)=>{
            if(result.success){
                toast.success('Pre order updated successfully');
                queryClient.invalidateQueries({queryKey:['preorder']});
                router.push('/')
            }
            else{
                toast.error(result?.message)
            }
        },
        onError:(err)=>{
            toast.error(err.message || 'Something went wrong')
        }
    })

    return mutation
}