import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Award, Heart, Home as HomeIcon, Building2, HardHat, Palette, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import heroBackground from '../../assets/images/spacejoy-9M66C_w_ToM-unsplash.jpg'

const stats = [
  { icon: Users, label: 'Happy Clients', value: '500+' },
  { icon: Award, label: 'Projects Completed', value: '1000+' },
  { icon: Star, label: 'Years Experience', value: '15+' },
  { icon: Heart, label: 'Design Awards', value: '25+' },
]

const homeServices = [
  {
    id: 'residential',
    title: 'Residential Design',
    description: 'Transform your home into a personalized sanctuary that reflects your lifestyle and preferences.',
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    features: ['Full home interior design', 'Kitchen & bathroom design', '3D visualization'],
  },
  {
    id: 'commercial',
    title: 'Commercial Spaces',
    description: 'Create inspiring work environments that boost productivity and enhance your brand image.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Office space planning', 'Restaurant & retail design', 'Brand integration'],
  },
  {
    id: 'prefab-construction',
    title: 'Prefab Construction',
    description: 'Modern prefabricated construction solutions from foundation to finishing touches.',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=800&q=80',
    features: ['Site preparation', 'Structural assembly', 'Interior finishing'],
  },
  {
    id: 'architecture-design',
    title: 'Architecture Design',
    description: 'Comprehensive architectural design services from concept to construction documentation.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    features: ['Conceptual design', '3D modeling', 'Construction drawings'],
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'The team transformed our space beyond our wildest dreams. Every detail was perfect!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'Professional, creative, and delivered exactly what we envisioned for our office space.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Restaurant Owner',
    content: 'They created an atmosphere that our customers absolutely love. Highly recommended!',
    rating: 5,
  },
]

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden  ">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackground})`
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 shimmer text-gradient  rounded-full text-sm font-medium mb-6 shadow-lg">
                ✨ Award-Winning Interior Design
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
            >
              Transform Your Space Into
              <span className="block text-gradient mt-2">
                Something Beautiful
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-amber-100 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              We create stunning, functional interiors that reflect your unique style and 
              enhance your daily life. From concept to completion, we bring your vision to reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/request-quote">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group modern-button text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>✨ Get Free Quote</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                >
                  View Portfolio
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-20 w-20 h-20 bg-accent/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-32 right-32 w-16 h-16 bg-terracotta/20 rounded-full hidden lg:block"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Trusted by Hundreds of Clients
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Our commitment to excellence has earned us the trust of clients across the region.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <stat.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
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
              What We Do Best
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From residential to commercial spaces, we offer comprehensive design solutions 
              tailored to your specific needs and vision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <CheckCircle size={12} className="text-accent flex-shrink-0" />
                          <span>{feature}</span>
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>View All Services</span>
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 border modern-card rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
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
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-gradient">
              Ready to Transform Your Space?
            </h2>
            <p className="text-accent-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life. Get in touch with us today for a free consultation.
            </p>
            <Link to="/request-quote">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button-border hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md"
              >
                Get Started Today 
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}