
import { Prisma } from "@/generated/prisma/client";
import { apiError } from "@/lib/apiError";
import { apiResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { preOrderSchema } from "@/lib/validations/preorder";
import { URL } from "url";

export async function GET(req:Request) {
    const {searchParams}= new URL(req.url);
    const status= searchParams?.get('status') || 'all';
    const page=Number(searchParams?.get('page') || 1);
    const limit=Number(searchParams?.get('limit') || 10);
    const sortBy= searchParams?.get('sortBy') || 'createdAt';
    const sortDirection=searchParams?.get('sortDirection') || 'desc';

    const allowedSortFields=['name','createdAt','startsAt','endsAt']

    const safeSortBy= allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    const where:any={}
    if(status!=='all'){
        where.status=status
    }

    const orderBy= {[safeSortBy]:sortDirection};

    try{
        const preOrders= await prisma.preOrder.findMany({
            where,
            orderBy,
            skip:(page-1)*limit,
            take:limit
        })

        const total= await prisma.preOrder.count({where})

        return apiResponse({
            message:"Pre orders get successfully",
            status:200,
            data:{preOrders,total,page,totalPages:(total/limit) <1 ? 1 : (total/limit) ,limit}
        })
    }
    catch(err){
        return apiError({
            error:err
        })
    }

  



    
}
export async function POST(req:Request) {
  
    try{
        const body= await req.json();
        const validatedData=preOrderSchema.parse(body);

        const preOrder = await prisma.preOrder.create({
            data:validatedData
        })

        return apiResponse({
            data:preOrder,
            message:"Pre order created successfully",
            status:201
        })
     
    }
    catch(err){
        return apiError({
            error:err
        })
    }
}