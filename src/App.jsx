import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/layout/Layout'
import { AdminLayout } from './components/admin/AdminLayout'
import { Home } from './pages/public/Home'
import { Services } from './pages/public/Services'
import { Portfolio } from './pages/public/Portfolio'
import { Blog } from './pages/public/Blog'
import { BlogPost } from './pages/public/BlogPost'
import { Contact } from './pages/public/Contact'
import { RequestQuote } from './pages/public/RequestQuote'
import { Dashboard } from './pages/admin/Dashboard'
import { AdminContacts } from './pages/admin/AdminContacts'
import { AdminQuotes } from './pages/admin/AdminQuotes'
import { BlogManagement } from './pages/admin/BlogManagement'
import { AdminPortfolio } from './pages/admin/AdminPortfolio'
import { AdminSettings } from './pages/admin/AdminSettings'
import { Login } from './pages/admin/Login'

// ✅ Import the ScrollToTop component
import { ScrollToTop } from './components/ui/ScrollToTop'

function App() {
  return (
    <AuthProvider>
      {/* ✅ Scroll to top on route change */}
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="request-quote" element={<RequestQuote />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
