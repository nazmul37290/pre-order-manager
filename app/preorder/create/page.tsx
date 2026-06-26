"use client"
import PreorderForm from '@/components/preorder-form';
import { Button } from '@/components/ui/button';
import { useCreatePreOrder } from '@/hooks/useCreatePreOrder';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';


const CreatePreOrder = () => {
    const createMutation=useCreatePreOrder();

    const handleCreate = (data: {
        name: string;
        products: number;
        preOrderWhen: 'out-of-stock' | 'regardless-of-stock';
        startsAt: string;
        endsAt: string | null;
        status: 'active' | 'inactive';
    }) => {
        createMutation.mutate(data)
    }
    return (
        <main className="flex flex-col px-4 flex-1 items-center pt-24 bg-zinc-50  dark:bg-black">
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
                        <Button form='preorder-create' type='submit'>{createMutation?.isPending ? "Saving.." :"Save"} </Button>
                    

                    </div>
                </div>

                <div>
                    <PreorderForm onSubmit={handleCreate} isLoading={createMutation.isPending}></PreorderForm>
                </div>
                {/* {
                    error &&
                    <p className="text-red-500">{error.message}</p>

                } */}

                
            </section>
        </main>
    );
};

export default CreatePreOrder;