import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SensibilidadDashboard from './pages/SensibilidadDashboard'
import MecanismosDashboard from './pages/MecanismosDashboard'
import TendenciaMDRODashboard from './pages/TendenciaMDRODashboard'
import VirusRespiratoriosDashboard from './pages/VirusRespiratoriosDashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sensibilidad" element={<SensibilidadDashboard />} />
        <Route path="mecanismos" element={<MecanismosDashboard />} />
        <Route path="tendencia-mdro" element={<TendenciaMDRODashboard />} />
        <Route path="virus-respiratorios" element={<VirusRespiratoriosDashboard />} />
      </Route>
    </Routes>
  )
}
