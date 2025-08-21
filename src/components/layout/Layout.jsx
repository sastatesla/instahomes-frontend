import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}