import { createPreOrder } from "@/lib/api/preorder"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { redirect, useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const useCreatePreOrder=()=>{
    const router=useRouter()
    const queryClient=useQueryClient()

    const mutation= useMutation({
        mutationFn:createPreOrder,
        onSuccess:(result)=>{
            if(result?.success){
                toast.success(result?.message)
                queryClient.invalidateQueries({queryKey:['preorders']})
                router.push('/')
            }
            else{
                toast.error(result?.message)
            }
        },
        onError:(err)=>{
            console.log(err,'mutaion');
            toast.error('Something went wrong')
        }
    })

    return mutation
}