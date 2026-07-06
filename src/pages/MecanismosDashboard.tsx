import { useState } from 'react'
import {
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
import { carbapenemasas, mecanismosPorMO } from '../data/mockData'
import { REAL_CHART_COLORS, CHART_PRIMARY } from '../theme/chartColors'

const GRID_STROKE = '#e0e0e0'

export default function MecanismosDashboard() {
  const [vista, setVista] = useState<'carbapenemasas' | 'porMO'>('carbapenemasas')

  const chartCarba = carbapenemasas.map((c) => ({
    ...c,
    label: `${c.porcentaje}% (n=${c.n})`,
  }))

  return (
    <PageShell
      title="Dashboard de mecanismos de resistencia"
      subtitle="Clasificación de carbapenemasas y mecanismos identificados por microorganismo."
    >
      <div className="view-tabs">
        <button
          type="button"
          className={`view-tab${vista === 'carbapenemasas' ? ' active' : ''}`}
          onClick={() => setVista('carbapenemasas')}
        >
          A — Clasificación de carbapenemasas
        </button>
        <button
          type="button"
          className={`view-tab${vista === 'porMO' ? ' active' : ''}`}
          onClick={() => setVista('porMO')}
        >
          B — Mecanismos por microorganismo
        </button>
      </div>

      <div className="view-tab-panel">
        {vista === 'carbapenemasas' ? (
          <div className="card">
            <div className="card-title">
              Contribución porcentual de cada mecanismo de resistencia detectado
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartCarba} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis dataKey="mecanismo" tick={{ fontSize: 12, fill: '#757575' }} />
                  <YAxis
                    label={{ value: '% del total', angle: -90, position: 'insideLeft', offset: 10 }}
                    tick={{ fontSize: 12, fill: '#757575' }}
                  />
                  <Tooltip
                    formatter={(value: number, _name: string, props) => [
                      `${value}% (n=${props.payload.n})`,
                      'Porcentaje',
                    ]}
                  />
                  <Bar dataKey="porcentaje" fill={CHART_PRIMARY} radius={[2, 2, 0, 0]}>
                    <LabelList dataKey="label" position="top" style={{ fontSize: 11, fill: '#333' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="legend-note">
              % mec. R = (n° cepas con mecanismo detectado / n° cepas totales con carbapenemasa) × 100
            </p>
          </div>
        ) : (
          <div className="card">
            <div className="card-title">
              Mecanismos de resistencia identificados por microorganismo
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mecanismosPorMO} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis
                    dataKey="microorganismo"
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11, fill: '#757575' }}
                  />
                  <YAxis
                    label={{ value: 'N° de cepas', angle: -90, position: 'insideLeft', offset: 10 }}
                    tick={{ fontSize: 12, fill: '#757575' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="blaKPC" name="blaKPC" fill={REAL_CHART_COLORS[0]} stackId="a" />
                  <Bar dataKey="blaNDM" name="blaNDM" fill={REAL_CHART_COLORS[1]} stackId="a" />
                  <Bar dataKey="oxa48" name="OXA-48" fill={REAL_CHART_COLORS[2]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <FilterPanel />
    </PageShell>
  )
}
