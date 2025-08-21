import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react'
import { fadeInVariants, staggerChildren, slugify, formatDate, truncateText } from '../../lib/utils'
import { useDataWithFallback } from '../../hooks/useDataWithFallback'
import { blogAPI } from '../../lib/api'
import { transformBlogData } from '../../lib/dataTransforms'
import { FALLBACK_BLOG_POSTS, FALLBACK_CATEGORIES } from '../../data/fallbackData'

const categories = FALLBACK_CATEGORIES.blog

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  // Fetch blog data with fallback
  const { 
    data: blogPosts, 
    isLoading, 
    isFromAPI, 
    error 
  } = useDataWithFallback(
    () => blogAPI.getAll({ published: true }),
    FALLBACK_BLOG_POSTS,
    [],
    {
      transform: transformBlogData,
      onSuccess: (data) => console.log('✅ Blog data loaded from API:', data.length, 'posts'),
      onError: (error) => console.log('⚠️ Using fallback blog data:', error.message)
    }
  )

  const filteredPosts = useMemo(() => {
    let posts = blogPosts || FALLBACK_BLOG_POSTS

    // Filter by category
    if (activeCategory !== 'all') {
      posts = posts.filter(post => post.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    return posts
  }, [blogPosts, searchTerm, activeCategory])

  const featuredPosts = useMemo(() => {
    return (blogPosts || FALLBACK_BLOG_POSTS).filter(post => post.featured)
  }, [blogPosts])

  const latestPosts = useMemo(() => {
    return (blogPosts || FALLBACK_BLOG_POSTS).slice(0, 3)
  }, [blogPosts])

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-background to-yellow-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full font-semibold mb-4 shadow-lg">
              ✨ Design Insights
              {isFromAPI && <span className="ml-2 text-xs opacity-75">(Live)</span>}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Interior Design
              <span className="block text-gradient">Blog & Inspiration</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the latest trends, expert tips, and behind-the-scenes stories from 
              the world of interior design. Get inspired for your next project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-heading font-bold text-center mb-16"
            >
              Featured Articles
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group modern-card overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          ✨ Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-primary group-hover:translate-x-1 transition-transform duration-300">
                          <span className="text-sm font-medium">Read More</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-12 bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md lg:max-w-lg">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-primary text-primary-foreground shadow-lg'
                      : 'bg-white hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-heading font-bold">
              {searchTerm ? `Search Results for "${searchTerm}"` : 
               activeCategory === 'all' ? 'All Articles' : 
               categories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {!isFromAPI && (
                <span className="ml-2 text-xs text-amber-600 opacity-75">(Demo)</span>
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="modern-card overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-muted"></div>
                    <div className="p-6">
                      <div className="flex space-x-2 mb-4">
                        <div className="h-4 bg-muted rounded w-16"></div>
                        <div className="h-4 bg-muted rounded w-20"></div>
                      </div>
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : filteredPosts.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchTerm}`}
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={fadeInVariants}
                    whileHover={{ y: -5 }}
                    className="group modern-card overflow-hidden hover:shadow-lg transition-all duration-500"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-gradient-accent text-primary-foreground px-2 py-1 rounded text-xs font-medium capitalize shadow-sm">
                            {post.category.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-3 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-lg font-heading font-bold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setActiveCategory('all')
                  }}
                  className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Show All Articles
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Stay Updated with Design Insights
            </h2>
            <p className="text-accent-foreground/90 mb-8 leading-relaxed">
              Get the latest design trends, tips, and inspiration delivered to your inbox. 
              Join our community of design enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent-foreground/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-foreground hover:bg-white/90 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}