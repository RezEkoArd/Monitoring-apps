" use client"
    import {
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle,
    } from "@/components/ui/sheet"
    import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { useForm } from "@inertiajs/react"
import InputError from "./input-error"
import React from "react"
import { Textarea } from "./ui/textarea"
  
interface CreateMesinProps {
    // categories: Category[]; // Tambahkan prop categories
}

const CreateMesin = () => {
    
    const {data, setData, post, processing, errors,reset} = useForm({
        'nama_mesin' : '',
        'lokasi' : '',
        'kategori' : '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/mesin', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }
  return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Create New Mesin</SheetTitle>
                <SheetDescription asChild className="scroll-smooth">
                <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="nama_mesin">Nama Mesin</Label>
                            <Input
                                id="nama_mesin"
                                type="text"
                                required
                                autoFocus
                                autoComplete="nama_mesin"
                                value={data.nama_mesin}
                                onChange={(e) => setData('nama_mesin', e.target.value)}
                                placeholder="Nama Mesin ..."
                            />
                            <InputError message={errors.nama_mesin} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="kategori">Kategori</Label>
                            <Input
                                id="kategori"
                                required
                                autoFocus
                                autoComplete="kategori"
                                value={data.kategori}
                                onChange={(e) => setData('kategori', e.target.value)}
                                placeholder="Kategori Mesin ..."
                            />
                            <InputError message={errors.kategori} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lokasi">Lokasi</Label>
                            <Textarea
                                id="lokasi"
                                required
                                autoFocus
                                autoComplete="lokasi"
                                value={data.lokasi}
                                onChange={(e) => setData('lokasi', e.target.value)}
                                placeholder="Lokasi Mesin ..."
                            />
                            <InputError message={errors.lokasi} />
                        </div>
                            <Button type="submit">Submit</Button>
                    </form>
                </div>
                
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
  )
}

export default CreateMesin