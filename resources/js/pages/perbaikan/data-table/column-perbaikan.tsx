import { Button } from "@/components/ui/button"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, RailSymbol, Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import UpdatePerbaikan from "@/components/form-edit-perbaikan"


type Perbaikan = {
  id: string
  kerusakan_id: string
  teknisi_id: string
  tindakan: string
  sparepart: string
  waktu_mulai: string
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
  },
  {
    accessorKey: "waktu_selesai",
    header: "waktu Selesai",
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
                <RailSymbol  />
              </Button>
            </SheetTrigger>
            <UpdatePerbaikan perbaikan={perbaikan} />
          </Sheet>
        </div>
      )
    }
  },
]