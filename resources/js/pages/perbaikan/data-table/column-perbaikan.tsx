import EditMesin from "@/components/form-edit-mesin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import { router, useForm } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"

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
    accessorKey: "kerusakan_id",
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
    header: "waktu_mulai",
  },
  {
    accessorKey: "actions",
    header: "Action",
  },
]