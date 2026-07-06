import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea,
} from 'recharts'
import FilterPanel from '../components/FilterPanel'
import { tendenciaMDRO } from '../data/mockData'

const MDRO_COLORS: Record<string, string> = {
  MRSA: '#0f4c81',
  CRE: '#dc2626',
  'Pae-MDR': '#0d9488',
  'Aba-MDR': '#d97706',
  VRE: '#7c3aed',
}

const mdroKeys = Object.keys(MDRO_COLORS)

export default function TendenciaMDRODashboard() {
  return (
    <>
      <div className="page-header">
        <h2>Dashboard de tendencia de gérmenes resistentes</h2>
        <p>
          Visualización de microorganismos multirresistentes (MDRO) en el período seleccionado.
        </p>
      </div>

      <div className="card">
        <div className="card-title">Tendencia de MDRO por período</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tendenciaMDRO} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <ReferenceArea y1={8} y2={12} fill="#0d9488" fillOpacity={0.12} />
              <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />
              <YAxis
                label={{ value: 'N° de aislamientos', angle: -90, position: 'insideLeft', offset: 10 }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              {mdroKeys.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={MDRO_COLORS[key]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="legend-note">
          Franja verde: umbral esperado configurable · Cada color representa un MDRO diferente
        </p>
      </div>

      <div className="card">
        <div className="card-title">Definiciones MDRO incluidas</div>
        <table style={{ width: '100%', fontSize: '0.8125rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Código</th>
              <th style={{ padding: '0.5rem' }}>Microorganismo</th>
              <th style={{ padding: '0.5rem' }}>Criterio</th>
            </tr>
          </thead>
          <tbody>
            {[
              { codigo: 'MRSA', mo: 'Staphylococcus aureus', criterio: 'Cefoxitina u Oxacilina R' },
              { codigo: 'CRE', mo: 'Enterobacterales', criterio: 'Carbapenémico R o I' },
              { codigo: 'Pae-MDR', mo: 'Pseudomonas aeruginosa', criterio: '≥ 3/6 antibióticos R o I' },
              { codigo: 'Aba-MDR', mo: 'Acinetobacter baumannii', criterio: '≥ 3/7 antibióticos R o I' },
              { codigo: 'VRE', mo: 'Enterococcus faecalis', criterio: 'Vancomicina R' },
            ].map((row) => (
              <tr key={row.codigo} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.5rem', fontWeight: 600 }}>{row.codigo}</td>
                <td style={{ padding: '0.5rem' }}>{row.mo}</td>
                <td style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>{row.criterio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FilterPanel showGranularidad />
    </>
  )
}
