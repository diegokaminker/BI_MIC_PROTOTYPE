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
import { patogenosPrincipales, sensibilidadPorAntibiotico } from '../data/mockData'

const COLORS = ['#0f4c81', '#1a6bb5', '#0d9488', '#d97706']

export default function SensibilidadDashboard() {
  const [vista, setVista] = useState<'patogenos' | 'sensibilidad'>('patogenos')

  const chartDataPatogenos = patogenosPrincipales.map((p) => ({
    nombre: p.nombre,
    porcentaje: p.porcentaje,
    n: p.n,
    label: `${p.porcentaje}% (n=${p.n})`,
  }))

  return (
    <>
      <div className="page-header">
        <h2>Dashboard de sensibilidad acumulada</h2>
        <p>
          Análisis de patógenos aislados y porcentaje de sensibilidad por antibiótico.
          Estados incluidos: Informe final ingresado e Informe final impreso.
        </p>
      </div>

      <div className="alert-warning">
        CLSI M39 recomienda un mínimo de 30 aislamientos para análisis de sensibilidad acumulada.
        Resultados con n &lt; 30 se consideran inestables y deben interpretarse con precaución.
      </div>

      <div className="view-tabs">
        <button
          className={`view-tab${vista === 'patogenos' ? ' active' : ''}`}
          onClick={() => setVista('patogenos')}
        >
          A — Principales patógenos aislados
        </button>
        <button
          className={`view-tab${vista === 'sensibilidad' ? ' active' : ''}`}
          onClick={() => setVista('sensibilidad')}
        >
          B — % No sensibilidad por antibiótico
        </button>
      </div>

      {vista === 'patogenos' ? (
        <div className="card">
          <div className="card-title">
            Contribución porcentual de cada microorganismo respecto del total
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartDataPatogenos} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="nombre"
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="antibiotico" tick={{ fontSize: 12 }} />
                <YAxis
                  label={{ value: '%NS', angle: -90, position: 'insideLeft', offset: 10 }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value: number) => [`${value}%`, '%NS']} />
                <Legend />
                <Bar dataKey="S. aureus" fill={COLORS[0]} />
                <Bar dataKey="E. coli" fill={COLORS[1]} />
                <Bar dataKey="K. pneumoniae" fill={COLORS[2]} />
                <Bar dataKey="P. aeruginosa" fill={COLORS[3]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="legend-note">
            %NS = (n° cepas NS / n° cepas totales testeadas) × 100
          </p>
        </div>
      )}

      <FilterPanel showAntibiotico showExpresion />
    </>
  )
}
