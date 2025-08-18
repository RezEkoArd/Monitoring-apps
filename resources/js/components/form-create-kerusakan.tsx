"use client"
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { useForm } from "@inertiajs/react"
import React from "react"
import { Textarea } from "./ui/textarea"
import InputError from "./input-error"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface Mesin {
    id: string | number; // Ubah tipe data ID menjadi string atau number
    kode_mesin: string;
    nama_mesin: string;
}

interface CreateKerusakanProps {
    mesins: Mesin[]
}

const CreateKerusakan = ({ mesins }: CreateKerusakanProps) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        'mesin_id': '',
        'deskripsi': '',
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/kerusakans', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Report New Kerusakan</SheetTitle>
                <SheetDescription asChild className="scroll-smooth">
                    <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label htmlFor="mesin_id">Kode Mesin</Label>
                                <Select
                                    onValueChange={(value) => setData('mesin_id', value)}
                                    value={data.mesin_id}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Select Kode Mesin ..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Kode Mesin</SelectLabel>
                                            {mesins.map((mesin) => (
                                                <SelectItem key={mesin.id} value={String(mesin.id)}>
                                                    {mesin.kode_mesin}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deskripsi">Deskripsi</Label>
                                <Textarea
                                    id="deskripsi"
                                    required
                                    autoFocus
                                    autoComplete="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    placeholder="Deskripsi Kerusakan ..."
                                />
                                <InputError message={errors.deskripsi} />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    )
}

export default CreateKerusakan;