import { ColumnDef } from "@tanstack/react-table"

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
]
