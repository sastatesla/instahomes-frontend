import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { cn } from '../../lib/utils'
import vrikshalogo from '../../assets/images/vrikshalogo.png'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          !isHomePage
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border text-black'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border text-black'
              : 'bg-transparent text-white'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={vrikshalogo}
                  alt="Vrikshaa Logo"
                  className="w-25 h-20 rounded-lg object-contain"
                />
                <div className="hidden sm:block">
                  <h1 className="text-xl font-heading font-semibold">
                    Vrikshaa Space Creation
                  </h1>
                  <p className="text-xs text-muted-foreground -mt-1">
                    Creating Beautiful Spaces
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }}>
                  <Link
                    to={item.href}
                    className={cn(
                      'relative text-sm font-medium transition-colors duration-200',
                      location.pathname === item.href
                        ? 'text-accent'
                        : !isHomePage || isScrolled
                          ? 'text-black hover:text-accent'
                          : 'text-white hover:text-accent'
                    )}
                  >
                    {item.name}
                    {location.pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  to="/request-quote"
                  className="modern-button text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ✨ Get Quote
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors duration-200',
                  !isHomePage || isScrolled
                    ? 'hover:bg-gray-100 text-black'
                    : 'hover:bg-muted text-white'
                )}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={toggleMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 bg-white border-l border-border shadow-large"
            >
              <div className="p-6 pt-24">
                {/* Contact Info */}
                <div className="mb-8 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-3">Get In Touch</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Phone size={16} />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} />
                      <span>hello@interiordesign.com</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          'block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200',
                          location.pathname === item.href
                            ? 'bg-accent/10 text-accent border border-accent/20'
                            : 'hover:bg-muted text-foreground'
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigationItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <Link
                      to="/request-quote"
                      className="block w-full modern-button text-primary-foreground text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      ✨ Get Quote
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
