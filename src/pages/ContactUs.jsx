import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Mail, Phone, MapPin, Send, User, MessageSquare, Sun, Moon } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function ContactUs({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

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

  const handleBackClick = () => {
    navigate(-1)
    toast.info('Returning to previous page', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleHomeClick = () => {
    navigate('/')
    toast.info('Navigating to home', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting', {
        position: "top-right"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Your message has been sent successfully! We\'ll get back to you soon.', {
        position: "top-right",
        autoClose: 5000
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      toast.error('Failed to send message. Please try again later.', {
        position: "top-right"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
                onClick={handleBackClick}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-300" />
              </motion.button>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={handleHomeClick}
                className="flex items-center space-x-2 cursor-pointer"
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

      {/* Main Content */}
      <div className="pt-20 md:pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Mail" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Email</h3>
                      <p className="text-gray-400">support@flixvibe.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Phone" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Phone</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ApperIcon name="MapPin" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Address</h3>
                      <p className="text-gray-400">123 Streaming Street<br />Entertainment City, EC 12345</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-surface-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-surface-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-surface-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-surface-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter the subject"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-surface-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your message"
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Send" className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs