import { PreOrdersResponse } from "@/app/page";

export async function getPreOrders(query:Record<string,unknown>):Promise<PreOrdersResponse>{
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    });

    const res = await fetch(`/api/preorders?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch preorders");
    }

    return res.json();
}