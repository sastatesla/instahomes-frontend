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
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAdminSettings } from '../../hooks/useSettings'
import { settingsAPI } from '../../lib/api'

const settingsSchema = z.object({
  // Company Information
  companyName: z.string().min(1, 'Company name is required'),
  companyTagline: z.string().optional(),
  companyDescription: z.string().optional(),
  
  // Contact Information
  contactInfo: z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional()
    }).optional(),
    businessHours: z.object({
      monday: z.string().optional(),
      tuesday: z.string().optional(),
      wednesday: z.string().optional(),
      thursday: z.string().optional(),
      friday: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional()
    }).optional()
  }),
  
  // Social Media
  socialMedia: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    pinterest: z.string().url().optional().or(z.literal(''))
  }).optional(),
  
  // SEO Settings
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().max(160, 'Meta description should be under 160 characters').optional(),
    keywords: z.array(z.string()).optional()
  }).optional(),
  
  // Features
  features: z.object({
    enableBlog: z.boolean().optional(),
    enablePortfolio: z.boolean().optional(),
    enableQuotes: z.boolean().optional(),
    enableNewsletterSignup: z.boolean().optional(),
    enableLiveChat: z.boolean().optional(),
    maintenanceMode: z.boolean().optional()
  }).optional()
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
  const [saveStatus, setSaveStatus] = useState(null) // 'success', 'error', null
  const [saveMessage, setSaveMessage] = useState('')

  // Fetch current settings
  const { data: currentSettings, isLoading, isFromAPI, refetch } = useAdminSettings()

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: '',
      companyTagline: '',
      companyDescription: '',
      contactInfo: {
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'United States'
        },
        businessHours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'Closed'
        }
      },
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        pinterest: ''
      },
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      },
      features: {
        enableBlog: true,
        enablePortfolio: true,
        enableQuotes: true,
        enableNewsletterSignup: true,
        enableLiveChat: false,
        maintenanceMode: false
      }
    }
  })

  // Populate form with current settings when loaded
  useEffect(() => {
    if (currentSettings) {
      reset({
        companyName: currentSettings.companyName || '',
        companyTagline: currentSettings.companyTagline || '',
        companyDescription: currentSettings.companyDescription || '',
        contactInfo: {
          email: currentSettings.contactInfo?.email || '',
          phone: currentSettings.contactInfo?.phone || '',
          address: {
            street: currentSettings.contactInfo?.address?.street || '',
            city: currentSettings.contactInfo?.address?.city || '',
            state: currentSettings.contactInfo?.address?.state || '',
            zipCode: currentSettings.contactInfo?.address?.zipCode || '',
            country: currentSettings.contactInfo?.address?.country || 'United States'
          },
          businessHours: {
            monday: currentSettings.contactInfo?.businessHours?.monday || '9:00 AM - 6:00 PM',
            tuesday: currentSettings.contactInfo?.businessHours?.tuesday || '9:00 AM - 6:00 PM',
            wednesday: currentSettings.contactInfo?.businessHours?.wednesday || '9:00 AM - 6:00 PM',
            thursday: currentSettings.contactInfo?.businessHours?.thursday || '9:00 AM - 6:00 PM',
            friday: currentSettings.contactInfo?.businessHours?.friday || '9:00 AM - 6:00 PM',
            saturday: currentSettings.contactInfo?.businessHours?.saturday || '10:00 AM - 4:00 PM',
            sunday: currentSettings.contactInfo?.businessHours?.sunday || 'Closed'
          }
        },
        socialMedia: {
          facebook: currentSettings.socialMedia?.facebook || '',
          instagram: currentSettings.socialMedia?.instagram || '',
          twitter: currentSettings.socialMedia?.twitter || '',
          linkedin: currentSettings.socialMedia?.linkedin || '',
          pinterest: currentSettings.socialMedia?.pinterest || ''
        },
        seo: {
          metaTitle: currentSettings.seo?.metaTitle || '',
          metaDescription: currentSettings.seo?.metaDescription || '',
          keywords: currentSettings.seo?.keywords || []
        },
        features: {
          enableBlog: currentSettings.features?.enableBlog ?? true,
          enablePortfolio: currentSettings.features?.enablePortfolio ?? true,
          enableQuotes: currentSettings.features?.enableQuotes ?? true,
          enableNewsletterSignup: currentSettings.features?.enableNewsletterSignup ?? true,
          enableLiveChat: currentSettings.features?.enableLiveChat ?? false,
          maintenanceMode: currentSettings.features?.maintenanceMode ?? false
        }
      })
    }
  }, [currentSettings, reset])

  const onSubmit = async (data) => {
    setIsSaving(true)
    setSaveStatus(null)
    setSaveMessage('')
    
    try {
      // Convert keywords string to array if needed
      const processedData = {
        ...data,
        seo: {
          ...data.seo,
          keywords: typeof data.seo?.keywords === 'string' 
            ? data.seo.keywords.split(',').map(k => k.trim()).filter(k => k)
            : data.seo?.keywords || []
        }
      }

      const response = await settingsAPI.update(processedData)
      
      if (response.success) {
        setSaveStatus('success')
        setSaveMessage('Settings saved successfully!')
        refetch() // Refresh settings data
      } else {
        throw new Error(response.message || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setSaveStatus('error')
      setSaveMessage(error.message || 'Failed to save settings. Please try again.')
    } finally {
      setIsSaving(false)
      // Clear status after 5 seconds
      setTimeout(() => {
        setSaveStatus(null)
        setSaveMessage('')
      }, 5000)
    }
  }

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'features', label: 'Features', icon: Settings }
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Configure your website settings and content</p>
        </div>
        
        <div className="bg-white rounded-xl border border-border p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 size={20} className="animate-spin" />
            <span>Loading settings...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold">Site Settings</h1>
          <p className="text-muted-foreground">
            Configure your website settings and content
            {!isFromAPI && <span className="ml-2 text-xs text-amber-600">(Demo Mode)</span>}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Status: {isFromAPI ? (
              <span className="text-green-600 font-medium">Live Database</span>
            ) : (
              <span className="text-amber-600 font-medium">Fallback Data</span>
            )}
          </p>
        </div>
      </div>

      {/* Status Message */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'px-4 py-3 rounded-lg border flex items-center space-x-2',
            saveStatus === 'success' 
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-red-100 text-red-700 border-red-200'
          )}
        >
          {saveStatus === 'success' ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span>{saveMessage}</span>
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
                    {...register('companyTagline')}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="Your company tagline"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Description</label>
                <textarea
                  {...register('companyDescription')}
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
                    {...register('contactInfo.email')}
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="info@yourcompany.com"
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactInfo.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    {...register('contactInfo.phone')}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Business Address</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Street</label>
                    <input
                      {...register('contactInfo.address.street')}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                      placeholder="123 Business Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      {...register('contactInfo.address.city')}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      {...register('contactInfo.address.state')}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      {...register('contactInfo.address.zipCode')}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Business Hours</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day}>
                      <label className="block text-sm font-medium mb-2 capitalize">{day}</label>
                      <input
                        {...register(`contactInfo.businessHours.${day}`)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                        placeholder="9:00 AM - 6:00 PM"
                      />
                    </div>
                  ))}
                </div>
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
                    {...register('socialMedia.facebook')}
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
                    {...register('socialMedia.instagram')}
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
                    {...register('socialMedia.twitter')}
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
                    {...register('socialMedia.linkedin')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                    <Globe size={16} className="text-red-600" />
                    <span>Pinterest</span>
                  </label>
                  <input
                    {...register('socialMedia.pinterest')}
                    type="url"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                    placeholder="https://pinterest.com/yourprofile"
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
                  {...register('seo.metaTitle')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="Your site title for search engines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <textarea
                  {...register('seo.metaDescription')}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white resize-none"
                  placeholder="Brief description of your site for search engines (max 160 characters)"
                />
                {errors.seo?.metaDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.seo.metaDescription.message}</p>
                )}
                <div className="text-sm text-muted-foreground mt-1">
                  {watch('seo.metaDescription')?.length || 0}/160 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords</label>
                <input
                  {...register('seo.keywords')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                  placeholder="interior design, home design, commercial design (separated by commas)"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter keywords separated by commas
                </p>
              </div>
            </motion.div>
          )}

          {/* Features Settings */}
          {activeTab === 'features' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold mb-4">Feature Settings</h2>
              <p className="text-muted-foreground mb-6">
                Enable or disable website features and functionality
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Blog Feature</h3>
                    <p className="text-sm text-muted-foreground">Enable the blog section and functionality</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('features.enableBlog')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Portfolio Feature</h3>
                    <p className="text-sm text-muted-foreground">Enable the portfolio section and gallery</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('features.enablePortfolio')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Quote Requests</h3>
                    <p className="text-sm text-muted-foreground">Enable quote request forms and functionality</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('features.enableQuotes')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Newsletter Signup</h3>
                    <p className="text-sm text-muted-foreground">Enable newsletter subscription forms</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('features.enableNewsletterSignup')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">Enable live chat widget functionality</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('features.enableLiveChat')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex-1">
                    <h3 className="font-medium text-red-800">Maintenance Mode</h3>
                    <p className="text-sm text-red-600">Put the website in maintenance mode</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('features.maintenanceMode')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-border mt-8">
            <button
              type="submit"
              disabled={isSaving || !isFromAPI}
              className={cn(
                'flex items-center space-x-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium transition-colors shadow-sm hover:shadow-md',
                (isSaving || !isFromAPI) && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              <span>
                {isSaving ? 'Saving...' : 
                 !isFromAPI ? 'Save Settings (Demo Mode)' : 
                 'Save Settings'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}