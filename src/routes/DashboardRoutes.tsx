
import { Route, Routes } from 'react-router-dom'
import { TrainningSession } from '@/pages/TrainningSession/TrainningSession'

export const DashboardRoutes = () => {


  return (
    <Routes>
    <Route path="/" element={<></>} />
    <Route path="/session" element={<TrainningSession/>} />

  </Routes>
  )
}
