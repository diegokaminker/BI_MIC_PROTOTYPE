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
import { carbapenemasas, mecanismosPorMO } from '../data/mockData'

const MECANISMO_COLORS = ['#0f4c81', '#0d9488', '#d97706', '#7c3aed']

export default function MecanismosDashboard() {
  const [vista, setVista] = useState<'carbapenemasas' | 'porMO'>('carbapenemasas')

  const chartCarba = carbapenemasas.map((c) => ({
    ...c,
    label: `${c.porcentaje}% (n=${c.n})`,
  }))

  return (
    <>
      <div className="page-header">
        <h2>Dashboard de mecanismos de resistencia</h2>
        <p>
          Clasificación de carbapenemasas y mecanismos identificados por microorganismo.
        </p>
      </div>

      <div className="view-tabs">
        <button
          className={`view-tab${vista === 'carbapenemasas' ? ' active' : ''}`}
          onClick={() => setVista('carbapenemasas')}
        >
          A — Clasificación de carbapenemasas
        </button>
        <button
          className={`view-tab${vista === 'porMO' ? ' active' : ''}`}
          onClick={() => setVista('porMO')}
        >
          B — Mecanismos por microorganismo
        </button>
      </div>

      {vista === 'carbapenemasas' ? (
        <div className="card">
          <div className="card-title">
            Contribución porcentual de cada mecanismo de resistencia detectado
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartCarba} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mecanismo" tick={{ fontSize: 12 }} />
                <YAxis
                  label={{ value: '% del total', angle: -90, position: 'insideLeft', offset: 10 }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number, _name: string, props) => [
                    `${value}% (n=${props.payload.n})`,
                    'Porcentaje',
                  ]}
                />
                <Bar dataKey="porcentaje" fill="#0f4c81" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="label" position="top" style={{ fontSize: 11 }} />
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="microorganismo"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  label={{ value: 'N° de cepas', angle: -90, position: 'insideLeft', offset: 10 }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="blaKPC" name="blaKPC" fill={MECANISMO_COLORS[0]} stackId="a" />
                <Bar dataKey="blaNDM" name="blaNDM" fill={MECANISMO_COLORS[1]} stackId="a" />
                <Bar dataKey="oxa48" name="OXA-48" fill={MECANISMO_COLORS[2]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <FilterPanel />
    </>
  )
}
