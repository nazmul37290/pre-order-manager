import { apiError } from "@/lib/apiError";
import { apiResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { preOrderSchema } from "@/lib/validations/preorder";

export async function GET(req: Request, { params }: { params: Promise<{ id: number }> }) {

    const { id } = await params
    try {
        const data = await prisma.preOrder.findFirst({
            where: { id: Number(id) },
        })

        return apiResponse({
            status: 201,
            message: "Pre order get successfully",
            data: data
        })
    }
    catch (err) {
        console.log(err);
        return apiError({
            error: err
        })
    }

    
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: number }> }) {

    const { id } = await params

    try {

        const body = await req.json();
        const result = preOrderSchema.partial().safeParse(body);

        if (!result.success) {
            return apiError({ error: result.error });
        }
        const updatedData = await prisma.preOrder.update({
            data: result.data,
            where: { id: Number(id) },

        })

        return apiResponse({
            status: 201,
            message: "Pre order updated successfully",
            data: updatedData
        })
    }
    catch (err) {
        return apiError({
            error: err
        })
    }

    
}
export async function PATCH(req: Request, { params }: { params: Promise<{ id: number }> }) {

    const { id } = await params

    try {

        const isPreOrderExists= await prisma.preOrder.findUnique({
            where:{id:Number(id)}
        })

        if(!isPreOrderExists){
            return apiError({
                message:"Order Not found",
                status:404,
                error:null
            })
        }

        const body = await req.json();
        const result = preOrderSchema.partial().safeParse(body);
      

        if (!result.success) {
            return apiError({ error: result.error });
        }
        const updatedData = await prisma.preOrder.update({
            data: result.data,
            where: { id: Number(id) },

        })

        return apiResponse({
            status: 201,
            message: "Pre order updated successfully",
            data: updatedData
        })
    }
    catch (err) {
        return apiError({
            error: err
        })
    }

    
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: number } >}
) {
    const {id}= await params;

    try{
        await prisma.preOrder.delete({
            where: { id: Number(id) }
        })

        return apiResponse({
            status:200,
            message:'Pre order deleted successfully',
            data:null,
        })

    }
    catch(err){
        return apiError({
            error:err
        })
    }


    
}