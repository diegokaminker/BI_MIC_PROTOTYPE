import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { getRouteMeta } from '../theme/routes'

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/sensibilidad', label: 'Sensibilidad acumulada' },
  { to: '/mecanismos', label: 'Mecanismos de resistencia' },
  { to: '/tendencia-mdro', label: 'Tendencia MDRO' },
  { to: '/virus-respiratorios', label: 'Virus respiratorios' },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const meta = getRouteMeta(location.pathname)

  return (
    <div className={`app-layout${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo" aria-hidden="true" />
          <div className="sidebar-brand-text">
            <strong>R.E.A.L</strong>
            <span>Microbiology Workflow Management System</span>
          </div>
        </div>

        <div className="sidebar-search">
          <input type="search" placeholder="Buscar" aria-label="Buscar en menú" />
          <button type="button" className="btn-icon" aria-label="Buscar">
            ⌕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Reportes</div>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <div className="main-wrapper">
        <header className="topbar">
          <button
            type="button"
            className="btn-menu"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Menú"
          >
            ☰
          </button>
          <nav className="breadcrumbs" aria-label="Ruta de navegación">
            {meta.breadcrumb.map((part, i) => (
              <span key={part}>
                {i > 0 && <span className="breadcrumb-sep">/</span>}
                <span className={i === meta.breadcrumb.length - 1 ? 'breadcrumb-current' : ''}>
                  {part}
                </span>
              </span>
            ))}
          </nav>
          <div className="topbar-user">
            <span className="topbar-user-icon" aria-hidden="true">👤</span>
            <span>Usuario demo</span>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
