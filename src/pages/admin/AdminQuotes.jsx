import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  FileIcon,
  X,
  MessageCircle
} from 'lucide-react'
import { quoteAPI } from '../../lib/api'
import { cn } from '../../lib/utils'

const StatusBadge = ({ status }) => {
  const statusConfig = {
    new: { bg: 'bg-blue-100', text: 'text-blue-700', icon: AlertCircle },
    reviewed: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    quoted: { bg: 'bg-purple-100', text: 'text-purple-700', icon: DollarSign },
    completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', icon: X }
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

const QuoteDetailModal = ({ quote, isOpen, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(quote?.status || 'new')
  const [notes, setNotes] = useState(quote?.notes || '')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (quote) {
      setStatus(quote.status)
      setNotes(quote.notes || '')
    }
  }, [quote])

  const handleStatusUpdate = async () => {
    if (!quote) return
    
    setIsUpdating(true)
    try {
      const response = await quoteAPI.update(quote._id, { status, notes })
      if (response.success) {
        onStatusUpdate(response.data)
        onClose()
      }
    } catch (error) {
      console.error('Error updating quote:', error)
      alert('Failed to update quote')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleFileDownload = async (filename) => {
    try {
      // This would need backend implementation
      window.open(`/api/quotes/${quote._id}/files/${filename}`, '_blank')
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download file')
    }
  }

  if (!isOpen || !quote) return null

  return (
    <AnimatePresence>
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
          className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Quote Request Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6 ">
            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-3">Client Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-muted-foreground" />
                  <span className="font-medium">{quote.firstName} {quote.lastName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <span>{quote.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span>{quote.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{quote.address}</span>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg mb-3">Project Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Project Type:</span>
                  <span className="ml-2 capitalize">{quote.projectType?.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="font-medium">Budget:</span>
                  <span className="ml-2">{quote.budget}</span>
                </div>
                <div>
                  <span className="font-medium">Timeline:</span>
                  <span className="ml-2">{quote.timeline}</span>
                </div>
                <div>
                  <span className="font-medium">Square Footage:</span>
                  <span className="ml-2">{quote.squareFootage} sq ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Project Description</h3>
            <p className="text-muted-foreground p-4 bg-muted/30 rounded-lg">
              {quote.description}
            </p>
          </div>

          {/* Files */}
          {quote.files && quote.files.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Attached Files</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quote.files.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => handleFileDownload(file.filename)}
                    className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <FileIcon size={16} className="text-muted-foreground" />
                    <span className="text-sm truncate">{file.originalname}</span>
                    <Download size={14} className="text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status Update */}
          <div className="border-t border-border pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="quoted">Quoted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="text-sm text-muted-foreground">
                  <div>Created: {new Date(quote.createdAt).toLocaleString()}</div>
                  {quote.updatedAt && (
                    <div>Updated: {new Date(quote.updatedAt).toLocaleString()}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Internal Notes</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                placeholder="Add internal notes about this quote request..."
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function AdminQuotes() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [projectTypeFilter, setProjectTypeFilter] = useState('all')
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchQuotes()
  }, [page, statusFilter, projectTypeFilter, searchTerm])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 15,
        search: searchTerm || '',
        status: statusFilter !== 'all' ? statusFilter : '',
        projectType: projectTypeFilter !== 'all' ? projectTypeFilter : ''
      }

      const response = await quoteAPI.getAll(params)
      if (response.success) {
        setQuotes(response.data.quotes)
        setTotalPages(response.data.pagination?.pages || 1)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewQuote = (quote) => {
    setSelectedQuote(quote)
    setShowDetailModal(true)
  }

  const handleStatusUpdate = (updatedQuote) => {
    setQuotes(prev => prev.map(quote => 
      quote._id === updatedQuote._id ? updatedQuote : quote
    ))
  }

  const handleExport = async () => {
    try {
      // This would need backend implementation
      const params = new URLSearchParams({
        format: 'csv',
        status: statusFilter !== 'all' ? statusFilter : '',
        projectType: projectTypeFilter !== 'all' ? projectTypeFilter : ''
      })
      
      window.open(`/api/quotes/export?${params}`, '_blank')
    } catch (error) {
      console.error('Error exporting quotes:', error)
      alert('Failed to export quotes')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Quote Requests</h1>
          <p className="text-muted-foreground">Manage client quote requests and project inquiries</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by client name, email, or project..."
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
              <option value="reviewed">Reviewed</option>
              <option value="quoted">Quoted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={projectTypeFilter}
              onChange={e => setProjectTypeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-white"
            >
              <option value="all">All Projects</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="renovation">Renovation</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading quote requests...</p>
          </div>
        ) : quotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Project</th>
                  <th className="text-left p-4 font-medium">Budget</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote, index) => (
                  <motion.tr
                    key={quote._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/20"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{quote.firstName} {quote.lastName}</div>
                        <div className="text-sm text-muted-foreground">{quote.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium capitalize">{quote.projectType?.replace('-', ' ')}</div>
                        <div className="text-sm text-muted-foreground">{quote.squareFootage} sq ft</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{quote.budget}</span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewQuote(quote)}
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
            <FileText size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No quote requests found</p>
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

      <QuoteDetailModal
        quote={selectedQuote}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}