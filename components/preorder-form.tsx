"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import Link from "next/link"
import { Info } from "lucide-react"
import { BiError } from "react-icons/bi"

type FormData = {
    name: string
    products: number
    preOrderWhen: string
    startsAt: string
    endsAt: string
    status: 'active' | 'inactive'
}

type PreorderFormProps = {
    defaultValues?: any
    onSubmit: (data: any) => void
    isLoading?: boolean
}

export default function PreorderForm({isLoading,defaultValues={
    status:'inactive',preOrderWhen:'out-of-stock',products:1
},onSubmit}:PreorderFormProps) {
    const { register, handleSubmit, setValue, watch,formState:{errors},getValues } = useForm<FormData>({
        defaultValues
    })

    const status = watch("status")

    return (
        <Card className=" mt-8 py-0">
            <CardHeader className="p-6 border-b">
                <CardTitle>Preorder details</CardTitle>
                <CardDescription> These values appear in the preorders list.</CardDescription>
            </CardHeader>


            <CardContent className="px-6 pb-4">

        <form
        id="preorder-create"
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-6xl mx-auto  rounded-lg space-y-6"
        >
           

            {/* Name */}
            <div className="grid grid-cols-3 gap-6 items-center mb-0 py-6 border-b">
                        <LabelComponent labelText="Name" required labelDescription="A label to recognize this pre order by"></LabelComponent>
                        <div className="col-span-2 max-w-120">

                <Input className={`${errors.name ? '  ring-red-600! border-red-600' :""} h-9!`} {...register("name",{
                    required:"Name is required",
                    minLength:{value:3, message:'Minimum 3 characters'}
                })} />
                            {errors.name && <p className="text-red-500 text-xs flex items-center gap-1 mt-2"><BiError className="size-4"></BiError> {errors.name.message}</p>}
                        </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-3 gap-6 items-center mb-0 py-7 border-b">
                <LabelComponent labelText="Products" labelDescription="Number of products covered by this pre order"></LabelComponent>
                <div>

                <div>
                <Input
                    type="number"
                                    className={`${errors.name ? '  ring-red-600! border-red-600' : ""} col-span-2 max-w-40 h-9!`}
                    {...register("products",{
                        required:'Products count is required',
                        min:{value:1,message:"Products count must be minimum 1 "},
                    })}
                />
                <span className="ml-2 text-xs text-zinc-600">product(s)</span>
                </div>
                            {errors.products && <p className="text-red-500 text-xs flex items-center gap-1 mt-2"><BiError className="size-4"></BiError> {errors.products.message}</p>}
                </div>
            </div>

            {/* Select */}
                    <div className="grid grid-cols-3 gap-6 items-center mb-0 py-7 border-b">
                        <LabelComponent labelText="Preorder when" labelDescription="When customers are allowed to preorder"></LabelComponent>
                
                <Select
                    value={defaultValues?.preOrderWhen || "regardless-of-stock"}
                    onValueChange={(val) => setValue("preOrderWhen", val)}
                >
                            <SelectTrigger className="col-span-2 w-full max-w-120 h-9!">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="regardless-of-stock">
                            regardless-of-stock
                        </SelectItem>
                        <SelectItem value="out-of-stock">
                            out-of-stock
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Starts At */}
                    <div className="grid grid-cols-3 gap-6 items-center mb-0 py-7 border-b">
                        <LabelComponent labelText="Starts at" labelDescription="When the preorder window opens"></LabelComponent>
                        <div className="col-span-2 max-w-120"> 

                <Input
                    type="datetime-local"
                                className={`${errors.name ? '  ring-red-600! border-red-600' : ""}  h-9!`}
                    {...register("startsAt",{
                        required:"Starts at date is required"
                    })}
                />
                            {errors.startsAt && <p className="text-red-500 text-xs flex items-center gap-1 mt-2"><BiError className="size-4"></BiError> {errors.startsAt.message}</p>}
                </div>
            </div>

            {/* Ends At */}
            <div className="grid grid-cols-3 gap-6 items-center mb-0 py-7 border-b">
                        <LabelComponent labelText="Ends at" labelDescription="Leave empty for no end date"></LabelComponent>
                        <div className="col-span-2 max-w-120">

                <Input
                    type="datetime-local"
                                className={`${errors.name ? '  ring-red-600! border-red-600' : ""}  h-9!`}
                    {...register("endsAt",{
                        validate: (value) => {
                            if (!value) return true // optional field

                            const start = new Date(getValues('startsAt'))
                            const end = new Date(value)

                            return end > start || "End date must be after start date"
                        }
                    })}
                />
                            {errors.endsAt && <p className="text-red-500 text-xs flex items-center gap-1 mt-2"><BiError className="size-4"></BiError> {errors.endsAt.message}</p>}
                </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-3 gap-6 items-center mb-0 py-7 border-b">
                        <LabelComponent labelText="Status" labelDescription="Active preorders are visible to customers"></LabelComponent>
                <div className="col-span-2 flex items-center gap-3">
                    <Switch
                        checked={status==='active'}
                                className="h-6! w-10! rounded-md p-1 cursor-pointer [&>span]:h-2 [&>span]:w-2  [&>span]:rounded!  [&>span]:data-[state=checked]:translate-x-3.5"
                        onCheckedChange={(val) => setValue("status", val?'active':'inactive')}
                    />
                    <span>Active</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Link href={'/'} prefetch>
                <Button variant="outline" type="button">
                    Cancel
                </Button>
                </Link>
                        <Button disabled={isLoading} type="submit"> {isLoading ? "Saving..." : "Save"}</Button>
            </div>
        </form>
            </CardContent>
        </Card>
    )
}


const LabelComponent=({labelText,labelDescription,required=false}:{labelText:string,labelDescription?:string,required?:boolean})=>{
   return <div>
        <Label>{labelText} {required && <span className="text-red-500">*</span>} </Label>
        <p className="text-xs mt-2 text-zinc-500">{labelDescription}</p>
    </div>
}