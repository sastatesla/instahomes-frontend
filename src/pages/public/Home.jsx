import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, Users, Award, Heart, Home as HomeIcon, Building2, HardHat, Palette, CheckCircle, X, ChevronLeft, ChevronRight, PanelBottom, Grid3X3, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { useState, useEffect } from 'react'
import heroBackground from '../../assets/spacejoy-9M66C_w_ToM-unsplash.jpg'
import upvcBackground from '../../assets/uPVC Windows images/Living Room/Flux_Schnell_A_cozy_modern_living_room_with_large_white_uPVC_s_1.jpg'
import asianPaintsLogo from '../../assets/brandslogo/asianpaints.jpg'
import birlaOpusLogo from '../../assets/brandslogo/birlaopus.jpg'
import unicellLogo from '../../assets/brandslogo/unicell.jpg'
import voxLogo from '../../assets/brandslogo/voxlogo.jpg'
import alfaLogo from '../../assets/brandslogo/Alfalogo.png'

// Gallery Images from actual asset folders
// Gypsum Ceiling Images
import gypsum1 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_0.jpg'
import gypsum2 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_1.jpg'
import gypsum3 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_2.jpg'
import gypsum4 from '../../assets/Gypsum Ceiling/Flux_Schnell_a_stunning_illustration_of_Gypsum_False_Ceiling_P_3.jpg'

// Modular Kitchen Images
import kitchen1 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modern__0.jpg'
import kitchen2 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modular_0.jpg'
import kitchen3 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modular_1.jpg'
import kitchen4 from '../../assets/Modular Kitchen/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_modular_2.jpg'

// Painting Images
import painting1 from '../../assets/Painting/Exterior 1.jpg'
import painting2 from '../../assets/Painting/Exterior 2.jpg'
import painting3 from '../../assets/Painting/Exterior 3.jpg'
import painting4 from '../../assets/Painting/Interior 1.jpeg'
import painting5 from '../../assets/Painting/Interior 3.jpeg'

// Prefab Home Images
import prefab1 from '../../assets/Prefab Homez/IMG_0501.JPG'
import prefab2 from '../../assets/Prefab Homez/IMG_0707.JPG'
import prefab3 from '../../assets/Prefab Homez/IMG_0710.jpg'
import prefab4 from '../../assets/Prefab Homez/IMG_0717.jpg'

// uPVC Windows Images - Living Room
import upvc1 from '../../assets/uPVC Windows images/Living Room/Flux_Schnell_A_cozy_modern_living_room_with_large_white_uPVC_s_0.jpg'
import upvc2 from '../../assets/uPVC Windows images/Living Room/Flux_Schnell_A_cozy_modern_living_room_with_large_white_uPVC_s_1.jpg'

// uPVC Windows Images - Bedroom
import upvc3 from '../../assets/uPVC Windows images/Bed room/Flux_Schnell_BedroomPromptA_calm_bedroom_with_big_uPVC_casemen_0.jpg'
import upvc4 from '../../assets/uPVC Windows images/Bed room/Flux_Schnell_BedroomPromptA_calm_bedroom_with_big_uPVC_casemen_1.jpg'
import upvc5 from '../../assets/uPVC Windows images/Bed room/Flux_Schnell_BedroomPromptA_calm_bedroom_with_big_uPVC_casemen_2.jpg'

// uPVC Windows Images - Exterior View
import upvc6 from '../../assets/uPVC Windows images/Exterior View/Flux_Schnell_Exterior_ViewPromptA_contemporary_house_exterior__0.jpg'

// uPVC Windows Images - Office
import upvc7 from '../../assets/uPVC Windows images/Office/Flux_Schnell_Office__WorkspacePromptA_stylish_office_space_wit_0.jpg'

// Wall Texture Images
import wallTexture1 from '../../assets/Wall Texture/Texture 1.jpg'
import wallTexture2 from '../../assets/Wall Texture/Texture 2.webp'
import wallTexture3 from '../../assets/Wall Texture/Texture 3.jpg'
import wallTexture4 from '../../assets/Wall Texture/Texture 4.jpg'

// Soffit Panels Images
import soffit1 from '../../assets/Soffit Panels/Celing/Flux_Schnell_a_stunning_illustration_of_Ultrarealistic_exterio_3.jpg'
import soffit2 from '../../assets/Soffit Panels/Celing/th (13).jpg'

// VOX Images
import voxImage from '../../assets/vox.jpg'
import voxImage2 from '../../assets/voximage.jpg'

// First 4 Services from Services page
const homeServices = [
  {
    id: 'prefab-homes',
    title: 'Prefab Homes',
    description: 'Modern prefabricated home solutions with luxury finishes and contemporary design.',
    icon: Building2,
    image: prefab1,
    features: ['Structural design', 'Premium materials', 'Modern layouts', 'Smart home integration', 'Quality assurance']
  },
  {
    id: 'upvc-soffit-panels',
    title: 'uPVC Soffit Panels',
    description: 'High-quality soffit panels for ceiling, floor, and wall applications with modern aesthetics.',
    icon: PanelBottom,
    image: soffit1,
    features: ['Ceiling panels', 'Floor panels', 'Wall panels', 'Professional installation', 'Custom sizing']
  },
  {
    id: 'modular-kitchens',
    title: 'Modular Kitchens',
    description: 'Custom modular kitchen designs with premium finishes and smart storage solutions.',
    icon: Grid3X3,
    image: kitchen1,
    features: ['Custom design', 'Premium materials', 'Smart storage', 'Professional installation', 'Quality hardware']
  },
  {
    id: 'gypsum-ceiling',
    title: 'Gypsum Ceiling',
    description: 'Elegant gypsum ceiling designs for sophisticated interiors with perfect finishing.',
    icon: Layers,
    image: gypsum1,
    features: ['Custom designs', 'Professional installation', 'Smooth finishing', 'Paint application', 'Lighting provision']
  }
]

const stats = [
  { icon: Users, label: 'Happy Clients', value: '40+' },
  { icon: Award, label: 'Projects Completed', value: '100+' },
  { icon: Heart, label: 'Ongoing Projects', value: '25+' },
  { icon: Star, label: 'Years Experience', value: '6+' },
]


// Create a shuffled, mixed category gallery starting with VOX
const allImages = [
  // VOX Images (First)
  { id: 1, src: voxImage, alt: 'VOX Systems', category: 'VOX Systems' },
  { id: 2, src: voxImage2, alt: 'VOX Systems 2', category: 'VOX Systems' },
  
  // Gypsum Ceiling Images
  { id: 3, src: gypsum1, alt: 'Gypsum Ceiling Design 1', category: 'Gypsum Ceiling' },
  { id: 4, src: gypsum2, alt: 'Gypsum Ceiling Design 2', category: 'Gypsum Ceiling' },
  { id: 5, src: gypsum3, alt: 'Gypsum Ceiling Design 3', category: 'Gypsum Ceiling' },
  { id: 6, src: gypsum4, alt: 'Gypsum Ceiling Design 4', category: 'Gypsum Ceiling' },
  
  // Modular Kitchen Images
  { id: 7, src: kitchen1, alt: 'Modular Kitchen Design 1', category: 'Modular Kitchen' },
  { id: 8, src: kitchen2, alt: 'Modular Kitchen Design 2', category: 'Modular Kitchen' },
  { id: 9, src: kitchen3, alt: 'Modular Kitchen Design 3', category: 'Modular Kitchen' },
  { id: 10, src: kitchen4, alt: 'Modular Kitchen Design 4', category: 'Modular Kitchen' },
  
  // Painting Images
  { id: 11, src: painting1, alt: 'Exterior Painting 1', category: 'Painting' },
  { id: 12, src: painting2, alt: 'Exterior Painting 2', category: 'Painting' },
  { id: 13, src: painting3, alt: 'Exterior Painting 3', category: 'Painting' },
  { id: 14, src: painting4, alt: 'Interior Painting 1', category: 'Painting' },
  { id: 15, src: painting5, alt: 'Interior Painting 2', category: 'Painting' },
  
  // Prefab Home Images
  { id: 16, src: prefab1, alt: 'Prefab Home 1', category: 'Prefab Homes' },
  { id: 17, src: prefab2, alt: 'Prefab Home 2', category: 'Prefab Homes' },
  { id: 18, src: prefab3, alt: 'Prefab Home 3', category: 'Prefab Homes' },
  { id: 19, src: prefab4, alt: 'Prefab Home 4', category: 'Prefab Homes' },
  
  // uPVC Windows Images
  { id: 20, src: upvc1, alt: 'uPVC Windows Living Room 1', category: 'uPVC Windows' },
  { id: 21, src: upvc2, alt: 'uPVC Windows Living Room 2', category: 'uPVC Windows' },
  { id: 22, src: upvc3, alt: 'uPVC Windows Bedroom 1', category: 'uPVC Windows' },
  { id: 23, src: upvc4, alt: 'uPVC Windows Bedroom 2', category: 'uPVC Windows' },
  { id: 24, src: upvc5, alt: 'uPVC Windows Bedroom 3', category: 'uPVC Windows' },
  { id: 25, src: upvc6, alt: 'uPVC Windows Exterior', category: 'uPVC Windows' },
  { id: 26, src: upvc7, alt: 'uPVC Windows Office', category: 'uPVC Windows' },
  
  // Wall Texture Images
  { id: 27, src: wallTexture1, alt: 'Wall Texture 1', category: 'Wall Texture' },
  { id: 28, src: wallTexture2, alt: 'Wall Texture 2', category: 'Wall Texture' },
  { id: 29, src: wallTexture3, alt: 'Wall Texture 3', category: 'Wall Texture' },
  { id: 30, src: wallTexture4, alt: 'Wall Texture 4', category: 'Wall Texture' },
  
  // Soffit Panels Images
  { id: 31, src: soffit1, alt: 'Soffit Panels Ceiling 1', category: 'Soffit Panels' },
  { id: 32, src: soffit2, alt: 'Soffit Panels Ceiling 2', category: 'Soffit Panels' },
]

// Shuffle function to randomize order while keeping VOX first
const shuffleArray = (array) => {
  const shuffled = [...array]
  // Keep VOX images at the beginning
  const voxImages = shuffled.splice(0, 2)
  // Shuffle the rest
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  // Put VOX images back at the beginning
  return [...voxImages, ...shuffled]
}

const galleryImages = shuffleArray(allImages)

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const isMobile = window.innerWidth < 768
        const step = isMobile ? 1 : 4
        const nextIndex = prev + step
        return nextIndex >= galleryImages.length ? 0 : nextIndex
      })
    }, 4000) // Change images every 4 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsPlaying(false) // Pause carousel when modal opens
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
    setIsPlaying(true) // Resume carousel when modal closes
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => {
      const isMobile = window.innerWidth < 768
      const step = isMobile ? 1 : 4
      const prevIndex = prev - step
      return prevIndex < 0 ? Math.max(0, galleryImages.length - step) : prevIndex
    })
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => {
      const isMobile = window.innerWidth < 768
      const step = isMobile ? 1 : 4
      const nextIndex = prev + step
      return nextIndex >= galleryImages.length ? 0 : nextIndex
    })
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${upvcBackground})`
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto pt-16 sm:pt-20 md:pt-28 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="  mt-20 sm:mt-20"
            >
                <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-600 shimmer rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg text-white">
                  ✨ Your Space , Our Expertise
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              Transform Your Space Into
              <span className="block text-gradient mt-1 sm:mt-2">
                Something Beautiful
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-lg text-amber-100 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed"
            >
              Partnering with:
            </motion.p>

            {/* Brand Logos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex lg:flex-wrap justify-center items-center gap-1 xs:gap-2 sm:gap-4 md:gap-8 mb-6 sm:mb-10 px-1 overflow-hidden"
            >
              {/* Mobile & Tablet Carousel Container */}
              <div className="flex lg:hidden animate-scroll">
                {/* First Set of Logos */}
                {/* VOX Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex flex-col items-center justify-center text-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={voxLogo} 
                    alt="VOX" 
                    className="h-4 w-auto object-contain mb-1"
                  />
                  <p className="text-[10px] text-gray-600 font-medium leading-tight px-1 break-words">
                    Ceilings | Floors | Walls
                  </p>
                </motion.div>
                
                {/* Unicell Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={unicellLogo} 
                    alt="Unicell" 
                    className="h-5 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Asian Paints Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={asianPaintsLogo} 
                    alt="Asian Paints" 
                    className="h-12 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Birla Opus Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={birlaOpusLogo} 
                    alt="Birla Opus" 
                    className="h-6 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Alfa Logo with GLOBAL ITP U.S.A. text */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex flex-col items-center justify-center text-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={alfaLogo} 
                    alt="Alfa" 
                    className="h-4 w-auto object-contain mb-1"
                  />
                  <p className="text-[10px] text-gray-600 font-medium leading-tight px-1 break-words text-center">
                    In association with GLOBAL ITP U.S.A.
                  </p>
                </motion.div>

                {/* Second Set of Logos (Duplicate for seamless loop) */}
                {/* VOX Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex flex-col items-center justify-center text-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={voxLogo} 
                    alt="VOX" 
                    className="h-4 w-auto object-contain mb-1"
                  />
                  <p className="text-[10px] text-gray-600 font-medium leading-tight px-1 break-words">
                    Ceilings | Floors | Walls
                  </p>
                </motion.div>
                
                {/* Unicell Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={unicellLogo} 
                    alt="Unicell" 
                    className="h-5 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Asian Paints Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={asianPaintsLogo} 
                    alt="Asian Paints" 
                    className="h-6 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Birla Opus Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={birlaOpusLogo} 
                    alt="Birla Opus" 
                    className="h-6 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Alfa Logo with GLOBAL ITP U.S.A. text */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 flex flex-col items-center justify-center text-center overflow-hidden flex-shrink-0 mx-1"
                >
                  <img 
                    src={alfaLogo} 
                    alt="Alfa" 
                    className="h-4 w-auto object-contain mb-1"
                  />
                  <p className="text-[10px] text-gray-600 font-medium leading-tight px-1 break-words text-center">
                    In association with GLOBAL ITP U.S.A.
                  </p>
                </motion.div>
              </div>

              {/* Desktop Static Layout */}
              <div className="hidden lg:flex flex-wrap justify-center items-center gap-1 xs:gap-2 sm:gap-4 md:gap-8">
                {/* VOX Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 xs:p-2 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 xs:w-24 xs:h-22 sm:w-32 sm:h-28 flex flex-col items-center justify-center text-center overflow-hidden"
                >
                  <img 
                    src={voxLogo} 
                    alt="VOX" 
                    className="h-4 xs:h-5 sm:h-6 w-auto object-contain mb-1"
                  />
                  <p className="text-[10px] xs:text-xs text-gray-600 font-medium leading-tight px-1 break-words">
                    Ceilings | Floors | Walls
                  </p>
                </motion.div>
                
                {/* Unicell Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 xs:p-2 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 xs:w-24 xs:h-22 sm:w-32 sm:h-28 flex items-center justify-center overflow-hidden"
                >
                  <img 
                    src={unicellLogo} 
                    alt="Unicell" 
                    className="h-4 xs:h-5 sm:h-6 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Asian Paints Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 xs:p-2 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 xs:w-24 xs:h-22 sm:w-32 sm:h-28 flex items-center justify-center overflow-hidden"
                >
                  <img 
                    src={asianPaintsLogo} 
                    alt="Asian Paints" 
                    className="h-5 xs:h-6 sm:h-7 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Birla Opus Logo */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 xs:p-2 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 xs:w-24 xs:h-22 sm:w-32 sm:h-28 flex items-center justify-center overflow-hidden"
                >
                  <img 
                    src={birlaOpusLogo} 
                    alt="Birla Opus" 
                    className="h-5 xs:h-6 sm:h-7 w-auto object-contain"
                  />
                </motion.div>
                
                {/* Alfa Logo with GLOBAL ITP U.S.A. text */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 xs:p-2 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-20 h-20 xs:w-24 xs:h-22 sm:w-32 sm:h-28 flex flex-col items-center justify-center text-center overflow-hidden"
                >
                  <img 
                    src={alfaLogo} 
                    alt="Alfa" 
                    className="h-4 xs:h-5 sm:h-6 w-auto object-contain mb-1"
                  />
                  <p className="text-[10px] xs:text-xs text-gray-600 font-medium leading-tight px-1 break-words text-center">
                    In association with GLOBAL ITP U.S.A.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-0 mb-6 md:mb-8 lg:mb-0"
            >
              <Link to="/request-quote">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group modern-button text-primary-foreground px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>✨ Get Free Quote</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
                </motion.button>
              </Link>

              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
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
        <div className="container mx-auto px-2 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4">
              Trusted by Hundreds of Clients
            </h2>
            <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto">
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <stat.icon size={24} className="text-white sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-primary-foreground/70 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Our Services</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4">
              What We Do Best
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
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

      {/* Gallery */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-semibold mb-4">Our Gallery</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4">
              See Our Work
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Explore our portfolio of stunning interior design projects and transformations.
            </p>
          </motion.div>

          {/* Auto-scrolling Gallery - 4 Cards Visible */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex transition-transform duration-1000 ease-in-out"
                 style={{ 
                   transform: `translateX(-${currentImageIndex * (window.innerWidth < 768 ? 100 : 25)}%)` 
                 }}>
              {galleryImages.map((image, index) => (
                <div key={image.id} className="w-full md:w-1/4 flex-shrink-0 relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 md:h-80 object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                    onClick={() => handleImageClick(image)}
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                   
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-medium text-gray-700">{image.category}</span>
                </div>
                </div>
            ))}
          </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors duration-300"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors duration-300"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>

          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              Ready to Transform Your Space?
            </h2>
            <p className="text-accent-foreground/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life. Get in touch with us today for a free consultation.
            </p>
            <Link to="/request-quote">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button-border hover:bg-white/90 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-md"
              >
                Get Started Today 
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors duration-300"
              >
                <X size={24} className="text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}