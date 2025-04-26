
import { TrainingSession } from '@/pages/TrainingSession'
import { Route, Routes } from 'react-router-dom'

export const PrivateSiteRoutes = () => {


  return (
    <Routes>
    <Route path="/" element={<>Aquí van los datos generales y dashboard de datos quizás. Por definir</>} />
    <Route path="/nadadores" element={<>Pendiente: Crear vista de nadadores, con data general y posibilidad de edición, invitar, etc.</>} />
    <Route path="/session" element={<TrainingSession/>} />
    <Route path="/analytics" element={<>Pendiente: Crear vista de analytics, con data general y posibilidad de edición, invitar, etc.</>} />
    <Route path="/settings" element={<>Pendiente: Crear vista de settings, con data general y posibilidad de edición, invitar, etc.</>} />
  </Routes>
  )
}
