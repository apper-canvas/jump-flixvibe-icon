import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Download, Calendar, User, Mail, Phone, ExternalLink, FileText, Image, Video } from 'lucide-react'
import { useState } from 'react'
import ApperIcon from '../components/ApperIcon'

function Press({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const pressReleases = [
    {
      id: 1,
      title: "FlixVibe Announces Record-Breaking Q4 Growth with 50M New Subscribers",
      date: "2024-01-15",
      category: "Financial",
      excerpt: "FlixVibe continues its global expansion with unprecedented subscriber growth, reaching 300 million users worldwide.",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "FlixVibe Partners with Major Studios for Exclusive Content Deal",
      date: "2024-01-10",
      category: "Content",
      excerpt: "New partnership brings exclusive blockbuster content and original series to FlixVibe platform.",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "FlixVibe Launches AI-Powered Recommendation Engine",
      date: "2024-01-05",
      category: "Technology",
      excerpt: "Revolutionary AI technology enhances user experience with personalized content discovery.",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "FlixVibe Wins Best Streaming Platform Award 2024",
      date: "2023-12-20",
      category: "Awards",
      excerpt: "Industry recognition for innovation and user experience excellence in streaming technology.",
      downloadUrl: "#"
    }
  ]

  const mediaResources = [
    {
      type: "logo",
      title: "FlixVibe Logo Package",
      description: "High-resolution logos in various formats",
      icon: "Image",
      downloadUrl: "#"
    },
    {
      type: "screenshots",
      title: "Product Screenshots",
      description: "Platform interface screenshots",
      icon: "Image",
      downloadUrl: "#"
    },
    {
      type: "video",
      title: "Company Video Package",
      description: "Promotional and explainer videos",
      icon: "Video",
      downloadUrl: "#"
    },
    {
      type: "fact-sheet",
      title: "Company Fact Sheet",
      description: "Key statistics and information",
      icon: "FileText",
      downloadUrl: "#"
    }
  ]

  const executives = [
    {
      name: "Sarah Johnson",
      title: "Chief Executive Officer",
      bio: "Sarah has over 15 years of experience in media and technology, previously serving as VP of Content at leading streaming platforms.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Michael Chen",
      title: "Chief Technology Officer",
      bio: "Michael leads FlixVibe's technology innovation, bringing expertise from Silicon Valley's top tech companies.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Emma Rodriguez",
      title: "Chief Content Officer",
      bio: "Emma oversees content strategy and partnerships, with a background in film production and content acquisition.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  const categories = ['All', 'Financial', 'Content', 'Technology', 'Awards']

  const filteredReleases = selectedCategory === 'All' 
    ? pressReleases 
    : pressReleases.filter(release => release.category === selectedCategory)

  const handleDownload = (item) => {
    toast.success(`Downloading ${item}`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleContactPress = () => {
    toast.info('Opening media contact form', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-secondary-dark' : 'bg-white'}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-secondary-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2 rounded-full bg-gray-100 dark:bg-surface-800 hover:bg-gray-200 dark:hover:bg-surface-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Press Center</h1>
                <p className="text-gray-600 dark:text-gray-400">Media resources and press releases</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactPress}
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
            >
              Media Contact
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Press Center
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Latest news, press releases, and media resources from FlixVibe. 
            Discover our journey of innovation in streaming entertainment.
          </p>
        </motion.section>

        {/* Press Releases Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              Latest Press Releases
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-surface-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-surface-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filteredReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(release.date)}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {release.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {release.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(release.title)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-surface-700 hover:bg-gray-200 dark:hover:bg-surface-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Read More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Media Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Media Resources</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaResources.map((resource, index) => (
              <motion.div
                key={resource.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={resource.icon} className="w-6 h-6 text-primary" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {resource.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(resource.title)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Executive Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Executive Team</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((executive, index) => (
              <motion.div
                key={executive.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center mb-4">
                  <img
                    src={executive.image}
                    alt={executive.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {executive.name}
                  </h4>
                  <p className="text-primary font-medium">{executive.title}</p>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {executive.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Media Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 dark:bg-surface-900 rounded-2xl p-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Media Inquiries
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-surface-800 rounded-xl">
                <Mail className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">press@flixvibe.com</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-surface-800 rounded-xl">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactPress}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
            >
              Send Media Inquiry
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Press