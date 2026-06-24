import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { TbArrowsSort } from "react-icons/tb";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

export type Query = {
    status: 'all' | 'active' | 'inactive';
    page: number;
    limit: number;
    sortBy: 'name' | 'createdAt' | 'startsAt' | 'endsAt';
    sortDirection: 'asc' | 'desc';
};

const SortDropDown = ({query,setQuery}:{query:Query;setQuery:Dispatch<SetStateAction<Query>>}) => {
    const handleSort = (field: string) => {
        setQuery(prev => ({
            ...prev,
            sortBy: field as 'name' | 'createdAt' | 'startsAt' | 'endsAt',
        }));
    };

    const handleDirection = (dir: 'asc' | 'desc') => {
        setQuery(prev => ({
            ...prev,
            sortDirection: dir,
        }));
    };
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant={'outline'}><TbArrowsSort /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                    <DropdownMenuRadioGroup
                        value={query.sortBy}
                        onValueChange={(val) => handleSort(val)}
                    >
                        <DropdownMenuRadioItem value="name"> <span
                            className={`h-4 w-4 rounded-full border ${query.sortBy === "name" ? "bg-white border-4 border-black" : " border border-zinc-600"
                                }`}
                        /> Name</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="createdAt"><span
                            className={`h-4 w-4 rounded-full border ${query.sortBy === "createdAt" ? "bg-white border-4 border-black" : " border border-zinc-600"
                                }`}
                        /> Created At</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="startsAt"><span
                            className={`h-4 w-4 rounded-full border ${query.sortBy === "startsAt" ? "bg-white border-4 border-black" : " border border-zinc-600"
                                }`}
                        /> Starts At</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="endsAt"><span
                            className={`h-4 w-4 rounded-full border ${query.sortBy === "endsAt" ? "bg-white border-4 border-black" : " border border-zinc-600"
                                }`}
                        /> Ends At</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleDirection('asc')} className={`${query.sortDirection==='asc'?'bg-zinc-100':''}`}><IoIosArrowRoundUp /> <span className="font-semibold">Ascending</span> </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDirection('desc')} className={`${query.sortDirection==='desc'?'bg-zinc-100':''}`}><IoIosArrowRoundDown /> <span className="font-semibold"> Descending</span></DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
};

export default SortDropDown;