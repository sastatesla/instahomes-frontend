import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  X
} from 'lucide-react'
import { contactAPI } from '../../lib/api'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { cn } from '../../lib/utils'

const StatusBadge = ({ status }) => {
  const statusConfig = {
    new: { color: 'bg-blue-100 text-blue-700', label: 'New' },
    responded: { color: 'bg-yellow-100 text-yellow-700', label: 'Responded' },
    'in-progress': { color: 'bg-orange-100 text-orange-700', label: 'In Progress' },
    completed: { color: 'bg-green-100 text-green-700', label: 'Completed' }
  }

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-700', label: status }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    low: { color: 'bg-gray-100 text-gray-700', label: 'Low' },
    medium: { color: 'bg-blue-100 text-blue-700', label: 'Medium' },
    high: { color: 'bg-red-100 text-red-700', label: 'High' }
  }

  const config = priorityConfig[priority] || { color: 'bg-gray-100 text-gray-700', label: priority }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

const ContactModal = ({ contact, isOpen, onClose, onUpdate }) => {
  const [status, setStatus] = useState(contact?.status || 'new')
  const [priority, setPriority] = useState(contact?.priority || 'medium')
  const [notes, setNotes] = useState(contact?.notes || '')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async () => {
    if (!contact) return

    setIsUpdating(true)
    try {
      const response = await contactAPI.update(contact._id, {
        status,
        priority,
        notes
      })

      if (response.success) {
        onUpdate(response.data)
        onClose()
      }
    } catch (error) {
      console.error('Error updating contact:', error)
      alert('Failed to update contact')
    } finally {
      setIsUpdating(false)
    }
  }

  if (!contact) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{contact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium">{contact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="font-medium">{contact.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Project Type</label>
                  <p className="font-medium capitalize">{contact.projectType}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                <p className="font-medium">{contact.subject}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <div className="mt-2 p-4 bg-muted/30 rounded-lg">
                  <p className="whitespace-pre-wrap">{contact.message}</p>
                </div>
              </div>

              {/* Management */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  >
                    <option value="new">New</option>
                    <option value="responded">Responded</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Add internal notes..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Update Contact'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchContacts()
  }, [page, statusFilter, priorityFilter, searchTerm])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 10,
        search: searchTerm || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        priority: priorityFilter !== 'all' ? priorityFilter : undefined
      }

      const response = await contactAPI.getAll(params)
      if (response.success) {
        setContacts(response.data.contacts)
        setTotalPages(response.data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleContactUpdate = (updatedContact) => {
    setContacts(prev => 
      prev.map(contact => 
        contact._id === updatedContact._id ? updatedContact : contact
      )
    )
  }

  const handleDelete = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      const response = await contactAPI.delete(contactId)
      if (response.success) {
        setContacts(prev => prev.filter(contact => contact._id !== contactId))
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
      alert('Failed to delete contact')
    }
  }

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setShowModal(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Contacts</h1>
            <p className="text-muted-foreground">Manage contact form submissions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="responded">Responded</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-white"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading contacts...</p>
            </div>
          ) : contacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Subject</th>
                    <th className="text-left p-4 font-medium">Project</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Priority</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <motion.tr
                      key={contact._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-muted/20"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs truncate">{contact.subject}</div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize">{contact.projectType}</span>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={contact.status} />
                      </td>
                      <td className="p-4">
                        <PriorityBadge priority={contact.priority} />
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewContact(contact)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <MessageSquare size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No contacts found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={cn(
                  'px-3 py-2 rounded-lg transition-colors',
                  pageNum === page
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}
      </div>

      <ContactModal
        contact={selectedContact}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedContact(null)
        }}
        onUpdate={handleContactUpdate}
      />
    </AdminLayout>
  )
}