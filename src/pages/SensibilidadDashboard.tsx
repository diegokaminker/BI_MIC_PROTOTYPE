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
import { patogenosPrincipales, sensibilidadPorAntibiotico } from '../data/mockData'
import { REAL_CHART_COLORS, CHART_PRIMARY } from '../theme/chartColors'

const GRID_STROKE = '#e0e0e0'

export default function SensibilidadDashboard() {
  const [vista, setVista] = useState<'patogenos' | 'sensibilidad'>('patogenos')

  const chartDataPatogenos = patogenosPrincipales.map((p) => ({
    nombre: p.nombre,
    porcentaje: p.porcentaje,
    n: p.n,
    label: `${p.porcentaje}% (n=${p.n})`,
  }))

  return (
    <PageShell
      title="Dashboard de sensibilidad acumulada"
      subtitle="Análisis de patógenos aislados y porcentaje de sensibilidad por antibiótico. Estados incluidos: Informe final ingresado e Informe final impreso."
    >
      <div className="alert-warning">
        CLSI M39 recomienda un mínimo de 30 aislamientos para análisis de sensibilidad acumulada.
        Resultados con n &lt; 30 se consideran inestables y deben interpretarse con precaución.
      </div>

      <div className="view-tabs">
        <button
          type="button"
          className={`view-tab${vista === 'patogenos' ? ' active' : ''}`}
          onClick={() => setVista('patogenos')}
        >
          A — Principales patógenos aislados
        </button>
        <button
          type="button"
          className={`view-tab${vista === 'sensibilidad' ? ' active' : ''}`}
          onClick={() => setVista('sensibilidad')}
        >
          B — % No sensibilidad por antibiótico
        </button>
      </div>

      <div className="view-tab-panel">
        {vista === 'patogenos' ? (
          <div className="card">
            <div className="card-title">
              Contribución porcentual de cada microorganismo respecto del total
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartDataPatogenos} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis
                    dataKey="nombre"
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 12, fill: '#757575' }}
                  />
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
              n = número de aislamientos del microorganismo · % = (n MO / n total según filtro) × 100
            </p>
          </div>
        ) : (
          <div className="card">
            <div className="card-title">
              Porcentaje de no sensibles (%NS) por antibiótico y microorganismo
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sensibilidadPorAntibiotico} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
                  <XAxis dataKey="antibiotico" tick={{ fontSize: 12, fill: '#757575' }} />
                  <YAxis
                    label={{ value: '%NS', angle: -90, position: 'insideLeft', offset: 10 }}
                    tick={{ fontSize: 12, fill: '#757575' }}
                  />
                  <Tooltip formatter={(value: number) => [`${value}%`, '%NS']} />
                  <Legend />
                  <Bar dataKey="S. aureus" fill={REAL_CHART_COLORS[0]} />
                  <Bar dataKey="E. coli" fill={REAL_CHART_COLORS[1]} />
                  <Bar dataKey="K. pneumoniae" fill={REAL_CHART_COLORS[2]} />
                  <Bar dataKey="P. aeruginosa" fill={REAL_CHART_COLORS[3]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="legend-note">
              %NS = (n° cepas NS / n° cepas totales testeadas) × 100
            </p>
          </div>
        )}
      </div>

      <FilterPanel showAntibiotico showExpresion />
    </PageShell>
  )
}
