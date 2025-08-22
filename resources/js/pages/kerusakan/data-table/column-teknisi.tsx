import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

type Kerusakan = {
  id: string
  mesin_id: string
  user_id: string
  deskripsi: string
  status: string
  waktu_lapor: string
}
  

export const columnsTeknisi: ColumnDef<Kerusakan>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "mesin.kode_mesin",
    header: "Kode Mesin",
  },
  {
    accessorKey: "user.name",
    header: "Nama Operator",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status;
        let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";

        if (status === 'dilaporkan') {
          variant = "destructive"; 
        } else if (status === 'proses') {
          variant = "default";
        } else if (status === 'selesai') {  
          variant = "outline";
        }

        return (
          <Badge variant={variant}>{status.toString()}</Badge>
        );
    },
  },
  {
    accessorKey: "waktu_lapor",
    header: "Waktu Lapor",
  },

]


