import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Kerusakan, User } from "@/types";


type DashboardCardListProps =
  | { title: string; type: "teknisi"; items: User[] }
  | { title: string; type: "kerusakan"; items: Kerusakan[] };

const DashboardCardList = ({ title, type, items }: DashboardCardListProps) => {

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
      {items.map((item) => {
  if (type === "teknisi") {
    const teknisi = item as User; // ✅ TypeScript tau ini User
    return (
      <Card key={teknisi.id} className="flex-row items-center justify-between gap-4 p-4">
        <div className="w-12 h-12 rounded-sm relative overflow-hidden">
          <img
            src={teknisi.avatar || "/user.png"}
            alt={teknisi.name}
            className="object-cover size-full w-full h-full"
          />
        </div>
        <CardContent className="flex-1 p-0">
          <CardTitle className="text-sm font-medium">{teknisi.name}</CardTitle>
          <Badge variant="outline">{teknisi.email}</Badge>
        </CardContent>
      </Card>
    );
  } else {
    const kerusakan = item as Kerusakan; // ✅ TypeScript tau ini Kerusakan
    return (
      <Card key={kerusakan.id} className="flex-row items-center justify-between gap-4 p-4">
        <div className="w-12 h-12 rounded-sm relative overflow-hidden">
          <img
            src="/user.png"
            alt={kerusakan.deskripsi}
            className="object-cover size-full w-full h-full"
          />
        </div>
        <CardContent className="flex-1 p-0">
          <CardTitle className="text-sm font-medium">Mesin #{kerusakan.mesin_id}</CardTitle>
          <Badge variant='secondary'>
            Dilaporkan: {new Date(kerusakan.waktu_lapor).toLocaleDateString()}
          </Badge>
        </CardContent>
        {/* <CardFooter className="p-0 text-xs text-muted-foreground">{kerusakan.status}</CardFooter> */}
      </Card>
    );
  }
})}
      </div>
    </div>
  );
};

export default DashboardCardList;
