import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button  from "@/components/ui/Button";
import { formatTime } from "@/utils/format";

interface Swimmer {
  id: string;
  nombre: string;
  laps: number[]; // Tiempos en milisegundos
}

interface SwimmersTableProps {
  swimmers: Swimmer[];
  onLapRecorded: (swimmerId: string) => void;
}

const TimmerTable = ({ swimmers, onLapRecorded }: SwimmersTableProps)=> {
  // Encuentra el máximo de vueltas para definir columnas
  const maxLaps = Math.max(...swimmers.map(s => s.laps.length), 0);

//   // Formatea milisegundos a mm:ss.SSS
//   const formatTime = (ms: number) => {
//     const date = new Date(ms);
//     return date.toISOString().substr(14, 9);
//   };

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Columna fija (nombre) */}
                <TableHead className="sticky left-0 bg-background z-10 min-w-[150px]">
                  Nadador
                </TableHead>
                {/* Columnas dinámicas de vueltas */}
                {Array.from({ length: maxLaps }).map((_, i) => (
                  <TableHead key={`lap-${i}`} className="text-center">
                    Lap {i + 1}
                  </TableHead>
                ))}
                {/* Columna para agregar nueva vuelta */}
                {/* {<TableHead className="text-center">Tiempo Total</TableHead>} */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {swimmers.map((swimmer) => (
                <TableRow key={swimmer.id}>
                  {/* Celda de nombre (fija) */}
                  <TableCell className="sticky left-0 bg-background z-10 font-medium">
                  <Button
                      size="sm"
                      onClick={() => onLapRecorded(swimmer.id)}
                    >
                     {swimmer.nombre}
                    </Button>
                  </TableCell>
                  {/* Celdas de vueltas */}
                  {Array.from({ length: maxLaps }).map((_, i) => (
                    <TableCell key={`${swimmer.id}-lap-${i}`} className="text-center">
                      {swimmer.laps[i] ? formatTime(swimmer.laps[i]) : "-"}
                    </TableCell>
                  ))}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
export default TimmerTable;