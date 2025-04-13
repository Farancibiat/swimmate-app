import { useSwimStore } from "@/store/useSwimStore";



export const TrainningSession = () => {
  const {user} =useSwimStore();

  
  
  return (
    
      <section>
        <h1>Hola {`${user?.name.toLocaleUpperCase}`!} </h1>
        {/* Datos Generales de Entrenamiento:
        - Aguas Abiertas / Piscina
        - Distancia / Tamaños
        - Agregar Nadadores
        - Ir a Cronómetro */}

        </section>

    
  )
}
