import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, PagePropsMachine } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { DataTableMesin } from './data-table/data-table';
import { columns } from './data-table/column';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function index() {
    
    const { data, flash, filters } = usePage<PagePropsMachine>().props;

    const [search, setSearch] = useState(filters?.search || '');

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const handler = setTimeout(() => {
            if (search.length >= 3 || search.length === 0) {
                const url = new URL(window.location.href); 
                url.searchParams.set('search', search);

                router.get(
                    url.pathname + url.search,
                    {},
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        },300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {duration: 3000});
        }

        if (flash.errorMessage) {
            toast.error(flash.errorMessage, {duration:3000});
        }
    }, [flash]);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Dashboard" />
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
        <div className='flex items-center justify-between mb-4 '>
            <h1 className='font-semibold text-lg'>List Mesin</h1>
                <Input
                    type="text"
                    placeholder="Cari Mesin"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Create</Button>
                    </SheetTrigger>
                    {/* <CreateBook categories={categories}/> */}
                </Sheet>
            </div>
                <DataTableMesin columns={columns} data={data} />
        </div>
    </AppLayout>
  )
}
