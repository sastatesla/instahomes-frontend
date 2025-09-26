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
  User,
  Tag
} from 'lucide-react'
import { blogAPI } from '../../lib/api'
import { RichTextEditor } from '../../components/admin/RichTextEditor'
import { cn } from '../../lib/utils'
import { ConfirmationModal } from '../../components/ui/ConfirmationModal'

const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500, 'Excerpt must be less than 500 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.enum(['design-tips', 'trends', 'projects', 'inspiration', 'tutorials']),
  author: z.string().min(2, 'Author name is required'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160, 'SEO description must be less than 160 characters').optional()
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

const BlogModal = ({ blog, isOpen, onClose, onSave, mode = 'create' }) => {
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  console.log('BlogModal state:', { content: content.length, isSubmitting, mode, isOpen })

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: 'design-tips',
      author: '',
      published: false,
      featured: false,
      seoTitle: '',
      seoDescription: ''
    }
  })

  console.log('Form errors:', errors)

  // Handle form reset and data loading when modal opens or blog/mode changes
  useEffect(() => {
    console.log('BlogModal useEffect triggered:', { isOpen, mode, blog: blog?.title })
    
    if (isOpen) {
      if (blog && mode === 'edit') {
        console.log('Setting form data for edit mode:', blog)
        reset({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          category: blog.category || 'design-tips',
          author: blog.author || '',
          published: blog.published || false,
          featured: blog.featured || false,
          seoTitle: blog.seoTitle || '',
          seoDescription: blog.seoDescription || ''
        })
        setContent(blog.content || '')
        setTags(blog.tags?.join(', ') || '')
        setImagePreview(blog.image?.url || null)
        setImageFile(null)
      } else if (mode === 'create') {
        console.log('Clearing form for create mode')
        reset({
          title: '',
          excerpt: '',
          content: '',
          category: 'design-tips',
          author: '',
          published: false,
          featured: false,
          seoTitle: '',
          seoDescription: ''
        })
        setContent('')
        setTags('')
        setImagePreview(null)
        setImageFile(null)
        
        // Clear file input
        const fileInput = document.getElementById('image')
        if (fileInput) {
          fileInput.value = ''
        }
      }
    }
  }, [blog, mode, reset, isOpen])

  // Sync content with form when content changes
  useEffect(() => {
    if (content) {
      setValue('content', content)
    }
  }, [content, setValue])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    console.log('Blog submission started:', { data, content, imageFile })
    console.log('Current token:', localStorage.getItem('token') ? 'exists' : 'missing')
    console.log('API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:4000/api')
    setIsSubmitting(true)
    
    try {
      // Validate content length
      if (content.length < 50) {
        // Note: We'll handle this validation in the UI instead of alert
        setIsSubmitting(false)
        return
      }

      const blogData = {
        ...data,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }

      console.log('Prepared blog data:', blogData)
      console.log('About to make API call...')

      let response
      if (mode === 'create') {
        console.log('Creating new blog...')
        response = await blogAPI.create(blogData, imageFile)
        console.log('Create API call completed:', response)
      } else {
        console.log('Updating existing blog...', blog._id)
        response = await blogAPI.update(blog._id, blogData, imageFile)
        console.log('Update API call completed:', response)
      }

      console.log('Final API response:', response)

      if (response && response.success) {
        console.log('Blog saved successfully')
        onSave(response.data)
        onClose()
      } else {
        console.error('API returned error or no response:', response)
        // Note: We'll handle this error in the parent component
      }
    } catch (error) {
      console.error('Error saving blog:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        data: error.data,
        stack: error.stack
      })
      // Note: We'll handle this error in the parent component
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
              {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={(e) => {
            console.log('Form submit event triggered!')
            console.log('Event:', e)
            return handleSubmit(onSubmit)(e)
          }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  {...register('title')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Enter blog post title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author *</label>
                <input
                  {...register('author')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <textarea
                {...register('excerpt')}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                placeholder="Brief description of the blog post"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="design-tips">Design Tips</option>
                  <option value="trends">Trends</option>
                  <option value="projects">Projects</option>
                  <option value="inspiration">Inspiration</option>
                  <option value="tutorials">Tutorials</option>
                </select>
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    <span>Choose Image</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <RichTextEditor
                content={content}
                onChange={(newContent) => {
                  console.log('Content changed:', newContent.length, 'chars')
                  setContent(newContent)
                  setValue('content', newContent) // Sync with form
                }}
                placeholder="Write your blog post content here..."
              />
              {content.length < 50 && (
                <p className="text-red-500 text-sm mt-1">Content must be at least 50 characters</p>
              )}
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
                className="px-4 py-2 modern-button-border hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || content.length < 50}
                onClick={() => {
                  console.log('Save button clicked!')
                  console.log('Content length:', content.length)
                  console.log('Is submitting:', isSubmitting)
                  console.log('Button disabled:', isSubmitting || content.length < 50)
                }}
                className={cn(
                  'flex items-center space-x-2 px-6 py-2 modern-button text-accent-foreground rounded-lg font-medium transition-colors',
                  (isSubmitting || content.length < 50) && 'opacity-50 cursor-not-allowed'
                )}
              >
                <Save size={16} />
                <span>{isSubmitting ? 'Saving...' : 'Save Post'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function BlogManagement() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
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
    fetchBlogs()
  }, [page, categoryFilter, statusFilter, searchTerm])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = {
        page,
        limit: 10,
        search: searchTerm || '',
        category: categoryFilter !== 'all' ? categoryFilter : '',
        published: statusFilter === 'published' ? 'true' : statusFilter === 'draft' ? 'false' : ''
      }

      const response = await blogAPI.getAll(params)
      if (response.success) {
        setBlogs(response.data.blogs)
        setTotalPages(response.data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBlog = () => {
    console.log('handleCreateBlog called - clearing form for new blog')
    setSelectedBlog(null)
    setModalMode('create')
    setShowModal(true)
  }

  const handleEditBlog = (blog) => {
    console.log('handleEditBlog called with:', blog)
    setSelectedBlog(blog)
    setModalMode('edit')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    console.log('Closing modal - resetting state')
    setShowModal(false)
    setSelectedBlog(null)
    setModalMode('create')
  }

  const handleSaveBlog = (savedBlog) => {
    if (modalMode === 'create') {
      setBlogs(prev => [savedBlog, ...prev])
    } else {
      setBlogs(prev => prev.map(blog => blog._id === savedBlog._id ? savedBlog : blog))
    }
  }

  const handleDeleteBlog = (blogId) => {
    setConfirmationModal({
      isOpen: true,
      title: 'Delete Blog Post',
      message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
    try {
      const response = await blogAPI.delete(blogId)
      if (response.success) {
        setBlogs(prev => prev.filter(blog => blog._id !== blogId))
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
          setConfirmationModal({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete blog post. Please try again.',
            type: 'danger',
            onConfirm: () => setConfirmationModal(prev => ({ ...prev, isOpen: false }))
          })
        }
        setConfirmationModal(prev => ({ ...prev, isOpen: false }))
      }
    })
  }

  const handleTogglePublish = async (blog) => {
    try {
      const response = await blogAPI.togglePublish(blog._id)
      if (response.success) {
        setBlogs(prev => prev.map(b => b._id === blog._id ? response.data : b))
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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
          <button
            onClick={handleCreateBlog}
            className="flex items-center space-x-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <Plus size={20} />
            <span>New Post</span>
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
                  placeholder="Search blog posts..."
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
                <option value="design-tips">Design Tips</option>
                <option value="trends">Trends</option>
                <option value="projects">Projects</option>
                <option value="inspiration">Inspiration</option>
                <option value="tutorials">Tutorials</option>
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

        {/* Blog Posts Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium">Post</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Author</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, index) => (
                    <motion.tr
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-muted/20"
                    >
                      <td className="p-4">
                        <div className="flex items-start space-x-3">
                          {blog.image?.url && (
                            <img
                              src={blog.image.url}
                              alt={blog.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{blog.title}</div>
                            <div className="text-sm text-muted-foreground truncate">{blog.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize">{blog.category.replace('-', ' ')}</span>
                      </td>
                      <td className="p-4">
                        <span>{blog.author}</span>
                      </td>
                      <td className="p-4">
                        <StatusBadge published={blog.published} featured={blog.featured} />
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTogglePublish(blog)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title={blog.published ? 'Unpublish' : 'Publish'}
                          >
                            {blog.published ? <EyeOff size={16} /> : <Globe size={16} />}
                          </button>
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
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
              <Edit size={32} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No blog posts found</p>
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

      <BlogModal
        key={selectedBlog?._id || 'create'}
        blog={selectedBlog}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveBlog}
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
    </>
  )
}