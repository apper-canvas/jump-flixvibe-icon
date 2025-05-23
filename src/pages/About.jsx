import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Play, Users, Star, Globe, Mail, Phone, MapPin, Heart, Award, Zap, Shield } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function About({ darkMode, setDarkMode }) {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
    toast.info('Going back', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleContactClick = (type) => {
    toast.success(`Opening ${type} contact`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    toast.success(
      `Switched to ${!darkMode ? 'dark' : 'light'} mode`, 
      {
        icon: !darkMode ? '🌙' : '☀️',
        position: "top-right"
      }
    )
  }

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Visionary leader with 15+ years in streaming technology"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Tech innovator specializing in video streaming platforms"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Content curator with deep industry connections"
    },
    {
      name: "David Kim",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Creative director focused on user experience design"
    }
  ]

  const features = [
    {
      icon: "Play",
      title: "4K Ultra HD Streaming",
      description: "Experience crystal-clear video quality with our advanced streaming technology"
    },
    {
      icon: "Users",
      title: "Multi-Device Support",
      description: "Watch on any device - TV, laptop, tablet, or smartphone"
    },
    {
      icon: "Star",
      title: "Personalized Recommendations",
      description: "AI-powered suggestions based on your viewing preferences"
    },
    {
      icon: "Globe",
      title: "Global Content Library",
      description: "Access to movies and shows from around the world"
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: "Zap",
      title: "Lightning Fast",
      description: "Optimized servers ensure smooth, buffer-free streaming"
    }
  ]

  const stats = [
    { number: "50M+", label: "Active Users" },
    { number: "25K+", label: "Movies & Shows" },
    { number: "190+", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark dark:from-black dark:via-secondary-dark dark:to-black">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-safari bg-secondary-dark/80 dark:bg-black/80 border-b border-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goBack}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-300" />
              </motion.button>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Play" className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-white">FlixVibe</span>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-4 h-4 md:w-5 md:h-5 text-gray-300" 
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About <span className="text-primary">FlixVibe</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing the way you discover, watch, and enjoy entertainment content from around the globe.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-16 md:py-24 bg-surface-800/30"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              At FlixVibe, we believe that great stories have the power to connect, inspire, and transform lives. 
              Our mission is to make premium entertainment accessible to everyone, everywhere, while supporting 
              creators and fostering a global community of storytellers.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              We're committed to delivering cutting-edge streaming technology, curating diverse content, 
              and creating an unparalleled viewing experience that brings people together through the magic of film and television.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Choose FlixVibe?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience entertainment like never before with our cutting-edge features and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-surface-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="py-16 md:py-24 bg-surface-800/30"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind FlixVibe's success and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-surface-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "Mail", title: "Email Us", info: "hello@flixvibe.com", type: "email" },
              { icon: "Phone", title: "Call Us", info: "+1 (555) 123-4567", type: "phone" },
              { icon: "MapPin", title: "Visit Us", info: "San Francisco, CA", type: "location" }
            ].map((contact, index) => (
              <motion.button
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleContactClick(contact.type)}
                className="bg-surface-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={contact.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {contact.title}
                </h3>
                <p className="text-gray-400">
                  {contact.info}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-secondary-dark border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-light rounded flex items-center justify-center">
                <ApperIcon name="Play" className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-semibold">FlixVibe</span>
            </div>
            
            <p className="text-gray-400 text-sm text-center md:text-right">
              © 2024 FlixVibe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default About