import { useState } from 'react'
import { Filtros, filtrosIniciales, opcionesSitio, opcionesOrigen } from '../data/mockData'

interface FilterPanelProps {
  onApply?: (filtros: Filtros) => void
  showAntibiotico?: boolean
  showExpresion?: boolean
  showGranularidad?: boolean
}

const granularidades = ['día', 'semana', 'mes', 'trimestre', 'semestre', 'año']
const criteriosDuplicados = [
  { value: 'todos', label: 'Todos los aislamientos' },
  { value: 'primer_aislamiento_30d', label: 'Primer aislamiento cada 30 días' },
  { value: 'primer_aislamiento', label: 'Primer aislamiento' },
]

function formatFecha(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function FilterPanel({
  onApply,
  showAntibiotico = false,
  showExpresion = false,
  showGranularidad = false,
}: FilterPanelProps) {
  const [abierto, setAbierto] = useState(false)
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciales)
  const [filtrosActivos, setFiltrosActivos] = useState<Filtros | null>(null)

  const handleApply = () => {
    setFiltrosActivos(filtros)
    onApply?.(filtros)
    setAbierto(false)
  }

  const handleLimpiar = () => {
    setFiltros(filtrosIniciales)
    setFiltrosActivos(null)
    onApply?.(filtrosIniciales)
  }

  const periodoLabel = filtrosActivos
    ? `${formatFecha(filtrosActivos.fechaDesde)} – ${formatFecha(filtrosActivos.fechaHasta)}`
    : `${formatFecha(filtrosIniciales.fechaDesde)} – ${formatFecha(filtrosIniciales.fechaHasta)}`

  return (
    <div className="filter-section">
      <div className="filter-bar">
        <span className="filter-bar-period">
          Período: {periodoLabel}
          {!filtrosActivos && <span className="filter-bar-default"> · datos por defecto</span>}
        </span>
        <button
          type="button"
          className="btn btn-filter-toggle"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
        >
          {abierto ? 'Ocultar filtros' : 'Filtrar datos'}
        </button>
      </div>

      {abierto && (
        <div className="card filter-card">
          <div className="card-title">Filtros de búsqueda (opcional)</div>
          <div className="filters-panel">
            <div className="filter-group">
              <label>Fecha desde</label>
              <input
                type="date"
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>Fecha hasta</label>
              <input
                type="date"
                value={filtros.fechaHasta}
                onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>Sitio</label>
              <select
                multiple
                value={filtros.sitio}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (o) => o.value)
                  setFiltros({ ...filtros, sitio: selected })
                }}
              >
                {opcionesSitio.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Origen</label>
              <select
                multiple
                value={filtros.origen}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (o) => o.value)
                  setFiltros({ ...filtros, origen: selected })
                }}
              >
                {opcionesOrigen.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            {showAntibiotico && (
              <div className="filter-group">
                <label>Antibióticos</label>
                <select
                  multiple
                  value={filtros.antibiotico}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (o) => o.value)
                    setFiltros({ ...filtros, antibiotico: selected })
                  }}
                >
                  <option value="Meropenem">Meropenem</option>
                  <option value="Imipenem">Imipenem</option>
                  <option value="Ceftazidima">Ceftazidima</option>
                  <option value="Ciprofloxacina">Ciprofloxacina</option>
                </select>
              </div>
            )}
            {showExpresion && (
              <div className="filter-group">
                <label>Expresión de resultados</label>
                <select
                  value={filtros.expresionResultados}
                  onChange={(e) =>
                    setFiltros({ ...filtros, expresionResultados: e.target.value as '%S' | '%NS' })
                  }
                >
                  <option value="%S">% Sensibles (%S)</option>
                  <option value="%NS">% No sensibles (%NS)</option>
                </select>
              </div>
            )}
            {showGranularidad && (
              <div className="filter-group">
                <label>Granularidad temporal</label>
                <select
                  value={filtros.granularidad}
                  onChange={(e) => setFiltros({ ...filtros, granularidad: e.target.value })}
                >
                  {granularidades.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="filter-group">
              <label>Criterio de duplicados</label>
              <select
                value={filtros.criterioDuplicados}
                onChange={(e) => setFiltros({ ...filtros, criterioDuplicados: e.target.value })}
              >
                {criteriosDuplicados.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="filter-actions">
              <button type="button" className="btn btn-primary" onClick={handleApply}>
                Aplicar filtros
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleLimpiar}>
                Restablecer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
