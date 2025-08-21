import { Outlet } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-white bg-amber-500">
      <div className="flex">
        <aside className="w-64 bg-primary text-primary-foreground p-6">
          <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            <a href="/admin" className="block p-2 rounded hover:bg-primary-foreground/10">Dashboard</a>
            <a href="/admin/contacts" className="block p-2 rounded hover:bg-primary-foreground/10">Contacts</a>
            <a href="/admin/quotes" className="block p-2 rounded hover:bg-primary-foreground/10">Quotes</a>
            <a href="/admin/blogs" className="block p-2 rounded hover:bg-primary-foreground/10">Blogs</a>
            <a href="/admin/portfolio" className="block p-2 rounded hover:bg-primary-foreground/10">Portfolio</a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}