
import { Route, Routes } from 'react-router-dom'
import { TrainningSession } from '@/pages/TrainningSession/TrainningSession'

export const DashboardRoutes = () => {


  return (
    <Routes>
    <Route path="/" element={<>Aquí van los datos generales y dashboard de datos quizás. Por definir</>} />
    <Route path="/nadadores" element={<>Pendiente: Crear vista de nadadores, con data general y posibilidad de edición, invitar, etc.</>} />
    <Route path="/session" element={<TrainningSession/>} />

  </Routes>
  )
}
