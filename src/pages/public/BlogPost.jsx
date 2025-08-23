import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link2
} from 'lucide-react'
import { formatDate, cn } from '../../lib/utils'
import { useItemWithFallback } from '../../hooks/useDataWithFallback'
import { blogAPI } from '../../lib/api'
import { transformSingleBlog } from '../../lib/dataTransforms'
import { FALLBACK_BLOG_POSTS } from '../../data/fallbackData'

// Fallback blog posts lookup
const getFallbackPost = (id) => {
  return FALLBACK_BLOG_POSTS.find(post => post.id === id)
}

export function BlogPost() {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  // Get fallback post for this id
  const fallbackPost = getFallbackPost(id)

  // Fetch blog post with fallback
  const { 
    data: post, 
    isLoading, 
    isFromAPI, 
    error 
  } = useItemWithFallback(
    (id) => blogAPI.getById(id),
    fallbackPost,
    id,
    {
      transform: transformSingleBlog,
      onSuccess: (data) => console.log('✅ Blog post loaded from API:', data.title),
      onError: (error) => console.log('⚠️ Using fallback blog post:', error.message)
    }
  )

  const handleShare = async (platform) => {
    setIsSharing(true)
    const url = window.location.href
    const title = post?.title || 'Check out this blog post'
    
    try {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
          break
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
          break
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
          break
        case 'copy':
          await navigator.clipboard.writeText(url)
          // You could show a toast notification here
          break
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setTimeout(() => setIsSharing(false), 1000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
              <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block bg-gradient-accent text-primary-foreground px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {post.category.replace('-', ' ')}
                  {!isFromAPI && <span className="ml-2 opacity-75">(Demo)</span>}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Social Actions */}
              <div className="flex items-center justify-between border-t border-border pt-6 mb-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                      isLiked
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MessageCircle size={18} />
                    <span>Comments</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground mr-2">Share:</span>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-lg bg-muted hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    disabled={isSharing}
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-lg bg-muted hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    disabled={isSharing}
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-lg bg-muted hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    disabled={isSharing}
                  >
                    <Linkedin size={18} />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    disabled={isSharing}
                  >
                    <Link2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:mb-2"
          >
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div>
                <p>As we move through 2024, interior design continues to evolve, reflecting our changing lifestyles and values. This year's trends emphasize sustainability, comfort, and personal expression, creating spaces that are both beautiful and meaningful.</p>
                
                <h2>1. Sustainable and Eco-Friendly Materials</h2>
                <p>The shift towards sustainability is more than just a trend—it's a fundamental change in how we approach design. From reclaimed wood to recycled metals, designers are increasingly choosing materials that minimize environmental impact.</p>
                
                <h2>2. Bold Color Palettes</h2>
                <p>After years of neutral dominance, bold colors are making a strong comeback. Think rich jewel tones, vibrant greens, and warm terracotta shades that add personality and energy to spaces.</p>
                
                <h2>3. Curved and Organic Shapes</h2>
                <p>Soft, curved furniture and organic shapes are replacing the sharp angles of minimalist design. This trend creates more welcoming and comfortable spaces.</p>
                
                <h2>4. Smart Home Integration</h2>
                <p>Technology continues to be seamlessly integrated into home design, with smart lighting, climate control, and security systems becoming standard features in modern homes.</p>
                
                <h2>5. Biophilic Design Elements</h2>
                <p>Bringing nature indoors through plants, natural materials, and organic patterns continues to be a major trend, promoting wellness and connection to the natural world.</p>
              </div>
            )}
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <h3 className="text-2xl font-heading font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {FALLBACK_BLOG_POSTS
                .filter(relatedPost => relatedPost.id !== id && relatedPost.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group modern-card overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading font-bold group-hover:text-accent transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  )
}