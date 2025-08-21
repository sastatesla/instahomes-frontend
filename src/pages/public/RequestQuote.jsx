import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useSearchParams } from 'react-router-dom'
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  X, 
  Home, 
  Building2,
  Palette,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  IndianRupee
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { quoteAPI } from '../../lib/api'

const steps = [
  { id: 1, title: 'Project Type', description: 'Tell us about your project' },
  { id: 2, title: 'Project Details', description: 'Share your specific requirements' },
  { id: 3, title: 'Timeline & Budget', description: 'When and how much you want to spend' },
  { id: 4, title: 'Contact Info', description: 'How we can reach you' },
  { id: 5, title: 'Additional Info', description: 'Any extra details or files' }
]

const projectTypes = [
  {
    id: 'residential',
    title: 'Residential Design',
    description: 'Homes, apartments, condos',
    icon: Home,
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    id: 'commercial',
    title: 'Commercial Space',
    description: 'Offices, restaurants, retail',
    icon: Building2,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'consultation',
    title: 'Design Consultation',
    description: 'Expert advice and planning',
    icon: Users,
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'styling',
    title: 'Interior Styling',
    description: 'Staging, decor, styling',
    icon: Palette,
    gradient: 'from-purple-500 to-purple-600'
  }
]

const budgetRanges = [
  { id: 'under-10k', label: 'Under $10,000', value: 'under-10k' },
  { id: '10k-25k', label: '$10,000 - $25,000', value: '10k-25k' },
  { id: '25k-50k', label: '$25,000 - $50,000', value: '25k-50k' },
  { id: '50k-100k', label: '$50,000 - $100,000', value: '50k-100k' },
  { id: 'over-100k', label: 'Over $100,000', value: 'over-100k' },
  { id: 'not-sure', label: 'Not sure yet', value: 'not-sure' }
]

const timelineOptions = [
  { id: 'asap', label: 'As soon as possible', value: 'asap' },
  { id: '1-3-months', label: '1-3 months', value: '1-3-months' },
  { id: '3-6-months', label: '3-6 months', value: '3-6-months' },
  { id: '6-12-months', label: '6-12 months', value: '6-12-months' },
  { id: 'planning', label: 'Just planning ahead', value: 'planning' }
]

const step1Schema = z.object({
  projectType: z.string().min(1, 'Please select a project type')
})

const step2Schema = z.object({
  projectDescription: z.string().min(10, 'Please provide more details about your project'),
  propertyType: z.string().optional(),
  spaceSize: z.string().optional(),
  roomsInvolved: z.array(z.string()).optional()
})

const step3Schema = z.object({
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline')
})

const step4Schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().optional()
})

const step5Schema = z.object({
  additionalNotes: z.string().optional(),
  files: z.array(z.any()).optional(),
  communicationPreference: z.string().optional(),
  bestTimeToCall: z.string().optional()
})


export function RequestQuote() {
  const [searchParams] = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Handle URL parameters for pre-selected services
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      setFormData(prev => ({ ...prev, projectType: serviceParam }))
    }
  }, [searchParams])

  const getCurrentSchema = () => {
    switch (currentStep) {
      case 1: return step1Schema
      case 2: return step2Schema
      case 3: return step3Schema
      case 4: return step4Schema
      case 5: return step5Schema
      default: return step1Schema
    }
  }

  const { register, handleSubmit, formState: { errors }, trigger, getValues, setValue } = useForm({
    resolver: zodResolver(getCurrentSchema())
  })

  const nextStep = async () => {
    const isValid = await trigger()
    if (isValid) {
      const stepData = getValues()
      setFormData(prev => ({ ...prev, ...stepData }))
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const finalData = { ...formData, ...data }
      
      const response = await quoteAPI.submit(finalData, uploadedFiles)
      
      if (response.success) {
        setIsSubmitted(true)
      } else {
        console.error('Quote submission failed:', response.message)
        alert('Failed to submit quote request. Please try again.')
      }
    } catch (error) {
      console.error('Quote submission error:', error)
      alert('An error occurred while submitting your quote request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-pink-50 via-background to-blue-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg mx-auto text-center p-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">Quote Request Submitted!</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Thank you for your interest! We've received your quote request and will get back to you 
            within 24 hours with a detailed proposal and next steps.
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• You'll receive an email confirmation shortly</p>
            <p>• Our team will review your requirements</p>
            <p>• We'll schedule a consultation call</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="mt-8 modern-button text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-cream via-background to-sand">
      {/* Progress Header */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              Request Your Quote
            </h1>
            <p className="text-muted-foreground">
              Tell us about your project and we'll create a custom proposal for you
            </p>
          </motion.div>

          {/* Step Progress */}
          <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-0">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-gradient-primary text-primary-foreground shadow-lg'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {currentStep > step.id ? <Check size={16} /> : step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={cn(
                      'text-sm font-medium',
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 w-8 mx-4 transition-colors duration-300',
                      currentStep > step.id ? 'bg-green-500' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-soft"
                >
                  {/* Step 1: Project Type */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-2xl font-heading font-bold mb-2">What type of project do you have?</h2>
                      <p className="text-muted-foreground mb-8">Select the option that best describes your needs.</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {projectTypes.map((type) => (
                          <motion.label
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              'relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group',
                              formData.projectType === type.id
                                ? 'border-accent bg-accent/10 shadow-lg ring-2 ring-accent/20'
                                : 'border-border hover:border-accent/50 hover:shadow-md'
                            )}
                          >
                            <input
                              {...register('projectType')}
                              type="radio"
                              value={type.id}
                              className="sr-only"
                              onChange={(e) => {
                                setValue('projectType', e.target.value)
                                setFormData(prev => ({ ...prev, projectType: e.target.value }))
                              }}
                            />
                            {/* Selection Indicator */}
                            {formData.projectType === type.id && (
                              <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Check size={16} className="text-green-500" />
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-start space-x-4">
                              <div className={cn(
                                'w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r transition-transform duration-300',
                                type.gradient,
                                formData.projectType === type.id ? 'scale-110' : 'group-hover:scale-105'
                              )}>
                                <type.icon size={24} className="text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className={cn(
                                  'font-semibold text-lg mb-1 transition-colors',
                                  formData.projectType === type.id ? 'text-accent' : 'text-foreground'
                                )}>{type.title}</h3>
                                <p className="text-muted-foreground text-sm">{type.description}</p>
                              </div>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                      
                      {errors.projectType && (
                        <p className="text-red-500 text-sm mb-4">{errors.projectType.message}</p>
                      )}
                    </div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-2xl font-heading font-bold mb-2">Tell us about your project</h2>
                      <p className="text-muted-foreground mb-8">The more details you provide, the better we can help you.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Project Description *
                          </label>
                          <textarea
                            {...register('projectDescription')}
                            rows={4}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white resize-none focus:border-accent focus:outline-none"
                            placeholder="Describe your project in detail. What rooms are involved? What style are you looking for? What are your main goals?"
                          />
                          {errors.projectDescription && (
                            <p className="text-red-500 text-sm mt-1">{errors.projectDescription.message}</p>
                          )}
                        </div>

                        {formData.projectType === 'residential' && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Property Type</label>
                              <select
                                {...register('propertyType')}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                              >
                                <option value="">Select property type</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="condo">Condo</option>
                                <option value="townhouse">Townhouse</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Approximate Size</label>
                              <input
                                {...register('spaceSize')}
                                type="text"
                                placeholder="e.g., 1,500 sq ft"
                                className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Timeline & Budget */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-2xl font-heading font-bold mb-2">Timeline & Budget</h2>
                      <p className="text-muted-foreground mb-8">This helps us provide the most accurate proposal.</p>
                      
                      <div className="space-y-8">
                        <div>
                          <label className="block text-sm font-medium mb-4">Budget Range *</label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {budgetRanges.map((budget) => (
                              <motion.label
                                key={budget.id}
                                whileHover={{ scale: 1.02 }}
                                className={cn(
                                  'relative p-4 rounded-lg border cursor-pointer transition-all duration-200',
                                  formData.budget === budget.value
                                    ? 'border-green-500 bg-accent/10 shadow-md ring-2 ring-accent/20'
                                    : 'border-border hover:border-green-500/50 hover:shadow-sm'
                                )}
                              >
                                <input
                                  {...register('budget')}
                                  type="radio"
                                  value={budget.value}
                                  className="sr-only"
                                  onChange={(e) => {
                                    setValue('budget', e.target.value)
                                    setFormData(prev => ({ ...prev, budget: e.target.value }))
                                  }}
                                />
                                {/* Selection Indicator */}
                                {formData.budget === budget.value && (
                                  <div className="absolute top-2 right-2">
                                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                      <Check size={12} className="text-green-500" />
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-3">
                                  <IndianRupee size={20} className={cn(
                                    'transition-colors',
                                    formData.budget === budget.value ? 'text-accent' : 'text-muted-foreground'
                                  )} />
                                  <span className={cn(
                                    'font-medium transition-colors',
                                    formData.budget === budget.value ? 'text-accent' : 'text-foreground'
                                  )}>{budget.label}</span>
                                </div>
                              </motion.label>
                            ))}
                          </div>
                          {errors.budget && (
                            <p className="text-red-500 text-sm mt-2">{errors.budget.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-4">Timeline *</label>
                          <div className="space-y-2">
                            {timelineOptions.map((timeline) => (
                              <motion.label
                                key={timeline.id}
                                whileHover={{ scale: 1.01 }}
                                className={cn(
                                  'relative flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200',
                                  formData.timeline === timeline.value
                                    ? 'border-green-500 bg-accent/10 shadow-md ring-2 ring-accent/20'
                                    : 'border-border hover:border-accent/50 hover:shadow-sm'
                                )}
                              >
                                <input
                                  {...register('timeline')}
                                  type="radio"
                                  value={timeline.value}
                                  className="sr-only"
                                  onChange={(e) => {
                                    setValue('timeline', e.target.value)
                                    setFormData(prev => ({ ...prev, timeline: e.target.value }))
                                  }}
                                />
                                {/* Selection Indicator */}
                                {formData.timeline === timeline.value && (
                                  <div className="absolute top-2 right-2">
                                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                      <Check size={12} className="text-green-500" />
                                    </div>
                                  </div>
                                )}
                                
                                <Calendar size={16} className={cn(
                                  'transition-colors',
                                  formData.timeline === timeline.value ? 'text-accent' : 'text-muted-foreground'
                                )} />
                                <span className={cn(
                                  'font-medium transition-colors',
                                  formData.timeline === timeline.value ? 'text-accent' : 'text-foreground'
                                )}>{timeline.label}</span>
                              </motion.label>
                            ))}
                          </div>
                          {errors.timeline && (
                            <p className="text-red-500 text-sm mt-2">{errors.timeline.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Contact Information */}
                  {currentStep === 4 && (
                    <div>
                      <h2 className="text-2xl font-heading font-bold mb-2">Contact Information</h2>
                      <p className="text-muted-foreground mb-8">How can we reach you with your custom proposal?</p>
                      
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">First Name *</label>
                            <input
                              {...register('firstName')}
                              type="text"
                              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                              placeholder="Your first name"
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Last Name *</label>
                            <input
                              {...register('lastName')}
                              type="text"
                              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                              placeholder="Your last name"
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                            <input
                              {...register('email')}
                              type="email"
                              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                              placeholder="your@email.com"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <input
                              {...register('phone')}
                              type="tel"
                              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                              placeholder="+1 (555) 000-0000"
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Property Address</label>
                          <input
                            {...register('address')}
                            type="text"
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                            placeholder="Address where the project will take place"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Additional Information */}
                  {currentStep === 5 && (
                    <div>
                      <h2 className="text-2xl font-heading font-bold mb-2">Additional Information</h2>
                      <p className="text-muted-foreground mb-8">Any extra details that will help us serve you better.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Additional Notes</label>
                          <textarea
                            {...register('additionalNotes')}
                            rows={4}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-white resize-none focus:border-accent focus:outline-none"
                            placeholder="Any specific requirements, inspiration, or questions you have..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Upload Inspiration Photos or Floor Plans</label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-4">
                              Drag and drop files or click to browse
                            </p>
                            <input
                              type="file"
                              multiple
                              accept="image/*,.pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="file-upload"
                            />
                            <label
                              htmlFor="file-upload"
                              className="bg-accent text-accent-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-accent/90 transition-colors"
                            >
                              Choose Files
                            </label>
                          </div>
                          
                          {uploadedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                  <span className="text-sm">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                            <select
                              {...register('communicationPreference')}
                              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                            >
                              <option value="">Select preference</option>
                              <option value="email">Email</option>
                              <option value="phone">Phone Call</option>
                              <option value="text">Text Message</option>
                              <option value="any">Any method is fine</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Best Time to Call</label>
                            <select
                              {...register('bestTimeToCall')}
                              className="w-full px-4 py-3 border border-border rounded-lg bg-white focus:border-accent focus:outline-none"
                            >
                              <option value="">Select time</option>
                              <option value="morning">Morning (9AM-12PM)</option>
                              <option value="afternoon">Afternoon (12PM-5PM)</option>
                              <option value="evening">Evening (5PM-8PM)</option>
                              <option value="anytime">Anytime</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                    <div>
                      {currentStep > 1 ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={prevStep}
                          className="flex items-center space-x-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          <ArrowLeft size={20} />
                          <span>Previous</span>
                        </motion.button>
                      ) : (
                        <div />
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Step {currentStep} of {steps.length}
                    </div>

                    <div>
                      {currentStep < steps.length ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={nextStep}
                          className="flex items-center space-x-2 border text-black px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
                        >
                          <span>Next</span>
                          <ArrowRight size={20} />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                          className={cn(
                            'flex items-center space-x-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300',
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent/90'
                          )}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Request</span>
                              <ArrowRight size={20} />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}