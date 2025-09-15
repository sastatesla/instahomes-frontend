import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react'
import { fadeInVariants, cn } from '../../lib/utils'
import { contactAPI } from '../../lib/api'
import { useSettings } from '../../hooks/useSettings'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectType: z.enum(['residential', 'commercial', 'consultation', 'other'], {
    required_error: 'Please select a project type'
  })
})

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { data: settings, isFromAPI } = useSettings()

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Studio',
      details: [
        settings?.contactInfo?.address?.street || '14. 54, Ground Floor, 1st Main Road, Opp. MSR Plaza, Mathikere',
        settings?.contactInfo?.address ? 
          `${settings.contactInfo.address.city}, ${settings.contactInfo.address.state} ${settings.contactInfo.address.zipCode}` :
          'Bengaluru, Karnataka 560054'
      ],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        settings?.contactInfo?.phone || '84891 11000',
        'Mon-Fri 9AM-6PM IST'
      ],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        settings?.contactInfo?.email || 'info@vrikshaa.com',
        'We reply within 24 hours'
      ],
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: settings?.contactInfo?.businessHours ? [
        `Monday - Friday: ${settings.contactInfo.businessHours.monday}`,
        `Saturday: ${settings.contactInfo.businessHours.saturday}`,
        `Sunday: ${settings.contactInfo.businessHours.sunday}`
      ] : [
        'Monday - Friday: 9AM - 6PM',
        'Saturday: 10AM - 4PM',
        'Sunday: Closed'
      ],
      action: null
    }
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: settings?.socialMedia?.instagram || '#', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: settings?.socialMedia?.facebook || '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: settings?.socialMedia?.twitter || '#', color: 'hover:text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, href: settings?.socialMedia?.linkedin || '#', color: 'hover:text-blue-700' }
  ].filter(link => link.href !== '#' && link.href)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const response = await contactAPI.submit(data)
      
      if (response.success) {
        setIsSubmitted(true)
        reset()
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        console.error('Contact form submission failed:', response.message)
        alert('Failed to submit contact form. Please try again.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      alert('An error occurred while submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
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
              ✨ Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Let's Create Something
              <span className="block text-gradient">Beautiful Together</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your space? We'd love to hear about your project and 
              discuss how we can bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="modern-card p-6 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <info.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
                {info.action && (
                  <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                    {info.action}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="modern-card p-8">
                <h2 className="text-2xl font-heading font-bold mb-2">Send us a message</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          className={cn(
                            'w-full px-4 py-3 rounded-lg border bg-white transition-colors',
                            errors.name 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-border focus:border-primary'
                          )}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className={cn(
                            'w-full px-4 py-3 rounded-lg border bg-white transition-colors',
                            errors.email 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-border focus:border-primary'
                          )}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent bg-white transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Project Type *
                        </label>
                        <select
                          {...register('projectType')}
                          className={cn(
                            'w-full px-4 py-3 rounded-lg border bg-white transition-colors',
                            errors.projectType 
                              ? 'border-red-300 focus:border-red-500' 
                              : 'border-border focus:border-primary'
                          )}
                        >
                          <option value="">Select project type</option>
                          <option value="residential">Residential Design</option>
                          <option value="commercial">Commercial Space</option>
                          <option value="consultation">Consultation</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.projectType && (
                          <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <input
                        {...register('subject')}
                        type="text"
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border bg-white transition-colors',
                          errors.subject 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-border focus:border-accent'
                        )}
                        placeholder="What can we help you with?"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={6}
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border bg-white transition-colors resize-none',
                          errors.message 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-border focus:border-accent'
                        )}
                        placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'w-full modern-button text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl shimmer',
                        isSubmitting && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-muted/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Our Design Studio</h3>
                <p className="text-muted-foreground mb-4">
                  Located in Mathikere, Bengaluru, our design studio showcases 
                  the latest in interior design trends and construction materials.
                </p>
                <div className="bg-accent/5 rounded-lg p-4 text-sm">
                  <p className="font-medium">
                    {settings?.contactInfo?.address?.street || '14. 54, Ground Floor, 1st Main Road, Opp. MSR Plaza, Mathikere'}
                  </p>
                  <p className="text-muted-foreground">
                    {settings?.contactInfo?.address ? 
                      `${settings.contactInfo.address.city}, ${settings.contactInfo.address.state} ${settings.contactInfo.address.zipCode}` :
                      'Bengaluru, Karnataka 560054'
                    }
                  </p>
                </div>
                <button className="mt-4 text-accent hover:text-accent/80 font-medium transition-colors">
                  View on Google Maps
                </button>
              </div>

              {/* FAQ Section */}
              <div className="bg-muted/20 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "How long does a typical project take?",
                      a: "Project timelines vary based on scope, but most residential projects take 6-12 weeks from concept to completion."
                    },
                    {
                      q: "Do you work with existing furniture?",
                      a: "Absolutely! We love incorporating pieces you already own and love into the new design."
                    },
                    {
                      q: "What's included in the consultation?",
                      a: "Our consultation includes space assessment, style discussion, budget planning, and initial design concepts."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <h4 className="font-medium mb-2">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="text-center">
                <h3 className="font-semibold mb-4">Follow Our Journey</h3>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map(({ name, icon: Icon, href, color }) => (
                    <motion.a
                      key={name}
                      href={href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'w-12 h-12 bg-muted/30 hover:bg-muted/50 rounded-xl flex items-center justify-center transition-all duration-300',
                        color
                      )}
                      aria-label={name}
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Get daily inspiration and behind-the-scenes content
                  {!isFromAPI && <span className="ml-2 text-xs text-amber-600 opacity-75">(Demo Links)</span>}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}