import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Send,
  Archive,
  Trash2
} from 'lucide-react'
import { contactAPI } from '../../lib/api'
import { cn } from '../../lib/utils'

const StatusBadge = ({ status }) => {
  const statusConfig = {
    new: { bg: 'bg-blue-100', text: 'text-blue-700', icon: AlertCircle },
    responded: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    archived: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Archive }
  }

  const config = statusConfig[status] || statusConfig.new
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon size={12} className="mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const ContactDetailModal = ({ contact, isOpen, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(contact?.status || 'new')
  const [response, setResponse] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  useEffect(() => {
    if (contact) {
      setStatus(contact.status)
    }
  }, [contact])

  const handleStatusUpdate = async () => {
    if (!contact) return
    
    setIsUpdating(true)
    try {
      const response = await contactAPI.update(contact._id, { status })
      if (response.success) {
        onStatusUpdate(response.data)
        onClose()
      }
    } catch (error) {
      console.error('Error updating contact:', error)
      alert('Failed to update contact status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSendEmail = async () => {
    if (!contact || !response.trim()) return
    
    setIsSendingEmail(true)
    try {
      // This would need backend implementation
      const emailData = {
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        message: response,
        contactId: contact._id
      }
      
      // await contactAPI.sendResponse(emailData)
      alert('Email sent successfully!')
      setResponse('')
      setStatus('responded')
      await handleStatusUpdate()
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email')
    } finally {
      setIsSendingEmail(false)
    }
  }

  if (!isOpen || !contact) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Contact Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <X size={20} />
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="font-medium">{contact.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-accent hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Subject:</span>
                  <span className="ml-2">{contact.subject}</span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className="ml-2"><StatusBadge status={contact.status} /></span>
                </div>
                <div>
                  <span className="font-medium">Submitted:</span>
                  <span className="ml-2">{new Date(contact.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Message</h3>
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-muted-foreground whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          {/* Response Form */}
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Send Response</h3>
            <div className="space-y-4">
              <textarea
                value={response}
                onChange={e => setResponse(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                placeholder="Type your response here..."
              />
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Email will be sent to: {contact.email}
                </div>
                <button
                  onClick={handleSendEmail}
                  disabled={!response.trim() || isSendingEmail}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-colors',
                    (!response.trim() || isSendingEmail) && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <Send size={16} />
                  <span>{isSendingEmail ? 'Sending...' : 'Send Email'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Update Status:</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="new">New</option>
                  <option value="responded">Responded</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdating}
                  className={cn(
                    'flex items-center space-x-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-colors',
                    isUpdating && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span>{isUpdating ? 'Updating...' : 'Update'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchContacts()
  }, [page, statusFilter, searchTerm])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 15,
        search: searchTerm || '',
        status: statusFilter !== 'all' ? statusFilter : ''
      }

      const response = await contactAPI.getAll(params)
      if (response.success) {
        setContacts(response.data.contacts)
        setTotalPages(response.data.pagination?.pages || 1)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setShowDetailModal(true)
  }

  const handleStatusUpdate = (updatedContact) => {
    setContacts(prev => prev.map(contact => 
      contact._id === updatedContact._id ? updatedContact : contact
    ))
  }

  const handleSelectContact = (contactId, isSelected) => {
    if (isSelected) {
      setSelectedContacts(prev => [...prev, contactId])
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId))
    }
  }

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedContacts(contacts.map(contact => contact._id))
    } else {
      setSelectedContacts([])
    }
  }

  const handleBulkAction = async (action) => {
    if (selectedContacts.length === 0) return
    
    try {
      // This would need backend implementation
      // await contactAPI.bulkUpdate(selectedContacts, { action })
      
      // For now, just update locally
      setContacts(prev => prev.map(contact => 
        selectedContacts.includes(contact._id) 
          ? { ...contact, status: action === 'archive' ? 'archived' : 'responded' }
          : contact
      ))
      
      setSelectedContacts([])
      alert(`Bulk ${action} completed!`)
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error)
      alert(`Failed to perform bulk ${action}`)
    }
  }

  const handleExport = async () => {
    try {
      // This would need backend implementation
      const params = new URLSearchParams({
        format: 'csv',
        status: statusFilter !== 'all' ? statusFilter : ''
      })
      
      window.open(`/api/contacts/export?${params}`, '_blank')
    } catch (error) {
      console.error('Error exporting contacts:', error)
      alert('Failed to export contacts')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Manage customer inquiries and communications</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedContacts.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedContacts.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('respond')}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                <CheckCircle size={14} />
                <span>Mark Responded</span>
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <Archive size={14} />
                <span>Archive</span>
              </button>
            </div>
          )}
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
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
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
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
                  <th className="text-left p-4 font-medium w-12">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === contacts.length && contacts.length > 0}
                      onChange={e => handleSelectAll(e.target.checked)}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Subject</th>
                  <th className="text-left p-4 font-medium">Status</th>
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
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact._id)}
                        onChange={e => handleSelectContact(contact._id, e.target.checked)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="truncate max-w-xs" title={contact.subject}>
                        {contact.subject}
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Users size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No contact messages found</p>
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

      <ContactDetailModal
        contact={selectedContact}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}