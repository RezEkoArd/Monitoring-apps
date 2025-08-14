import EditMesin from "@/components/form-edit-mesin"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash, Trash2 } from "lucide-react"

type Mesin = {
  id: string
  kode_mesin: string
  nama_mesin: string
  lokasi: string
  kategori: string
}
  

export const columns: ColumnDef<Mesin>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kode_mesin",
    header: "Kode Mesin",
  },
  {
    accessorKey: "nama_mesin",
    header: "Nama Mesin",
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const mesin = row.original
      const { delete: destroy } = useForm();

      const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus Mesin "${mesin.nama_mesin}" dengan kode ${mesin.kode_mesin}?`)) {
          destroy(route('mesin.destroy', mesin.id));
        }
      }

      return (
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-red-300 hover:text-red-600"  onClick={handleDelete}
          >
              <Trash2  /> 
          </Button>
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" >
                      <Edit  />
                  </Button>
              </SheetTrigger>
            <EditMesin mesin={mesin}/>
          </Sheet>
        </div>
      )
      
    }
  },

]


