import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Settings, 
  Save,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Search,
  Tag,
  Palette,
  Eye,
  Users,
  MessageCircle
} from 'lucide-react'
import { cn } from '../../lib/utils'

const settingsSchema = z.object({
  // Company Information
  companyName: z.string().min(1, 'Company name is required'),
  tagline: z.string().optional(),
  description: z.string().optional(),
  
  // Contact Information
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  
  // Social Media
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  
  // SEO Settings
  metaTitle: z.string().optional(),
  metaDescription: z.string().max(160, 'Meta description should be under 160 characters').optional(),
  keywords: z.string().optional(),
  
  // Business Settings
  businessHours: z.string().optional(),
  services: z.string().optional(),
})

const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors',
      active 
        ? 'bg-accent text-accent-foreground' 
        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    )}
  >
    <Icon size={16} />
    <span>{children}</span>
  </button>
)

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('company')
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: 'Interior Design Studio',
      tagline: 'Creating Beautiful Spaces',
      description: 'We specialize in creating stunning interior designs that reflect your personality and lifestyle.',
      email: 'info@interiordesignstudio.com',
      phone: '+1 (555) 123-4567',
      address: '123 Design Street, Creative City, CC 12345',
      website: 'https://interiordesignstudio.com',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      metaTitle: 'Interior Design Studio - Creating Beautiful Spaces',
      metaDescription: 'Professional interior design services for residential and commercial spaces. Transform your space with our expert design team.',
      keywords: 'interior design, home design, commercial design, renovation',
      businessHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      services: 'Residential Design, Commercial Design, Space Planning, Color Consultation, Furniture Selection'
    }
  })

  const onSubmit = async (data) => {
    setIsSaving(true)
    try {
      // This would need backend implementation
      // await settingsAPI.update(data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSavedMessage('Settings saved successfully!')
      setTimeout(() => setSavedMessage(''), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'business', label: 'Business', icon: MessageCircle }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Configure your website settings and content</p>
      </div>

      {/* Success Message */}
      {savedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 px-4 py-3 rounded-lg border border-green-200"
        >
          {savedMessage}
        </motion.div>
      )}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-border p-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Company Information */}
          {activeTab === 'company' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold mb-4">Company Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name *</label>
                  <input
                    {...register('companyName')}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="Your Company Name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tagline</label>
                  <input
                    {...register('tagline')}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="Your company tagline"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Brief description of your company and services"
                />
              </div>
            </motion.div>
          )}

          {/* Contact Information */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="info@yourcompany.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Address</label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="123 Business Street, City, State, ZIP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website URL</label>
                <input
                  {...register('website')}
                  type="url"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="https://yourwebsite.com"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Facebook size={16} className="text-blue-600" />
                    <span>Facebook</span>
                  </label>
                  <input
                    {...register('facebook')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Instagram size={16} className="text-pink-600" />
                    <span>Instagram</span>
                  </label>
                  <input
                    {...register('instagram')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Twitter size={16} className="text-blue-400" />
                    <span>Twitter</span>
                  </label>
                  <input
                    {...register('twitter')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://twitter.com/yourprofile"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Linkedin size={16} className="text-blue-700" />
                    <span>LinkedIn</span>
                  </label>
                  <input
                    {...register('linkedin')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Youtube size={16} className="text-red-600" />
                    <span>YouTube</span>
                  </label>
                  <input
                    {...register('youtube')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://youtube.com/channel/yourchannel"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Meta Title</label>
                <input
                  {...register('metaTitle')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Your site title for search engines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <textarea
                  {...register('metaDescription')}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Brief description of your site for search engines (max 160 characters)"
                />
                {errors.metaDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>
                )}
                <div className="text-sm text-muted-foreground mt-1">
                  {watch('metaDescription')?.length || 0}/160 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords</label>
                <input
                  {...register('keywords')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="interior design, home design, commercial design (separated by commas)"
                />
              </div>
            </motion.div>
          )}

          {/* Business Settings */}
          {activeTab === 'business' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold mb-4">Business Information</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Business Hours</label>
                <input
                  {...register('businessHours')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Services Offered</label>
                <textarea
                  {...register('services')}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="List your main services (separated by commas)"
                />
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-border mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className={cn(
                'flex items-center space-x-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium transition-colors',
                isSaving && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Save size={16} />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}