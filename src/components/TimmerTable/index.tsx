

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/Button";
import { formatTime } from "@/utils/format";

interface Swimmer {
  id: string;
  name: string;
  laps: number[]; // Tiempos en milisegundos
  total: number;
  avg: number;
}

interface SwimmersTableProps {
  swimmers: Swimmer[];
  onLapRecorded: (swimmerId: string) => void;
}

const TimmerTable = ({ swimmers, onLapRecorded }: SwimmersTableProps) => {
  // Encuentra el máximo de vueltas para definir columnas
  const maxLaps = Math.max(...swimmers.map(s => s.laps.length), 0);
  // const fixedColumnWidth = 100; // Ancho aproximado de las columnas fijas derechas

  return (
    <div className="relative w-full h-full max-h-[500px] overflow-auto border rounded-lg shadow-sm">
    <div className="sticky bottom-0 left-0 right-0 h-4 bg-background z-30"></div> {/* Fuerza la visualización del scroll */}
    
    <Table className="min-w-full">
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow>
          {/* Primera columna fija */}
          <TableHead className="sticky left-0 z-20 bg-background border-r min-w-[180px]">
            Nadador
          </TableHead>
          
          {/* Columnas de vueltas */}
          {Array.from({ length: maxLaps }).map((_, i) => (
            <TableHead key={`lap-${i}`} className="text-center min-w-[90px]">
              Vuelta {i + 1}
            </TableHead>
          ))}
          
          {/* Columnas fijas derechas - ahora juntas */}
          <TableHead className="sticky right-0 z-20 bg-background border-l text-center min-w-[200px]">
            <div className="flex">
              <span className="w-1/2 border-r">Promedio</span>
              <span className="w-1/2">Total</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {swimmers.map((swimmer,i) => (
          <TableRow key={swimmer.id}>
            {/* Primera columna fija */}
            <TableCell className="sticky left-0 z-10 bg-background border-r font-medium min-w-[180px]">
              <Button
                size="sm"
                onClick={() => onLapRecorded(swimmer.id)}
                variant={!(i%2)?'default':'secondary'}
              >
                {swimmer.name}
              </Button>
            </TableCell>
          
            {/* Columnas de vueltas */}
            {Array.from({ length: maxLaps }).map((_, i) => (
              <TableCell key={`${swimmer.id}-lap-${i}`} className="text-center font-mono min-w-[90px]">
                {swimmer.laps[i] ? formatTime(swimmer.laps[i]) : "-"}
              </TableCell>
            ))}
            
            {/* Columnas fijas derechas - ahora en un solo contenedor */}
            <TableCell className="sticky right-0 z-10 bg-background border-l font-mono min-w-[200px]">
              <div className="flex">
                <span className="w-1/2 text-center border-r">
                  {formatTime(swimmer.avg)}
                </span>
                <span className="w-1/2 text-center font-bold">
                  {formatTime(swimmer.total)}
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  );
}

export default TimmerTable;