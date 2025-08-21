import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Save,
  X,
  Upload,
  Globe,
  EyeOff,
  Star,
  Calendar,
  Image as ImageIcon,
  MapPin,
  DollarSign
} from 'lucide-react'
import { portfolioAPI } from '../../lib/api'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { cn } from '../../lib/utils'

const portfolioSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['residential', 'commercial', 'renovation', 'styling']),
  style: z.enum(['modern', 'contemporary', 'traditional', 'minimalist', 'industrial', 'scandinavian', 'bohemian', 'eclectic']),
  location: z.string().optional(),
  completionDate: z.string().optional(),
  projectDuration: z.string().optional(),
  budget: z.enum(['under-50k', '50k-100k', '100k-250k', '250k-500k', 'over-500k']).optional(),
  client: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional()
})

const StatusBadge = ({ published, featured }) => (
  <div className="flex items-center gap-2">
    {published ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <Globe size={12} className="mr-1" />
        Published
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        <EyeOff size={12} className="mr-1" />
        Draft
      </span>
    )}
    {featured && (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
        <Star size={12} className="mr-1" />
        Featured
      </span>
    )}
  </div>
)

const PortfolioModal = ({ project, isOpen, onClose, onSave, mode = 'create' }) => {
  const [highlights, setHighlights] = useState(project?.highlights?.join(', ') || '')
  const [challenges, setChallenges] = useState(project?.challenges?.join(', ') || '')
  const [solutions, setSolutions] = useState(project?.solutions?.join(', ') || '')
  const [materials, setMaterials] = useState(project?.materials?.join(', ') || '')
  const [tags, setTags] = useState(project?.tags?.join(', ') || '')
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState(project?.images?.map(img => img.url) || [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      category: project?.category || 'residential',
      style: project?.style || 'modern',
      location: project?.location || '',
      completionDate: project?.completionDate ? project.completionDate.split('T')[0] : '',
      projectDuration: project?.projectDuration || '',
      budget: project?.budget || '',
      client: project?.client || '',
      published: project?.published || false,
      featured: project?.featured || false
    }
  })

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setImageFiles(files)
      
      // Create previews
      const newPreviews = []
      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result)
          if (newPreviews.length === files.length) {
            setImagePreviews(prev => [...prev, ...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    if (index < imageFiles.length) {
      setImageFiles(prev => prev.filter((_, i) => i !== index))
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const portfolioData = {
        ...data,
        highlights: highlights.split(',').map(item => item.trim()).filter(Boolean),
        challenges: challenges.split(',').map(item => item.trim()).filter(Boolean),
        solutions: solutions.split(',').map(item => item.trim()).filter(Boolean),
        materials: materials.split(',').map(item => item.trim()).filter(Boolean),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        completionDate: data.completionDate || undefined
      }

      let response
      if (mode === 'create') {
        response = await portfolioAPI.create(portfolioData, imageFiles)
      } else {
        response = await portfolioAPI.update(project._id, portfolioData, imageFiles)
      }

      if (response.success) {
        onSave(response.data)
        onClose()
      }
    } catch (error) {
      console.error('Error saving portfolio:', error)
      alert('Failed to save portfolio project')
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
              {mode === 'create' ? 'Create New Portfolio Project' : 'Edit Portfolio Project'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title *</label>
                <input
                  {...register('title')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Enter project title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
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
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                placeholder="Describe the project in detail"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-sm font-medium mb-2">Style *</label>
                <select
                  {...register('style')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="modern">Modern</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="traditional">Traditional</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="industrial">Industrial</option>
                  <option value="scandinavian">Scandinavian</option>
                  <option value="bohemian">Bohemian</option>
                  <option value="eclectic">Eclectic</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Completion Date</label>
                <input
                  {...register('completionDate')}
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Duration</label>
                <input
                  {...register('projectDuration')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="e.g., 6 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Budget Range</label>
                <select
                  {...register('budget')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="">Select budget range</option>
                  <option value="under-50k">Under $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k-250k">$100K - $250K</option>
                  <option value="250k-500k">$250K - $500K</option>
                  <option value="over-500k">Over $500K</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Client Name</label>
              <input
                {...register('client')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                placeholder="Client name (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Project Images</label>
              <div className="space-y-4">
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
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
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Highlights</label>
                <textarea
                  value={highlights}
                  onChange={e => setHighlights(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Separate highlights with commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Materials Used</label>
                <textarea
                  value={materials}
                  onChange={e => setMaterials(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Separate materials with commas"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Challenges</label>
                <textarea
                  value={challenges}
                  onChange={e => setChallenges(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Project challenges, separated by commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Solutions</label>
                <textarea
                  value={solutions}
                  onChange={e => setSolutions(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="How challenges were solved, separated by commas"
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

export function PortfolioManagement() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProjects()
  }, [page, categoryFilter, statusFilter, searchTerm])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 12,
        search: searchTerm || '',
        category: categoryFilter !== 'all' ? categoryFilter : '',
        published: statusFilter === 'published' ? 'true' : statusFilter === 'draft' ? 'false' : ''
      }

      const response = await portfolioAPI.getAll(params)
      if (response.success) {
        setProjects(response.data.projects)
        setTotalPages(response.data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = () => {
    setSelectedProject(null)
    setModalMode('create')
    setShowModal(true)
  }

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setModalMode('edit')
    setShowModal(true)
  }

  const handleSaveProject = (savedProject) => {
    if (modalMode === 'create') {
      setProjects(prev => [savedProject, ...prev])
    } else {
      setProjects(prev => prev.map(project => project._id === savedProject._id ? savedProject : project))
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this portfolio project?')) return

    try {
      const response = await portfolioAPI.delete(projectId)
      if (response.success) {
        setProjects(prev => prev.filter(project => project._id !== projectId))
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete portfolio project')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Portfolio Management</h1>
            <p className="text-muted-foreground">Manage your project showcases</p>
          </div>
          <button
            onClick={handleCreateProject}
            className="flex items-center space-x-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <Plus size={20} />
            <span>New Project</span>
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
                  placeholder="Search projects..."
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
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-white"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-muted/20 rounded-xl overflow-hidden hover:shadow-medium transition-all duration-300"
                >
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0].url}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted/50 flex items-center justify-center">
                      <ImageIcon size={32} className="text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold truncate">{project.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <MapPin size={12} />
                          <span>{project.location || 'Location not specified'}</span>
                        </div>
                      </div>
                      <StatusBadge published={project.published} featured={project.featured} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="capitalize">{project.category}</span> • {project.style}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <ImageIcon size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No portfolio projects found</p>
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

      <PortfolioModal
        project={selectedProject}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProject}
        mode={modalMode}
      />
    </AdminLayout>
  )
}