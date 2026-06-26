"use client"
import { PreOrder } from '@/app/page';
import PreorderForm from '@/components/preorder-form'
import { Button } from '@/components/ui/button'
import { useUpdatePreOrder } from '@/hooks/useUpdatePreOrder';
import { formatLocal } from '@/lib/formatDate';
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const EditPreOrderClient = ({data}:{data:PreOrder}) => {
    console.log(data);
    const updateMutation=useUpdatePreOrder();

    const handleUpdatePreOrder = (updatedData:PreOrder) => {
        updateMutation.mutate({ data: updatedData,id:data.id})
    }
    return (
        <main className="flex flex-col px-4 flex-1 items-center pt-24 bg-zinc-50 dark:bg-black">
            <section className="max-w-6xl mx-auto w-full">

                <div className="flex items-center justify-between">
                    {/* <h3 className="text-lg font-bold text-secondary">Preorders</h3> */}
                    <Link href={'/'}>
                        <Button className='bg-white text-black ' variant={'outline'}><ChevronLeft></ChevronLeft> Back</Button>
                    </Link>
                    <div className='flex items-center gap-2'>
                        <Link href={'/'}>
                            <Button className='bg-white text-black ' variant={'outline'}>Cancel</Button>
                        </Link>
                        <Button form='preorder-create' type='submit'>{updateMutation?.isPending ? "Saving.." : "Save Changes"} </Button>


                    </div>
                </div>

                <PreorderForm
                    defaultValues={{

                        ...data,
                        startsAt:formatLocal(data?.startsAt),
                        endsAt:data.endsAt && formatLocal(data?.endsAt)
                    }
                        }
                    onSubmit={handleUpdatePreOrder}
                    isLoading={false}
                />
            </section>
        </main>
    );
};

export default EditPreOrderClient;