import { PreOrder, PreOrdersResponse } from "@/app/page";
import { PreOrderBody } from "@/types";

export async function getPreOrders(query:Record<string,unknown>):Promise<PreOrdersResponse>{
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });

    const res = await fetch(`/api/preorders?${params.toString()}`, {
        method: "GET",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch preorders");
    }

    return res.json();
}
export async function getSingleOrder(id:number):Promise<{data:PreOrder}>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/preorders/${id}`, {
        method: "GET",
    });
    const data= await res.json()
    if (!res.ok) {
        throw new Error(data.message ||"Failed to fetch preorders");
    }

    return data
}

export async function createPreOrder(preOrderData:{
    name: string;
    products: number;
    preOrderWhen: 'out-of-stock' | 'regardless-of-stock';
    startsAt: string;
    endsAt: string | null;
    status: 'active' | 'inactive' ;
}) {

    console.log(JSON.stringify(preOrderData),'data');
    const res = await fetch(`/api/preorders`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(preOrderData)
    })
    const data=await res.json()
    if (!res.ok) {
        throw new Error(data?.message || "Failed to create pre order")
    }

    return  data
}



export async function updatePreOrder(preOrderData: PreOrderBody,id:number){
    const res= await fetch(`/api/preorders/${id}`,{
        method:"PATCH",
        body:JSON.stringify(preOrderData)
    })

    const data= await res.json();

console.log(data,'updated data');


    if(!res.ok){
        throw new Error (data?.message ||"Failed to update preorder")
    }

    return data
}
export async function changePreOrderStatus(statusValue:'active'|'inactive',id:number){
    const res= await fetch(`/api/preorders/${id}`,{
        method:"PATCH",
        body:JSON.stringify({status:statusValue})
    })

    const data= await res.json();

    if(!res.ok){
        throw new Error (data?.message ||"Failed to update status")
    }

    return data
}
export async function deletePreOrder(id:number){
    const res= await fetch(`/api/preorders/${id}`,{
        method:"DELETE",
    })
    const data = await res.json();

    if(!res.ok){
        throw new Error(data?.message || "Failed to update status")
    }

    return data
}