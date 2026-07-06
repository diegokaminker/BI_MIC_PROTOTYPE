import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts'
import FilterPanel from '../components/FilterPanel'
import { tendenciaVirus, positividadVirus } from '../data/mockData'

const VIRUS_COLORS: Record<string, string> = {
  'Influenza A': '#0f4c81',
  'Influenza B': '#1a6bb5',
  RSV: '#0d9488',
  'SARS-CoV-2': '#dc2626',
}

const virusKeys = Object.keys(VIRUS_COLORS)

export default function VirusRespiratoriosDashboard() {
  const [vista, setVista] = useState<'tendencia' | 'positividad'>('tendencia')

  const chartPositividad = positividadVirus.map((v) => ({
    ...v,
    label: `${v.porcentaje}%`,
  }))

  return (
    <>
      <div className="page-header">
        <h2>Dashboard de virus respiratorios</h2>
        <p>
          Tendencia de patógenos respiratorios y porcentaje de positividad en el período seleccionado.
        </p>
      </div>

      <div className="view-tabs">
        <button
          className={`view-tab${vista === 'tendencia' ? ' active' : ''}`}
          onClick={() => setVista('tendencia')}
        >
          A — Tendencia de patógenos respiratorios
        </button>
        <button
          className={`view-tab${vista === 'positividad' ? ' active' : ''}`}
          onClick={() => setVista('positividad')}
        >
          B — Patógenos testeados y % positividad
        </button>
      </div>

      {vista === 'tendencia' ? (
        <div className="card">
          <div className="card-title">Tendencia de patógenos respiratorios por período</div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tendenciaVirus} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />
                <YAxis
                  label={{ value: 'N° de casos', angle: -90, position: 'insideLeft', offset: 10 }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Legend />
                {virusKeys.map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={VIRUS_COLORS[key]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-title">Patógenos testeados y porcentaje de positividad</div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartPositividad} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="virus"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  label={{ value: '% positividad', angle: -90, position: 'insideLeft', offset: 10 }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number, _name: string, props) => {
                    const p = props.payload
                    return [`${value}% (${p.positivos}/${p.testeados})`, 'Positividad']
                  }}
                />
                <Bar dataKey="porcentaje" fill="#0f4c81" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="label" position="top" style={{ fontSize: 11 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <FilterPanel showGranularidad />
    </>
  )
}
