import { changePreOrderStatus } from "@/lib/api/preorder";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useUpdatePreOrderStatus=()=>{
    const queryClient=useQueryClient();

    const mutation= useMutation({
        mutationFn:({status,id}:{status:'active' | 'inactive',id:number})=>changePreOrderStatus(status,id),
        onSuccess:(result)=>{
            if(result.success){
                toast.success(result.message);
                queryClient.invalidateQueries({queryKey:['preorders']});
            }
            else{
                toast.error(result.message)
            }
        },
        onError:(err)=>{
            toast.error(err.message || 'Something went wrong')
        }
    })

    return mutation
}