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
import PageShell from '../components/PageShell'
import { tendenciaVirus, positividadVirus } from '../data/mockData'
import { REAL_CHART_COLORS, REAL_PRIMARY } from '../theme/chartColors'

const GRID_STROKE = '#e0e0e0'
const virusKeys = ['Influenza A', 'Influenza B', 'RSV', 'SARS-CoV-2']

export default function VirusRespiratoriosDashboard() {
  const [vista, setVista] = useState<'tendencia' | 'positividad'>('tendencia')

  const chartPositividad = positividadVirus.map((v) => ({
    ...v,
    label: `${v.porcentaje}%`,
  }))

  return (
    <PageShell
      title="Dashboard de virus respiratorios"
      subtitle="Tendencia de patógenos respiratorios y porcentaje de positividad en el período seleccionado."
    >
      <div className="view-tabs">
        <button
          type="button"
          className={`view-tab${vista === 'tendencia' ? ' active' : ''}`}
          onClick={() => setVista('tendencia')}
        >
          A — Tendencia de patógenos respiratorios
        </button>
        <button
          type="button"
          className={`view-tab${vista === 'positividad' ? ' active' : ''}`}
          onClick={() => setVista('positividad')}
        >
          B — Patógenos testeados y % positividad
        </button>
      </div>

      <div className="view-tab-panel">
        {vista === 'tendencia' ? (
          <div className="card">
            <div className="card-title">Tendencia de patógenos respiratorios por período</div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tendenciaVirus} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis dataKey="periodo" tick={{ fontSize: 12, fill: '#757575' }} />
                  <YAxis
                    label={{ value: 'N° de casos', angle: -90, position: 'insideLeft', offset: 10 }}
                    tick={{ fontSize: 12, fill: '#757575' }}
                  />
                  <Tooltip />
                  <Legend />
                  {virusKeys.map((key, i) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={REAL_CHART_COLORS[i % REAL_CHART_COLORS.length]}
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
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis
                    dataKey="virus"
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11, fill: '#757575' }}
                  />
                  <YAxis
                    label={{ value: '% positividad', angle: -90, position: 'insideLeft', offset: 10 }}
                    tick={{ fontSize: 12, fill: '#757575' }}
                  />
                  <Tooltip
                    formatter={(value: number, _name: string, props) => {
                      const p = props.payload
                      return [`${value}% (${p.positivos}/${p.testeados})`, 'Positividad']
                    }}
                  />
                  <Bar dataKey="porcentaje" fill={REAL_PRIMARY} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="label" position="top" style={{ fontSize: 11, fill: '#333' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <FilterPanel showGranularidad />
    </PageShell>
  )
}
