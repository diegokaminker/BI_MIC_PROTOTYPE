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
import PageShell from '../components/PageShell'
import { tendenciaMDRO } from '../data/mockData'
import { REAL_CHART_COLORS, REAL_PRIMARY } from '../theme/chartColors'

const GRID_STROKE = '#e0e0e0'

const mdroKeys = ['MRSA', 'CRE', 'Pae-MDR', 'Aba-MDR', 'VRE']

export default function TendenciaMDRODashboard() {
  return (
    <PageShell
      title="Dashboard de tendencia de gérmenes resistentes"
      subtitle="Visualización de microorganismos multirresistentes (MDRO) en el período seleccionado."
    >
      <div className="card">
        <div className="card-title">Tendencia de MDRO por período</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tendenciaMDRO} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <ReferenceArea y1={8} y2={12} fill={REAL_PRIMARY} fillOpacity={0.12} />
              <XAxis dataKey="periodo" tick={{ fontSize: 12, fill: '#757575' }} />
              <YAxis
                label={{ value: 'N° de aislamientos', angle: -90, position: 'insideLeft', offset: 10 }}
                tick={{ fontSize: 12, fill: '#757575' }}
              />
              <Tooltip />
              <Legend />
              {mdroKeys.map((key, i) => (
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
        <p className="legend-note">
          Franja verde: umbral esperado configurable · Cada color representa un MDRO diferente
        </p>
      </div>

      <div className="card">
        <div className="card-title">Definiciones MDRO incluidas</div>
        <table className="real-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Microorganismo</th>
              <th>Criterio</th>
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
              <tr key={row.codigo}>
                <td style={{ fontWeight: 600 }}>{row.codigo}</td>
                <td>{row.mo}</td>
                <td style={{ color: 'var(--color-text-muted)' }}>{row.criterio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FilterPanel showGranularidad />
    </PageShell>
  )
}
