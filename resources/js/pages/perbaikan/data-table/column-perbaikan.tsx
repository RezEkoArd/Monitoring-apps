  import { Button } from "@/components/ui/button"
  import { router, useForm } from "@inertiajs/react"
  import { ColumnDef } from "@tanstack/react-table"
  import { Cog } from "lucide-react"
  import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import UpdatePerbaikan from "@/components/form-edit-perbaikan"
import dayjs from "@/utils/dayjs"

  type Perbaikan = {
    id: string
    kerusakan_id: string
    teknisi_id: string
    tindakan: string
    sparepart: string
    waktu_mulai: string
    waktu_selesai?: string
    catatan?: string
  }
    

  export const columnsPerbaikan: ColumnDef<Perbaikan>[] = [
    {
      accessorKey: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "kerusakan.kode_kerusakan",
      header: "Kerusakan ID",
    }, 
    {
      accessorKey: "teknisi.name",
      header: "Nama Teknisi",
    },
    {
      accessorKey: "tindakan",
      header: "Deskripsi",
    },
    {
      accessorKey: "sparepart",
      header: "sparepart",
    },
    {
      accessorKey: "waktu_mulai",
      header: "Waktu Mulai",
      cell: ({ row }) => {
        const date = row.original.waktu_mulai
        return date ? dayjs(date).fromNow() : "-"
      },
    },
    {
      accessorKey: "waktu_selesai",
      header: "Waktu Selesai",
      cell: ({ row }) => {
        const date = row.original.waktu_selesai
        return date ? dayjs(date).fromNow() : "-"
      },
    },
    {
      accessorKey: "actions",
      header: "Action",
      cell: ({ row }) => {
        const perbaikan = row.original
        

        return (
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" >
                  <Cog  />
                </Button>
              </SheetTrigger>
              <UpdatePerbaikan perbaikan={perbaikan} />
            </Sheet>
          </div>
        )
      }
    },
  ]