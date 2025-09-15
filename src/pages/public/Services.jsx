import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  Home, 
  Building2, 
  HardHat,
  Palette,
  Shield,
  Zap,
  Grid3X3,
  Layers,
  DoorOpen,
  Square,
  Paintbrush,
  PanelBottom
} from 'lucide-react'
import { fadeInVariants, staggerChildren } from '../../lib/utils'
// Import new organized assets
import prefab1 from '../../assets/Prefab Homez/119b65fe-acac-47b2-a4e8-6392455937ca.jpg'
import prefab2 from '../../assets/Prefab Homez/20221118_170752.jpg'
import prefab3 from '../../assets/Prefab Homez/IMG_0501.JPG'
import prefab4 from '../../assets/Prefab Homez/IMG_0707.JPG'
import prefab5 from '../../assets/Prefab Homez/IMG_0710.jpg'

// Modular Kitchen
import modularkitchen1 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modern__0.jpg'
import modularkitchen2 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modular_0.jpg'
import modularkitchen3 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modular_1.jpg'
import modularkitchen4 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modular_2.jpg'

// Gypsum Ceiling
import gypsumceiling1 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_0.jpg'
import gypsumceiling2 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_1.jpg'
import gypsumceiling3 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_2.jpg'
import gypsumceiling4 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_3.jpg'

// Painting
import interior1 from '../../assets/Painting/Interior 1.jpeg'
import interior2 from '../../assets/Painting/Interior 3.jpeg'
import interior3 from '../../assets/Painting/Interior 4.jpeg'
import interior4 from '../../assets/Painting/Interior 6.jpg'
import interior5 from '../../assets/Painting/Interior 7.jpg'
import exterior1 from '../../assets/Painting/Exterior 1.jpg'
import exterior2 from '../../assets/Painting/Exterior 2.jpg'
import exterior3 from '../../assets/Painting/Exterior 3.jpg'
import exterior4 from '../../assets/Painting/Exterior 4.jpg'

// uPVC Windows
import upvc1 from '../../assets/uPVC Windows images/Living Room/Flux_Schnell_A_cozy_modern_living_room_with_large_white_uPVC_s_0.jpg'
import upvc2 from '../../assets/uPVC Windows images/Bed room/Flux_Schnell_A_luxurious_bedroom_with_large_white_uPVC_sliding_0.jpg'

// Soffit Panels
import soffit1 from '../../assets/Soffit Panels/Celing/WhatsApp Image 2025-07-02 at 3.38.07 PM.jpeg'
import soffit2 from '../../assets/Soffit Panels/Floor/WhatsApp Image 2025-09-01 at 11.22.51 AM.jpeg'
import soffit3 from '../../assets/Soffit Panels/Wall/Flux_Schnell_Ultrarealistic_modern_living_room_interior_featur_0.jpg'

// Wall Stencil
import wallstencil1 from '../../assets/Wall Stencil/Wall stencil 1.jpg'
import wallstencil2 from '../../assets/Wall Stencil/Wall Stencil 2.jpg'
import wallstencil3 from '../../assets/Wall Stencil/Flux_Schnell_a_stunning_illustration_of_an_interior_wall_with__2.jpg'
import wallstencil4 from '../../assets/Wall Stencil/Flux_Schnell_a_stunning_illustration_of_an_interior_wall_with__3.jpg'

// Wall Texture
import walltexture1 from '../../assets/Wall Texture/Texture 1.jpg'
import walltexture2 from '../../assets/Wall Texture/Texture 2.webp'
import walltexture3 from '../../assets/Wall Texture/Texture 3.jpg'

// Waterproofing
import waterproofing1 from '../../assets/Waterproofing/terrace-waterproofing-1000x1000.webp'
import waterproofing2 from '../../assets/Waterproofing/Water proofing.jpg'
import waterproofing3 from '../../assets/Waterproofing/WhatsApp Image 2024-07-11 at 10.48.08 PM.jpeg'

// VOX
import voxImage from '../../assets/vox.jpg'

// Our Services - Updated with new organized assets
const ourServices = [
  {
    id: 'prefab-homes',
    title: 'Prefab Homes',
    description: 'Modern prefabricated home solutions with luxury finishes and contemporary design.',
    icon: Building2,
    images: [prefab2, prefab2, prefab3, prefab4, prefab5],
    included: ['Structural design', 'Premium materials', 'Modern layouts', 'Smart home integration', 'Quality assurance']
  },
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    description: 'Custom modular kitchen designs with premium finishes and smart storage solutions.',
    icon: Grid3X3,
    images: [modularkitchen1, modularkitchen2, modularkitchen3, modularkitchen4],
    included: ['Custom design', 'Premium materials', 'Smart storage', 'Professional installation', 'Quality hardware']
  },
  {
    id: 'gypsum-ceiling',
    title: 'Gypsum Ceiling',
    description: 'Elegant gypsum ceiling designs for sophisticated interiors with perfect finishing.',
    icon: Layers,
    images: [gypsumceiling1, gypsumceiling2, gypsumceiling3, gypsumceiling4],
    included: ['Custom designs', 'Professional installation', 'Smooth finishing', 'Paint application', 'Lighting provision']
  },
  {
    id: 'painting',
    title: 'Interior Painting',
    description: 'Professional interior painting services with premium finishes and color consultation.',
    icon: Paintbrush,
    images: [interior1, interior2, interior3, interior4, interior5],
    included: ['Surface preparation', 'Primer application', 'Multiple coat application', 'Color consultation', 'Quality finish']
  },
 
  {
    id: 'upvc-windows',
    title: 'uPVC Windows',
    description: 'Energy-efficient uPVC windows with superior insulation and modern aesthetics.',
    icon: Square,
    images: [upvc1, upvc2],
    included: ['Custom sizing', 'Professional installation', 'Weather sealing', 'Hardware fitting', 'Energy efficiency']
  },
  {
    id: 'soffit-panels',
    title: 'Soffit Panels',
    description: 'High-quality soffit panels for ceiling, floor, and wall applications with modern aesthetics.',
    icon: PanelBottom,
    images: [soffit1, soffit2, soffit3],
    included: ['Ceiling panels', 'Floor panels', 'Wall panels', 'Professional installation', 'Custom sizing']
  },
  {
    id: 'wall-stencil',
    title: 'Wall Stencil',
    description: 'Creative wall stenciling services to add artistic patterns and designs to your walls.',
    icon: Palette,
    images: [wallstencil2, wallstencil1, wallstencil3, wallstencil4],
    included: ['Custom design patterns', 'Professional application', 'Color coordination', 'Surface preparation', 'Artistic finishing']
  },
  {
    id: 'wall-texture',
    title: 'Wall Texture',
    description: 'Premium wall texture solutions to enhance your interior and exterior walls.',
    icon: Paintbrush,
    images: [walltexture1, walltexture2, walltexture3],
    included: ['Texture design', 'Surface preparation', 'Professional application', 'Color matching', 'Quality finishing']
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing',
    description: 'Comprehensive waterproofing solutions to protect your property from water damage.',
    icon: Shield,
    images: [waterproofing2, waterproofing2, waterproofing3],
    included: ['Surface assessment', 'Membrane application', 'Joint sealing', 'Drainage systems', 'Quality testing']
  },
 
]

// Main Services - Residential and Commercial
const mainServices = [
  {
    id: 'residential',
    title: 'Residential Design',
    description: 'Transform your home into a personalized sanctuary that reflects your lifestyle and preferences.',
    icon: Home,
    features: [
      'Full home interior design',
      'Room-by-room makeovers',
      'Kitchen & bathroom design',
      'Bedroom & living space design',
      'Outdoor living spaces',
      '3D visualization & renderings'
    ],
    gradient: 'from-pink-500 to-pink-400',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'commercial',
    title: 'Commercial Spaces',
    description: 'Create inspiring work environments that boost productivity and enhance your brand image.',
    icon: Building2,
    features: [
      'Office space planning',
      'Restaurant & retail design',
      'Hotel & hospitality design',
      'Healthcare facility design',
      'Co-working space design',
      'Brand integration & signage'
    ],
    price: 'Custom pricing',
    gradient: 'from-blue-500 to-blue-400',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  }
]

// Additional Services - Specialized Construction Services
const additionalServices = [
  {
    id: 'prefab-penthouse',
    title: 'Prefab Penthouse',
    description: 'Modern prefabricated penthouse solutions with luxury finishes and contemporary design.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    included: ['Structural design', 'Premium materials', 'Modern layouts', 'Rooftop amenities', 'Smart home integration']
  },
  {
    id: 'turnkey-prefab',
    title: 'Turnkey Prefab Construction',
    description: 'Complete prefabricated construction solutions from foundation to finishing touches.',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=800&q=80',
    included: ['Site preparation', 'Foundation work', 'Structural assembly', 'Utility connections', 'Interior finishing']
  },
  {
    id: 'architecture-design',
    title: 'Architecture Design',
    description: 'Comprehensive architectural design services from concept to construction documentation.',
    icon: Grid3X3,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    included: ['Conceptual design', 'Construction drawings', '3D modeling', 'Permit assistance', 'Site supervision']
  },
  {
    id: 'mep-solutions',
    title: 'MEP Solutions',
    description: 'Mechanical, Electrical, and Plumbing solutions for residential and commercial projects.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    included: ['System design', 'Installation', 'Testing & commissioning', 'Maintenance planning', 'Energy efficiency']
  },
  {
    id: 'modular-flush-doors',
    title: 'Modular Flush Doors',
    description: 'High-quality modular flush doors with premium finishes and modern hardware.',
    icon: DoorOpen,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    included: ['Custom sizing', 'Hardware installation', 'Frame fitting', 'Finishing work', 'Quality assurance']
  },
  {
    id: 'glass-partition',
    title: 'Glass Partition',
    description: 'Modern glass partition systems for office spaces and contemporary residential interiors.',
    icon: Square,
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80',
    included: ['Design consultation', 'Tempered glass supply', 'Aluminum framing', 'Professional installation', 'Safety compliance']
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We discuss your vision, needs, budget, and timeline to understand your project goals.',
  },
  {
    number: '02',
    title: 'Design Concept',
    description: 'We create initial design concepts and technical drawings for your review and feedback.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'We develop detailed plans, select materials, and coordinate with specialized teams.',
  },
  {
    number: '04',
    title: 'Implementation',
    description: 'We execute the project with our skilled craftsmen and quality control processes.',
  },
  {
    number: '05',
    title: 'Final Handover',
    description: 'We complete final inspections and hand over your perfectly finished project.',
  }
]

export function Services() {
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
            <span className="inline-block text-accent font-semibold mb-4">Our Services</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Comprehensive Design &
              <span className="block text-gradient">Construction Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              From residential interiors to commercial spaces and specialized construction services, 
              we provide end-to-end solutions for all your design and building needs.
            </p>
            <Link to="/request-quote">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 shimmer"
              >
                <span>✨ Get Started Today</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Services - Residential & Commercial */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Primary Services</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              We Work For Residential Design & Commercial Spaces
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our core expertise lies in creating beautiful, functional spaces for both residential and commercial clients.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInVariants}
                whileHover={{ y: -10 }}
                className="group modern-card overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <service.icon size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 text-sm">
                        <CheckCircle size={16} className="text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Pricing</p>
                      <p className="font-semibold text-accent">{service.price}</p>
                    </div>
                    <Link to={`/request-quote?service=${service.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:shadow-lg"
                      >
                        <span>Get Quote</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Comprehensive Construction & Design Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From prefab solutions to specialized installations, we offer comprehensive services for modern construction needs.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {ourServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.images[0]} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <service.icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3 text-foreground">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.included.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <CheckCircle size={12} className="text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={`/request-quote?service=${service.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Get Quote</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Specialized Services</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Advanced Construction & Design Solutions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Beyond our core services, we offer specialized construction and design solutions for complex projects.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <service.icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3 text-foreground">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.included.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <CheckCircle size={12} className="text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={`/request-quote?service=${service.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Get Quote</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              How We Deliver Excellence
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Our proven 5-step process ensures your project runs smoothly from initial 
              concept to final handover.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-accent-foreground font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-accent-foreground/90 text-lg mb-8 leading-relaxed">
              Let's discuss your requirements and create something exceptional together. 
              Get in touch for a free consultation and personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-quote">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-foreground hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-medium"
                >
                  Request Quote
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-accent-foreground/20 hover:bg-accent-foreground/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}