import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Image, 
  Plus,
  Search, 
  Filter, 
  Eye, 
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Star,
  Calendar,
  Tag,
  Move,
  ImageIcon,
  GripVertical,
  Globe,
  EyeOff
} from 'lucide-react'
import { portfolioAPI } from '../../lib/api'
import { cn } from '../../lib/utils'
import { ConfirmationModal } from '../../components/ui/ConfirmationModal'

const portfolioSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['residential', 'commercial', 'renovation', 'styling']),
  client: z.string().optional(),
  location: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().min(50, 'SEO description must be less than 160 characters').optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional()
})

const PortfolioModal = ({ portfolio, isOpen, onClose, onSave, mode = 'create' }) => {
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [tags, setTags] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'residential',
      client: '',
      location: '',
      seoTitle: '',
      seoDescription: '',
      published: false,
      featured: false
    }
  })

  // Reset form when portfolio changes or modal opens
  useEffect(() => {
    console.log('PortfolioModal useEffect triggered:', { isOpen, mode, portfolio: portfolio?.title })
    
    if (isOpen) {
      if (portfolio && mode === 'edit') {
        console.log('Setting form data for edit mode:', portfolio)
        reset({
          title: portfolio.title || '',
          description: portfolio.description || '',
          category: portfolio.category || 'residential',
          client: portfolio.client || '',
          location: portfolio.location || '',
          seoTitle: portfolio.seoTitle || '',
          seoDescription: portfolio.seoDescription || '',
          published: portfolio.published || false,
          featured: portfolio.featured || false
        })
        setTags(portfolio.tags?.join(', ') || '')
        setImagePreviews(portfolio.images || [])
        setImageFiles([])
      } else if (mode === 'create') {
        console.log('Clearing form for create mode')
        // Clear all form fields
        reset({
          title: '',
          description: '',
          category: 'residential',
          client: '',
          location: '',
          seoTitle: '',
          seoDescription: '',
          published: false,
          featured: false
        })
        // Clear all state
        setTags('')
        setImagePreviews([])
        setImageFiles([])
        
        // Force clear any file inputs
        const fileInput = document.getElementById('images')
        if (fileInput) {
          fileInput.value = ''
        }
      }
    }
  }, [portfolio, mode, reset, isOpen])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    
    // Create previews
    const previews = []
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        previews.push({ url: reader.result, file })
        if (previews.length === files.length) {
          setImagePreviews(prev => [...prev, ...previews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const moveImage = (fromIndex, toIndex) => {
    const newPreviews = [...imagePreviews]
    const [movedItem] = newPreviews.splice(fromIndex, 1)
    newPreviews.splice(toIndex, 0, movedItem)
    setImagePreviews(newPreviews)
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const portfolioData = {
        ...data,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }

      let response
      if (mode === 'create') {
        response = await portfolioAPI.create(portfolioData, imageFiles)
      } else {
        response = await portfolioAPI.update(portfolio._id, portfolioData, imageFiles)
      }

      if (response.success) {
        onSave(response.data)
        onClose()
      }
    } catch (error) {
      console.error('Error saving portfolio:', error)
      // Note: We'll handle this error in the parent component
      // For now, we'll just log it and let the user know via the form
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

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
            <h2 className="text-xl font-semibold">

              {mode === 'create' ? 'Add New Portfolio Item' : 'Edit Portfolio Item'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  {...register('title')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Project title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="renovation">Renovation</option>
                  <option value="styling">Styling</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                placeholder="Project description and details"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <input
                  {...register('client')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  {...register('location')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Project location"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                placeholder="Separate tags with commas"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <input
                  {...register('seoTitle')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SEO Description</label>
                <textarea
                  {...register('seoDescription')}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Meta description for search engines"
                />
                {errors.seoDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.seoDescription.message}</p>
                )}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">Project Images</label>
              <div className="space-y-4">
                {/* Current Images */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagePreviews.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => moveImage(index, index - 1)}
                              className="p-1 bg-white/20 rounded hover:bg-white/30"
                            >
                              <GripVertical size={16} className="text-white" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1 bg-red-500/80 rounded hover:bg-red-500"
                          >
                            <X size={16} className="text-white" />
                          </button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2">
                            <Star size={16} className="text-yellow-400 fill-current" title="Cover Image" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Upload Area */}
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    <span>Add Images</span>
                  </label>
                  <p className="text-sm text-muted-foreground">First image will be used as cover</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  {...register('published')}
                  type="checkbox"
                  className="rounded"
                />
                <span>Published</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  {...register('featured')}
                  type="checkbox"
                  className="rounded"
                />
                <span>Featured</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'flex items-center space-x-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-colors',
                  isSubmitting && 'opacity-50 cursor-not-allowed'
                )}
              >
                <Save size={16} />
                <span>{isSubmitting ? 'Saving...' : 'Save Project'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [featuredFilter, setFeaturedFilter] = useState('all')
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning'
  })

  useEffect(() => {
    fetchPortfolios()
  }, [page, categoryFilter, featuredFilter, searchTerm])

  const fetchPortfolios = async () => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 12,
        search: searchTerm || '',
        category: categoryFilter !== 'all' ? categoryFilter : '',
        featured: featuredFilter === 'featured' ? 'true' : featuredFilter === 'regular' ? 'false' : ''
      }

      const response = await portfolioAPI.getAll(params)
      if (response.success) {
        setPortfolios(response.data.projects || [])
        setTotalPages(response.data.pagination?.pages || 1)
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error)
      setPortfolios([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePortfolio = () => {
    console.log('handleCreatePortfolio called - clearing form for new portfolio')
    setSelectedPortfolio(null)
    setModalMode('create')
    setShowModal(true)
  }

  const handleEditPortfolio = (portfolio) => {
    console.log('handleEditPortfolio called with:', portfolio)
    setSelectedPortfolio(portfolio)
    setModalMode('edit')
    setShowModal(true)
  }

  const handleSavePortfolio = (savedPortfolio) => {
    if (modalMode === 'create') {
      setPortfolios(prev => [savedPortfolio, ...(prev || [])])
    } else {
      setPortfolios(prev => (prev || []).map(portfolio => 
        portfolio._id === savedPortfolio._id ? savedPortfolio : portfolio
      ))
    }
  }

  const handleCloseModal = () => {
    console.log('Closing modal - resetting state')
    setShowModal(false)
    setSelectedPortfolio(null)
    setModalMode('create')
  }

  const handleDeletePortfolio = (portfolioId) => {
    setConfirmationModal({
      isOpen: true,
      title: 'Delete Portfolio Item',
      message: 'Are you sure you want to delete this portfolio item? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
    try {
      const response = await portfolioAPI.delete(portfolioId)
      if (response.success) {
        setPortfolios(prev => prev.filter(portfolio => portfolio._id !== portfolioId))
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error)
          setConfirmationModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete portfolio item. Please try again.',
            type: 'danger',
            onConfirm: () => setConfirmationModal(prev => ({ ...prev, isOpen: false }))
          })
        }
        setConfirmationModal(prev => ({ ...prev, isOpen: false }))
      }
    })
  }

  const handleTogglePublish = async (portfolio) => {
    try {
      const response = await portfolioAPI.togglePublished(portfolio._id)
      if (response.success) {
        setPortfolios(prev => prev.map(p => p._id === portfolio._id ? response.data : p))
      }
    } catch (error) {
      console.error('Error toggling publish status:', error)
      setConfirmationModal({
        isOpen: true,
        title: 'Error',
        message: 'Failed to update publish status. Please try again.',
        type: 'danger',
        onConfirm: () => setConfirmationModal(prev => ({ ...prev, isOpen: false }))
      })
    }
  }

  const handleToggleFeatured = async (portfolio) => {
    try {
      const response = await portfolioAPI.toggleFeatured(portfolio._id)
      if (response.success) {
        setPortfolios(prev => prev.map(p => p._id === portfolio._id ? response.data : p))
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
      setConfirmationModal({
        isOpen: true,
        title: 'Error',
        message: 'Failed to update featured status. Please try again.',
        type: 'danger',
        onConfirm: () => setConfirmationModal(prev => ({ ...prev, isOpen: false }))
      })
    }
  }

  const PortfolioCard = ({ portfolio, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative">
        {portfolio.images?.[0] && (
          <img
            src={portfolio.images[0].url}
            alt={portfolio.title}
            className="w-full h-48 object-cover"
          />
        )}
        {portfolio.featured && (
          <div className="absolute top-2 left-2">
            <Star size={16} className="text-yellow-400 fill-current" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={() => handleTogglePublish(portfolio)}
            className="p-1 bg-black/50 text-white rounded hover:bg-black/70"
            title={portfolio.published ? 'Unpublish' : 'Publish'}
          >
            {portfolio.published ? <EyeOff size={14} /> : <Globe size={14} />}
          </button>
          <button
            onClick={() => handleToggleFeatured(portfolio)}
            className="p-1 bg-black/50 text-white rounded hover:bg-black/70"
            title={portfolio.featured ? 'Remove from Featured' : 'Mark as Featured'}
          >
            <Star size={14} className={portfolio.featured ? 'fill-yellow-400 text-yellow-400' : ''} />
          </button>
          <button
            onClick={() => handleEditPortfolio(portfolio)}
            className="p-1 bg-black/50 text-white rounded hover:bg-black/70"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => handleDeletePortfolio(portfolio._id)}
            className="p-1 bg-red-500/80 text-white rounded hover:bg-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground truncate">{portfolio.title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
              {portfolio.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          {portfolio.published ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <Globe size={10} className="mr-1" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              <EyeOff size={10} className="mr-1" />
              Draft
            </span>
          )}
          {portfolio.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              <Star size={10} className="mr-1" />
              Featured
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {portfolio.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{portfolio.location || 'No location'}</span>
          <span>{portfolio.client || 'No client'}</span>
        </div>
        
        {portfolio.tags && portfolio.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {portfolio.tags.slice(0, 3).map((tag, tagIndex) => (
              <span key={tagIndex} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {portfolio.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{portfolio.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Portfolio Management</h1>
          <p className="text-muted-foreground">Showcase your interior design projects</p>
        </div>
        <button
          onClick={handleCreatePortfolio}
          className="flex items-center space-x-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search portfolio projects..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-white"
            >
              <option value="all">All Categories</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="renovation">Renovation</option>
              <option value="styling">Styling</option>
            </select>
            
            <select
              value={featuredFilter}
              onChange={e => setFeaturedFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-white"
            >
              <option value="all">All Projects</option>
              <option value="featured">Featured</option>
              <option value="regular">Regular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl border border-border overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-muted"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : portfolios?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio, index) => (
            <PortfolioCard key={portfolio._id} portfolio={portfolio} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Image size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No portfolio projects found</p>
        </div>
      )}

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

      <PortfolioModal
        key={selectedPortfolio?._id || 'create'}
        portfolio={selectedPortfolio}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSavePortfolio}
        mode={modalMode}
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        confirmText={confirmationModal.type === 'danger' ? 'Delete' : 'Confirm'}
        cancelText="Cancel"
      />
    </div>
  )
}