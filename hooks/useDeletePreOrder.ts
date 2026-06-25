import { deletePreOrder } from "@/lib/api/preorder";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useDeletePreOrder=()=>{
    const queryClient= useQueryClient();

    const mutation= useMutation({
        mutationFn:deletePreOrder,
        onSuccess:(result)=>{
            if(result.success){
                toast.success(result.message);
                queryClient.invalidateQueries({queryKey:['preorders']})
            }
            else{
                toast.error(result.message)
            }
        },
        onError:()=>{
            toast.error('Something went wrong')
        }

    })

    return mutation;
}