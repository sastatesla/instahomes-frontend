import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { fadeInVariants, staggerChildren, cn } from '../../lib/utils'
import { useDataWithFallback } from '../../hooks/useDataWithFallback'
import { portfolioAPI } from '../../lib/api'
import { transformPortfolioData } from '../../lib/dataTransforms'
import { FALLBACK_PORTFOLIO_ITEMS, FALLBACK_CATEGORIES } from '../../data/fallbackData'

const categories = FALLBACK_CATEGORIES.portfolio

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Fetch portfolio data with fallback
  const { 
    data: portfolioItems, 
    isLoading, 
    isFromAPI, 
    error 
  } = useDataWithFallback(
    () => portfolioAPI.getAll({ published: true }),
    FALLBACK_PORTFOLIO_ITEMS,
    [],
    {
      transform: transformPortfolioData,
      onSuccess: (data) => console.log('✅ Portfolio data loaded from API:', data.length, 'projects'),
      onError: (error) => console.log('⚠️ Using fallback portfolio data:', error.message)
    }
  )

  const filteredProjects = activeCategory === 'all' 
    ? portfolioItems || FALLBACK_PORTFOLIO_ITEMS
    : (portfolioItems || FALLBACK_PORTFOLIO_ITEMS).filter(item => item.category === activeCategory)

  const openLightbox = (project, imageIndex = 0) => {
    setSelectedProject(project)
    setSelectedImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedProject(null)
    setSelectedImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setSelectedImageIndex(
        selectedImageIndex === selectedProject.images.length - 1 
          ? 0 
          : selectedImageIndex + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setSelectedImageIndex(
        selectedImageIndex === 0 
          ? selectedProject.images.length - 1 
          : selectedImageIndex - 1
      )
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-background to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full font-semibold mb-4 shadow-lg">
              ✨ Our Portfolio
              {isFromAPI && <span className="ml-2 text-xs opacity-75">(Live)</span>}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Transformative Design
              <span className="block text-gradient">Stories</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our collection of completed projects showcasing diverse styles, 
              innovative solutions, and the artistry that defines our work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-6 py-3 rounded-full font-medium transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-gradient-primary text-primary-foreground shadow-lg'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                )}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
          
          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {!isFromAPI && (
                <span className="ml-2 text-xs text-amber-600 opacity-75">(Demo)</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="modern-card overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-muted"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-12"></div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="flex space-x-1">
                          <div className="h-6 bg-muted rounded w-16"></div>
                          <div className="h-6 bg-muted rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeInVariants}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer modern-card overflow-hidden hover:shadow-xl transition-all duration-500"
                    onClick={() => openLightbox(project, 0)}
                  >
                    {/* Project Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.images?.[0]?.url || project.images?.[0] || '/api/placeholder/400/300'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <ExternalLink size={24} className="text-foreground" />
                        </div>
                      </div>

                      {/* Image Count Badge */}
                      {project.images && project.images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          +{project.images.length - 1}
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-heading font-bold group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded capitalize">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{project.location}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.tags && project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs border text-primary-foreground px-2 py-1 rounded shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full border max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-large"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/60 hover:bg-gray/80 text-black rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>

              <div className="grid lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <img
                    src={selectedProject.images?.[selectedImageIndex]?.url || selectedProject.images?.[selectedImageIndex] || '/api/placeholder/600/400'}
                    alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ArrowRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={cn(
                            'w-2 h-2 rounded-full transition-colors',
                            index === selectedImageIndex 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/80'
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 overflow-y-auto">
                  <div className="flex items-start text-amber-50 justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-heading font-bold mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedProject.location && selectedProject.location}
                        {selectedProject.client && ` • ${selectedProject.client}`}
                      </p>
                    </div>
                  </div>

                  <p className="text-amber-50 leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-6">
                  

                    <div className='text-amber-50'>
                      <h3 className="font-semibold mb-3">Project Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="capitalize">{selectedProject.category}</span>
                        </div>
                        {selectedProject.client && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Client:</span>
                            <span>{selectedProject.client}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Images:</span>
                          <span>{selectedProject.images?.length || 0}</span>
                        </div>
                        {selectedProject.published !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="capitalize">{selectedProject.published ? 'Published' : 'Draft'}</span>
                          </div>
                        )}
                        {selectedProject.featured && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Featured:</span>
                            <span>Yes</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Show additional tags */}
                    {selectedProject.tags && selectedProject.tags.length > 2 && (
                      <div className='text-amber-50'>
                        <h3 className="font-semibold mb-3">All Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="bg-accent/10 border text-amber-50 px-3 py-2 rounded-lg text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SEO Information for admin preview */}
                    {(selectedProject.seoTitle || selectedProject.seoDescription) && (
                      <div className='text-amber-50'>
                        <h3 className="font-semibold mb-3">SEO Information</h3>
                        <div className="space-y-2 text-sm">
                          {selectedProject.seoTitle && (
                            <div>
                              <span className="text-muted-foreground">SEO Title:</span>
                              <p>{selectedProject.seoTitle}</p>
                            </div>
                          )}
                          {selectedProject.seoDescription && (
                            <div>
                              <span className="text-muted-foreground">SEO Description:</span>
                              <p>{selectedProject.seoDescription}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}