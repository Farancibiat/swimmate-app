import Button from '@/components/ui/Button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  DEFAULT_POOL_LENGTHS,
  PoolLength,
  PoolUnit,
  PoolUnitLabels,
  SessionType,
  SessionTypeLabels,
  SwimmingStyle,
  SwimmingStyleLabels,
  AquaticDiscipline,
  AquaticDisciplineLabels,
} from '@/constants/swimming';
import { useTrainingSession } from '../hooks/useTrainingSession';

const TSettingsView: React.FC = () => {
  const { TrainingSessionConfig, setTrainingSessionConfig, handleConfigSubmit } = useTrainingSession();

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Configurar Sesión de Entrenamiento</h2>
        {/* <Button variant="outline" onClick={() => window.history.back()}>
          Volver
        </Button> */}
      </div>

      <div className="grid gap-6">
        <Card className="border">
          <CardContent className="pt-6">
            <form onSubmit={handleConfigSubmit} className="space-y-6">
              {/* Primera línea: Disciplina */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-full">
                  <Label className="text-xs font-medium text-muted-foreground tracking-wider">Disciplina</Label>
                  <Select
                    value={TrainingSessionConfig?.discipline}
                    onValueChange={(value: AquaticDiscipline) =>
                      setTrainingSessionConfig({
                        ...TrainingSessionConfig,
                        discipline: value,
                        // Reset related fields when discipline changes
                        poolLength: value === AquaticDiscipline.POOL_SWIMMING ? 25 : undefined,
                        totalDistance: value === AquaticDiscipline.OPEN_WATER ? 0 : undefined,
                        lapsCount: value === AquaticDiscipline.OPEN_WATER ? 1 : undefined,
                        lapLength: value === AquaticDiscipline.OPEN_WATER ? 0 : undefined,
                      })
                    }
                  >
                    <SelectTrigger className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <SelectValue placeholder="Selecciona disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AquaticDisciplineLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Segunda línea: Detalles del Recinto */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-full mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground tracking-wider">
                    Características de la locación{' '}
                  </h3>
                </div>
                {TrainingSessionConfig?.discipline === AquaticDiscipline.POOL_SWIMMING && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground tracking-wider">
                        Largo de Piscina
                      </Label>
                      <Select
                        value={TrainingSessionConfig?.poolLength?.toString()}
                        onValueChange={(value) =>
                          setTrainingSessionConfig({
                            ...TrainingSessionConfig,
                            poolLength: Number(value) as PoolLength,
                          })
                        }
                      >
                        <SelectTrigger className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <SelectValue placeholder="Selecciona largo" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEFAULT_POOL_LENGTHS.map((length) => (
                            <SelectItem key={length} value={length.toString()}>
                              {length}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground tracking-wider">Unidad</Label>
                      <Select
                        value={TrainingSessionConfig?.poolUnit}
                        onValueChange={(value: PoolUnit) =>
                          setTrainingSessionConfig({ ...TrainingSessionConfig, poolUnit: value })
                        }
                      >
                        <SelectTrigger className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          <SelectValue placeholder="Selecciona unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(PoolUnitLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground tracking-wider">
                        Número de Vueltas
                      </Label>
                      <Input
                        type="number"
                        value={TrainingSessionConfig?.lapsCount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTrainingSessionConfig({
                            ...TrainingSessionConfig,
                            lapsCount: Number(e.target.value),
                          })
                        }
                        min={1}
                        step={1}
                        className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Número de vueltas"
                      />
                    </div>
                  </>
                )}

                {TrainingSessionConfig?.discipline === AquaticDiscipline.OPEN_WATER && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground tracking-wider">
                        Distancia Total (kms)
                      </Label>
                      <Input
                        type="number"
                        value={TrainingSessionConfig?.totalDistance}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTrainingSessionConfig({
                            ...TrainingSessionConfig,
                            totalDistance: Number(e.target.value),
                          })
                        }
                        min={0}
                        step={0.01}
                        className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Distancia en km"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground tracking-wider">
                        Número de Vueltas
                      </Label>
                      <Input
                        type="number"
                        value={TrainingSessionConfig?.lapsCount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTrainingSessionConfig({
                            ...TrainingSessionConfig,
                            lapsCount: Number(e.target.value),
                            // Resetear lapLength si cambia el número de vueltas
                            lapLength: Number(e.target.value) > 1 ? TrainingSessionConfig?.lapLength || 0 : undefined,
                          })
                        }
                        min={1}
                        step={1}
                        className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Número de vueltas"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Tercera línea: Detalles de Entrenamiento */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-full mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground tracking-wider">
                    Detalles de Entrenamiento
                  </h3>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground tracking-wider">Estilo</Label>
                  <Select
                    value={TrainingSessionConfig?.style}
                    onValueChange={(value: SwimmingStyle) =>
                      setTrainingSessionConfig({ ...TrainingSessionConfig, style: value })
                    }
                  >
                    <SelectTrigger className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <SelectValue placeholder="Selecciona estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SwimmingStyleLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground tracking-wider">Tipo de Sesión</Label>
                  <Select
                    value={TrainingSessionConfig?.sessionType}
                    onValueChange={(value: SessionType) =>
                      setTrainingSessionConfig({ ...TrainingSessionConfig, sessionType: value })
                    }
                  >
                    <SelectTrigger className="h-10 text-sm rounded-md border-input bg-transparent px-3 py-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SessionTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="submit" size="lg">
                  Seleccionar Nadadores
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TSettingsView;
