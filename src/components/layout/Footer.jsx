import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUp
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useSettings } from '../../hooks/useSettings'
import vrikshalogo from '../../assets/vrikshalogo.png'

const footerSections = [
  {
    title: 'Services',
    links: [
      { name: 'Residential Design', href: '/services#residential' },
      { name: 'Commercial Design', href: '/services#commercial' },
      { name: 'Consultation', href: '/services#consultation' },
      { name: 'Project Management', href: '/services#project-management' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Request Quote', href: '/request-quote' },
    ],
  },
]

export function Footer() {
  const { data: settings, isFromAPI } = useSettings()
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: settings?.socialMedia?.instagram || 'https://www.instagram.com/vrikshaa_space_creation?igsh=c3hkMXc2czI1dWxj' },
    { name: 'Facebook', icon: Facebook, href: settings?.socialMedia?.facebook || 'https://www.facebook.com/share/1BU8SGiyxX/' },
    { name: 'LinkedIn', icon: Linkedin, href: settings?.socialMedia?.linkedin || 'https://www.linkedin.com/in/shakila-dhanasekar-96aab1340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
  ].filter(link => link.href !== '#' && link.href)

  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <img
                src={vrikshalogo}
                alt="Vrikshaa Logo"
                className="w-25 h-20 rounded-lg object-contain bg-white/20 p-1 backdrop-blur-sm"
              />
              <div>
                <h2 className="text-2xl font-heading font-bold">
                  {settings?.companyName || 'Vrikshaa Space Creation'}
                </h2>
                <p className="text-sm text-primary-foreground/70">
                  {settings?.companyTagline || 'Creating Beautiful Spaces'}
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/80 leading-relaxed max-w-md"
            >
              {settings?.companyDescription || 
                'Transform your space into a work of art. We specialize in creating beautiful, functional interiors that reflect your unique style and enhance your daily life.'
              }
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 text-sm">
                <MapPin size={18} className="text-white" />
                <span>
                  {settings?.contactInfo?.address ? 
                    `${settings.contactInfo.address.street}, ${settings.contactInfo.address.city}, ${settings.contactInfo.address.state} ${settings.contactInfo.address.zipCode}` :
                    '14. 54, Ground Floor, 1st Main Road, Opp. MSR Plaza, Mathikere, Bengaluru-560054'
                  }
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone size={18} className="text-white" />
                <div className="flex flex-col">
                  <a href="tel:8489111000" className="hover:text-primary cursor-pointer transition-colors">84891 11000</a>
                  <a href="tel:8971100172" className="hover:text-primary cursor-pointer transition-colors">8971100172</a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail size={18} className="text-white" />
                <a href="mailto:info@vrikshaa.com" className="hover:text-primary cursor-pointer transition-colors">
                  {settings?.contactInfo?.email || 'info@vrikshaa.com'}
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex space-x-4"
            >
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <motion.a
                  key={name}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200 shimmer"
                  aria-label={name}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (sectionIndex + 1) }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>


        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary-foreground/60 text-sm"
          >
            © {new Date().getFullYear()} {settings?.companyName || 'Vrikshaa Space Creation'}. All rights reserved.
            {!isFromAPI && <span className="ml-2 text-xs opacity-75"></span>}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 bg-white hover:bg-white/90 text-primary rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg shimmer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="-mt-0.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
