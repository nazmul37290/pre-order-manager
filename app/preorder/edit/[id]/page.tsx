
import EditPreOrderClient from '@/components/client/EditPreOrderClient'

import { getSingleOrder } from '@/lib/api/preorder'


const EditPreOrder = async ({ params }: { params:Promise<{id:number}>}) => {
    const {id}= await params
    const data= await getSingleOrder(id)
    
    return <EditPreOrderClient data={data?.data}></EditPreOrderClient>
}

export default EditPreOrder