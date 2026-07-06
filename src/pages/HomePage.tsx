import { Link } from 'react-router-dom'

const dashboards = [
  {
    to: '/sensibilidad',
    title: 'Sensibilidad acumulada',
    description:
      'Principales patógenos aislados y porcentaje de sensibilidad/no sensibilidad por antibiótico y microorganismo.',
  },
  {
    to: '/mecanismos',
    title: 'Mecanismos de resistencia',
    description:
      'Clasificación de carbapenemasas y mecanismos de resistencia identificados por microorganismo.',
  },
  {
    to: '/tendencia-mdro',
    title: 'Tendencia de gérmenes resistentes',
    description:
      'Visualización temporal de microorganismos multirresistentes (MDRO) con umbral configurable.',
  },
  {
    to: '/virus-respiratorios',
    title: 'Virus respiratorios',
    description:
      'Tendencia de patógenos respiratorios y porcentaje de positividad por virus testeado.',
  },
]

export default function HomePage() {
  return (
    <>
      <div className="page-header">
        <h2>Dashboards REAL</h2>
        <p>
          Plataforma de Business Intelligence para análisis microbiológico.
          Seleccione un dashboard para comenzar.
        </p>
      </div>
      <div className="home-grid">
        {dashboards.map((d) => (
          <Link key={d.to} to={d.to} className="home-card">
            <h3>{d.title}</h3>
            <p>{d.description}</p>
            <span className="link">Abrir dashboard →</span>
          </Link>
        ))}
      </div>
    </>
  )
}
