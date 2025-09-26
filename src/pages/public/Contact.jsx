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
        settings?.contactInfo?.phone || '84891 11000, 8971100172',
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
    { name: 'Instagram', icon: Instagram, href: settings?.socialMedia?.instagram || 'https://www.instagram.com/vrikshaa_space_creation?igsh=c3hkMXc2czI1dWxj', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: settings?.socialMedia?.facebook || 'https://www.facebook.com/share/1BU8SGiyxX/', color: 'hover:text-blue-600' },
    { name: 'LinkedIn', icon: Linkedin, href: settings?.socialMedia?.linkedin || 'https://www.linkedin.com/in/shakila-dhanasekar-96aab1340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', color: 'hover:text-blue-700' }
  ].filter(link => link.href !== '#' && link.href)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      projectType: 'residential'
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await contactAPI.submitContact(data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting contact form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-cream via-background to-sand">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">
            Thank You!
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="modern-button text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-background to-sand py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block text-accent font-semibold mb-4">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Let's Create Something
              <span className="block text-gradient">Amazing Together</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Ready to transform your space? We'd love to hear about your project and discuss how we can bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pt-2 pb-20 bg-white">
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
                  {info.details.map((detail, idx) => {
                    if (info.title === 'Call Us' && idx === 0) {
                      return (
                        <div key={idx} className="space-y-1">
                          <p>
                            <a href="tel:8489111000" className="hover:text-primary cursor-pointer transition-colors">84891 11000</a>
                          </p>
                          <p>
                            <a href="tel:8971100172" className="hover:text-primary cursor-pointer transition-colors">8971100172</a>
                          </p>
                        </div>
                      );
                    }
                    if (info.title === 'Email Us' && idx === 0) {
                      return (
                        <p key={idx}>
                          <a href="mailto:info@vrikshaa.com" className="hover:text-primary cursor-pointer transition-colors">{detail}</a>
                        </p>
                      );
                    }
                    return <p key={idx}>{detail}</p>;
                  })}
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
              className="modern-card p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent bg-white transition-colors"
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
                      {...register('email', { required: 'Email is required' })}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent bg-white transition-colors"
                      placeholder="your.email@example.com"
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
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Type *
                    </label>
                    <select
                      {...register('projectType')}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent bg-white transition-colors"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
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
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent bg-white transition-colors"
                    placeholder="What's this about?"
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
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-accent bg-white transition-colors resize-none"
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
                  className="w-full modern-button text-primary-foreground py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Google Maps */}
              <div className="modern-card p-8">
                <h3 className="text-xl font-heading font-bold mb-4">Visit Our Studio</h3>
                <div className="rounded-lg overflow-hidden h-64 border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234567890!2d77.1234567890!3d12.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s14.54%2C%20Ground%20Floor%2C%201st%20Main%20Road%2C%20Opp.%20MSR%20Plaza%2C%20Mathikere%2C%20Bengaluru%2C%20Karnataka%20560054!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vrikshaa Space Creation Location"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {settings?.contactInfo?.address?.street || '14. 54, Ground Floor, 1st Main Road, Opp. MSR Plaza, Mathikere'}, 
                  {settings?.contactInfo?.address?.city || 'Bengaluru'}, 
                  {settings?.contactInfo?.address?.state || 'Karnataka'} 
                  {settings?.contactInfo?.address?.zipCode || '560054'}
                </p>
                <div className="mt-4">
                  <a
                    href="https://maps.app.goo.gl/pG83GJNm5EnHJNnn9?g_st=ipc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    <MapPin size={16} />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="modern-card p-8">
                <h3 className="text-xl font-heading font-bold mb-4">Follow Us</h3>
                <p className="text-muted-foreground mb-6">
                  Stay updated with our latest projects and design inspiration.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map(({ name, icon: Icon, href, color }) => (
                    <motion.a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-muted/20 hover:bg-muted/40 rounded-lg flex items-center justify-center transition-all duration-300 ${color}`}
                      aria-label={name}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
