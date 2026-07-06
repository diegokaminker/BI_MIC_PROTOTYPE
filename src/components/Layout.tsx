import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/sensibilidad', label: 'Sensibilidad acumulada' },
  { to: '/mecanismos', label: 'Mecanismos de resistencia' },
  { to: '/tendencia-mdro', label: 'Tendencia MDRO' },
  { to: '/virus-respiratorios', label: 'Virus respiratorios' },
]

export default function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>REAL</h1>
          <p>Business Intelligence</p>
        </div>
        <nav className="sidebar-nav">
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
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
