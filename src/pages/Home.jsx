import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Search, Play, Plus, ThumbsUp, ChevronDown, Star, Filter, Calendar, Sun, Moon } from 'lucide-react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const notificationRef = useRef(null)
  const [featuredContent, setFeaturedContent] = useState({
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    genre: "Sci-Fi Drama",
    year: 2023,
    rating: "TV-14"
  })

  const [categories] = useState([
    "Trending Now",
    "New Releases", 
    "Action & Adventure",
    "Sci-Fi & Fantasy",
    "Documentaries",
    "Comedy",
    "Drama"
  ])

  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_release',
      title: 'New Episode Available',
      message: 'Stranger Things Season 5 Episode 3 is now available',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      read: false,
      category: 'New Release'
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Recommended for You',
      message: 'Based on your viewing history, you might like "Dark Matter"',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      read: false,
      category: 'Recommendation'
    },
    {
      id: 3,
      type: 'watchlist',
      title: 'Watchlist Update',
      message: 'The movie "Cosmic Horizons" from your watchlist is now trending',
      timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
      read: false,
      category: 'Watchlist'
    },
    {
      id: 4,
      type: 'new_release',
      title: 'New Series Added',
      message: 'The highly anticipated series "Quantum Dreams" has been added',
      timestamp: new Date(Date.now() - 8 * 60 * 60000), // 8 hours ago
      read: true,
      category: 'New Release'
    },
    {
      id: 5,
      type: 'update',
      title: 'Quality Upgrade',
      message: 'Your favorite movie "Neon Nights" is now available in 4K',
      timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
      read: true,
      category: 'Update'
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const savedNotifications = localStorage.getItem('flixvibe-notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

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

  const openSearch = () => {
    navigate('/search')
    toast.info('Opening search page', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (!showNotifications) {
      toast.info('Opening notifications', {
        position: "top-right",
        autoClose: 1500
      })
    }
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => {
      const updated = prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
      localStorage.setItem('flixvibe-notifications', JSON.stringify(updated))
      return updated
    })
    
    toast.success('Notification marked as read', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleHomeClick = () => {
    navigate('/')
    toast.info('Navigating to home', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleMoviesClick = () => {
    navigate('/movies')
    toast.info('Navigating to Movies', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, read: true }))
      localStorage.setItem('flixvibe-notifications', JSON.stringify(updated))
      return updated
    })
    
    toast.success('All notifications marked as read', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleTVShowsClick = () => {
    navigate('/tv-shows')
    toast.info('Navigating to TV Shows', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleMyListClick = () => {
    navigate('/my-list')
    toast.info('Navigating to My List', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleAboutClick = () => {
    navigate('/about')
    toast.info('Navigating to About', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleCareersClick = () => {
    navigate('/careers')
    toast.info('Navigating to Careers', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handlePrivacyClick = () => {
    navigate('/privacy-policy')
    toast.info('Navigating to Privacy Policy', {
      position: "top-right",
      autoClose: 2000
    })
  }
  const handlePressClick = () => {
    navigate('/press')
    toast.info('Navigating to Press', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleHelpCenterClick = () => {
    navigate('/help-center')
    toast.info('Navigating to Help Center', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleContactUsClick = () => {
    navigate('/contact-us')
    toast.info('Navigating to Contact Us', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleTermsClick = () => {
    navigate('/terms-and-conditions')
    toast.info('Navigating to Terms and Conditions', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else {
      return `${days} days ago`
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  const getNotificationIcon = (type) => {
    const icons = { new_release: 'Sparkles', recommendation: 'Heart', watchlist: 'Bookmark', update: 'RefreshCw' }
    return icons[type] || 'Bell'
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
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">FlixVibe</span>
            </motion.div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Movies', 'TV Shows', 'My List'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  onClick={item === 'Home' ? handleHomeClick : item === 'Movies' ? handleMoviesClick : item === 'TV Shows' ? handleTVShowsClick : item === 'My List' ? handleMyListClick : () => {
                    toast.info(`Navigating to ${item}`, {
                      position: "top-right",
                      autoClose: 2000
                    })
                  }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2 md:space-x-4">
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
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={openSearch}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="Search" className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleNotifications}
                className="relative p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
                <ApperIcon name="Bell" className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div ref={notificationRef}>
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-96 bg-surface-800 dark:bg-surface-900 border border-gray-600 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden"
                    >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-600 flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg">Notifications</h3>
                        {unreadCount > 0 && (
                          <>
                            <span className="inline-flex items-center text-xs text-primary">
                              {unreadCount} new
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={markAllAsRead}
                              className="text-primary hover:text-primary-light text-sm font-medium transition-colors"
                            >
                              Mark all read
                            </motion.button>
                          </>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto scrollbar-hide">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <motion.button
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`w-full text-left p-4 border-b border-gray-700 last:border-b-0 hover:bg-surface-700 transition-colors ${
                              !notification.read ? 'bg-primary/5' : ''
                            }`}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'new_release' ? 'bg-primary/20 text-primary' :
                                notification.type === 'recommendation' ? 'bg-accent/20 text-accent' :
                                notification.type === 'watchlist' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                <ApperIcon name={getNotificationIcon(notification.type)} className="w-4 h-4" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                                    {notification.category}
                                  </span>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  )}
                                </div>
                                
                                <h4 className={`font-medium mb-1 ${
                                  notification.read ? 'text-gray-300' : 'text-white'
                                }`}>
                                  {notification.title}
                                </h4>
                                
                                <p className="text-gray-400 text-sm mb-2 leading-relaxed">
                                  {notification.message}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  
                                  {!notification.read && (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                      className="text-xs text-primary hover:text-primary-light font-medium"
                                    >
                                      Mark read
                                    </motion.button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <ApperIcon name="Bell" className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                          <p className="text-gray-400">No notifications yet</p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-600 text-center">
                      <button className="text-primary hover:text-primary-light text-sm font-medium transition-colors">
                        View all notifications
                      </button>
                    </div>
                    </motion.div>
                  </div>
                )}
              </motion.button>

              <motion.button
                onClick={handleProfileClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center transition-all duration-300 cursor-pointer border-none"
                aria-label="Go to Profile"
              >
                <ApperIcon name="User" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%), url(${featuredContent.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center md:text-left"
            >
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <span className="px-3 py-1 bg-primary rounded-full text-white text-xs md:text-sm font-medium">
                  {featuredContent.genre}
                </span>
                <span className="text-accent font-bold text-sm md:text-base">{featuredContent.year}</span>
                <span className="text-gray-300 text-sm md:text-base">{featuredContent.rating}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 text-shadow">
                {featuredContent.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                {featuredContent.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(229, 9, 20, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold text-lg shadow-glow transition-all duration-300"
                >
                  <ApperIcon name="Play" className="w-6 h-6" />
                  Play Now
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-surface-800/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-gray-600 hover:bg-surface-700/50 transition-all duration-300"
                >
                  <ApperIcon name="Plus" className="w-6 h-6" />
                  My List
                </motion.button>
              </div>

            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Category Navigation */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="py-8 md:py-12 bg-secondary-dark/50"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 md:gap-6 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 md:px-6 py-2 md:py-3 bg-surface-800 hover:bg-primary text-white rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Feature Component */}
      <MainFeature />

      {/* Footer */}
      <footer className="bg-secondary-dark border-t border-gray-800 py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              ["About", "Careers", "Press"],
              ["Help Center", "Contact Us", "Terms"],
              ["Privacy", "Cookie Policy", "Legal"],
              ["Investor Relations", "Jobs", "Redeem Gift Cards"]
            ].map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-3">
                {column.map((item) => (
                  <button
                    key={item}
                    onClick={item === 'About' ? handleAboutClick : item === 'Careers' ? handleCareersClick : item === 'Press' ? handlePressClick : item === 'Help Center' ? handleHelpCenterClick : item === 'Contact Us' ? handleContactUsClick : item === 'Terms' ? handleTermsClick : item === 'Privacy' ? handlePrivacyClick : () => {
                      toast.info(`Opening ${item}`, { position: "top-right", autoClose: 2000 })
                    }}
                    type="button"
                    className="block text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 md:pt-8 border-t border-gray-800">
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

export default Home