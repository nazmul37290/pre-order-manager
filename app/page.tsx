'use client'
import { DeleteAlert } from "@/components/delete-alert";
import SortDropDown, { Query } from "@/components/sort-dropdown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SkeletonTable } from "@/components/ui/skleton-table";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeletePreOrder } from "@/hooks/useDeletePreOrder";
import { useUpdatePreOrderStatus } from "@/hooks/useUpdatePreOrderStatus";
import { getPreOrders } from "@/lib/api/preorder";
import { formatDateTime } from "@/lib/formatDate";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export type PreOrder = {
  id: number;
  name: string;
  products: number;
  preOrderWhen: 'regardless-of-stock'| 'out-of-stock';
  startsAt: string;
  endsAt: string | null;
  status: "active"|'inactive';
};

export type PreOrdersResponse = {
  data: {
    preOrders: PreOrder[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
export default function Home() {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [query, setQuery] = useState<Query>({
    status: 'all',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });

  const { data, error, isLoading, } = useQuery<PreOrdersResponse, Error>({
    queryKey: ['preorders', { ...query }],
    queryFn: () => getPreOrders(query)
  })

  const deleteMutation= useDeletePreOrder()
  const updateStatusMutation=useUpdatePreOrderStatus()



  const page = data?.data?.page ?? 1;
  const limit = data?.data?.limit ?? 10;
  const total = data?.data?.total ?? 0;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);




  const nextPage = () => {
    setQuery(prev => ({
      ...prev,
      page: prev.page + 1
    }));
  };

  const prevPage = () => {
    setQuery(prev => ({
      ...prev,
      page: Math.max(1, prev.page - 1)
    }));
  };

  const handleMarkAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(data?.data?.preOrders.map(o => o.id) || []);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSingleMark = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedIds(prev => ([...prev, id]))
    }
    else {
      const newIds = selectedIds?.filter(item => item !== id)
      setSelectedIds(newIds)
    }
  }

  const handleStatusUpdate = async (checked: boolean, id: number) => {
    const status = checked ? 'active' : 'inactive';
updateStatusMutation.mutate({status,id})
  };

  const handlePreOrderDelete = async (id: number) => {
   deleteMutation.mutate(id);
  }


  return (
    <main className="flex flex-col px-4 flex-1 items-center pt-24 bg-zinc-50  dark:bg-black">
      <section className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-secondary">Preorders</h3>
          <Link prefetch href={'/preorder/create'}>
          <Button>Create Preorder</Button>
          </Link>
        </div>
        {
          error &&
          <p className="text-red-500">{error.message}</p>

        }

        <div className="bg-white mt-6 rounded-lg border">
          <div className="p-2 flex items-center justify-between">
            <div>
              {
                ['all', 'active', 'inactive'].map((btn, i) => {
                  return <Button key={i} variant={"outline"} className={`${query?.status === btn ? "bg-zinc-200" : ""} capitalize border-0! font-semibold text-secondary`} onClick={() => setQuery(prev => ({
                    ...prev, status: btn as "all" | "active" | "inactive", page: 1
                  }))}>{btn}</Button>
                })
              }

            </div>
            <SortDropDown query={query} setQuery={setQuery}></SortDropDown>
          </div>
          <Table className="border rounded-md">
            <TableHeader className=" bg-[#f5f5f5]">
              <TableRow>
                <TableHead className="">
                  <Checkbox onCheckedChange={handleMarkAll} className="border border-zinc-600"></Checkbox>
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-secondary">Name</TableHead>
                <TableHead className="font-semibold text-secondary">Products</TableHead>
                <TableHead className="font-semibold text-secondary">Preorder when</TableHead>
                <TableHead className="font-semibold text-secondary">Starts at</TableHead>
                <TableHead className="font-semibold text-secondary">Ends at</TableHead>
                <TableHead className="font-semibold text-secondary">Status</TableHead>
                <TableHead className="font-semibold text-secondary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                isLoading && <TableRow>
                  <TableCell colSpan={8}>
                    <SkeletonTable></SkeletonTable>
                  </TableCell>
                </TableRow>
              }
              {data?.data?.preOrders && data?.data?.preOrders?.length > 0 && !isLoading ?
                data?.data?.preOrders.map((order) => {

                  return <TableRow key={order?.id}>
                    <TableCell className="font-medium"><Checkbox checked={selectedIds?.includes(order?.id)} onCheckedChange={(e:boolean) => handleSingleMark(e, order.id)} className="border border-zinc-600"></Checkbox></TableCell>
                    <TableCell className="font-semibold">{order?.name}</TableCell>
                    <TableCell>{order?.products}</TableCell>
                    <TableCell className="">{order?.preOrderWhen}</TableCell>
                    <TableCell className="">{formatDateTime(order?.startsAt)}</TableCell>
                    <TableCell className="">{order?.endsAt && formatDateTime(order?.endsAt)}</TableCell>
                    <TableCell className="">
                      <Switch checked={order.status === 'active'} onCheckedChange={val => handleStatusUpdate(val, order?.id)} className="h-6! w-10! rounded-md p-1 cursor-pointer [&>span]:h-2 [&>span]:w-2  [&>span]:rounded!  [&>span]:data-[state=checked]:translate-x-3.5"
                      />
                    </TableCell>
                    <TableCell className="text-right flex items-center gap-2">
                      <Link prefetch href={`/preorder/edit/${order?.id}`}>
                      <Button className="cursor-pointer" variant={'outline'}><Pen /></Button>
                      </Link>
                      <DeleteAlert onConfirm={() => handlePreOrderDelete(order?.id)} ></DeleteAlert>

                    </TableCell>
                  </TableRow>
                }) :
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="flex justify-center gap-2 text-red-500 items-center w-full">
                      No Pre orders found
                    </div>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex justify-center gap-2 items-center w-full">
                    <Button disabled={page === 1} className="disabled:cursor-not-allowed! cursor-pointer disabled:bg-zinc-200 disabled:text-black" onClick={prevPage}><ChevronLeft></ChevronLeft></Button>
                    <p>Showing {total === 0 ? 0 : start} to {end} from {total}</p>
                    <Button disabled={page >= data?.data?.totalPages} className="disabled:cursor-not-allowed cursor-pointer disabled:bg-zinc-200 disabled:text-black" onClick={nextPage}><ChevronRight></ChevronRight></Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>
    </main>
  );
}
