import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  MessageSquare, 
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Image
} from 'lucide-react'
import { contactAPI, quoteAPI } from '../../lib/api'

const StatCard = ({ title, value, change, changeType, icon: Icon, color = "accent" }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white rounded-xl p-6 border border-border shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          {change && (
            <div className={`flex items-center text-sm ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {changeType === 'positive' && <ArrowUpRight size={16} />}
              {changeType === 'negative' && <ArrowDownRight size={16} />}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>
      <div className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}>
        <Icon size={24} className={`text-${color}`} />
      </div>
    </div>
  </motion.div>
)

const RecentActivity = ({ title, items, emptyMessage }) => (
  <div className="bg-white rounded-xl border border-border">
    <div className="p-6 border-b border-border">
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
    <div className="p-6">
      {items && items.length > 0 ? (
        <div className="space-y-4">
          {items.slice(0, 5).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name || `${item.firstName} ${item.lastName}`}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.subject || item.projectType} • {item.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'new' ? 'bg-blue-100 text-blue-700' :
                item.status === 'responded' || item.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' :
                item.status === 'completed' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {item.status}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Clock size={32} className="mx-auto mb-2 opacity-50" />
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  </div>
)

export function Dashboard() {
  const [stats, setStats] = useState({
    contacts: { total: 0, thisMonth: 0, byStatus: {} },
    quotes: { total: 0, thisMonth: 0, byStatus: {}, byProjectType: {} }
  })
  const [recentContacts, setRecentContacts] = useState([])
  const [recentQuotes, setRecentQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch stats and recent data in parallel
        const [contactStats, quoteStats, contacts, quotes] = await Promise.all([
          contactAPI.getStats().catch(() => ({ data: { total: 0, thisMonth: 0, byStatus: {} } })),
          quoteAPI.getStats().catch(() => ({ data: { total: 0, thisMonth: 0, byStatus: {}, byProjectType: {} } })),
          contactAPI.getAll({ limit: 10 }).catch(() => ({ data: { contacts: [] } })),
          quoteAPI.getAll({ limit: 10 }).catch(() => ({ data: { quotes: [] } }))
        ])

        setStats({
          contacts: contactStats.data,
          quotes: quoteStats.data
        })
        
        setRecentContacts(contacts.data?.contacts || [])
        setRecentQuotes(quotes.data?.quotes || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])


  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-8 bg-muted rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your interior design business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Contacts"
            value={stats.contacts.total}
            change={`${stats.contacts.thisMonth} this month`}
            changeType={stats.contacts.thisMonth > 0 ? 'positive' : 'neutral'}
            icon={Users}
            color="blue-600"
          />
          
          <StatCard
            title="Quote Requests"
            value={stats.quotes.total}
            change={`${stats.quotes.thisMonth} this month`}
            changeType={stats.quotes.thisMonth > 0 ? 'positive' : 'neutral'}
            icon={FileText}
            color="accent"
          />
          
          <StatCard
            title="New Inquiries"
            value={(stats.contacts.byStatus?.new || 0) + (stats.quotes.byStatus?.new?.count || 0)}
            change="Needs attention"
            changeType="neutral"
            icon={AlertCircle}
            color="yellow-600"
          />
          
          <StatCard
            title="Completed Projects"
            value={(stats.contacts.byStatus?.completed || 0) + (stats.quotes.byStatus?.completed?.count || 0)}
            change="All time"
            changeType="positive"
            icon={CheckCircle}
            color="green-600"
          />
        </div>

        {/* Project Type Breakdown */}
        {stats.quotes.byProjectType && Object.keys(stats.quotes.byProjectType).length > 0 && (
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Quote Requests by Project Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.quotes.byProjectType).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">{type.replace('-', ' ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RecentActivity
            title="Recent Contacts"
            items={recentContacts}
            emptyMessage="No contacts yet. Contact forms will appear here."
          />
          
          <RecentActivity
            title="Recent Quote Requests"
            items={recentQuotes}
            emptyMessage="No quote requests yet. Quote submissions will appear here."
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'View All Contacts', href: '/admin/contacts', icon: Users, color: 'bg-blue-500' },
              { title: 'Manage Quotes', href: '/admin/quotes', icon: FileText, color: 'bg-red-500' },
              { title: 'Write Blog Post', href: '/admin/blog/new', icon: MessageSquare, color: 'bg-green-500' },
              { title: 'Add Portfolio', href: '/admin/portfolio/new', icon: Image, color: 'bg-purple-500' }
            ].map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-muted/30 transition-all"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{action.title}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
    </div>
  )
}