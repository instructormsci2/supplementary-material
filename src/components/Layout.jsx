import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/training-pairs', label: 'Training Pairs' },
  { path: '/story-prompts', label: 'Story Prompts' },
  { path: '/generated-stories', label: 'Generated Stories' },
  { path: '/evaluator-prompts', label: 'LLM Evaluator Prompts' },
  { path: '/analysis', label: 'Analysis' },
  { path: '/mistral', label: 'Mistral 7B Replication' },
]

function Layout() {
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Supplementary Material</h2>
        </div>
        <ul className="nav-list">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
