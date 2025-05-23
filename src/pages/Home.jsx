import { useState, useEffect } from 'react'
import { Search, Play, Plus, ThumbsUp, ChevronDown, Star, Filter, Calendar, Sun, Moon } from 'lucide-react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home({ darkMode, setDarkMode }) {
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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
              {["Home", "Movies", "TV Shows", "My List"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item}
                </motion.a>
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
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="Search" className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="Bell" className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
              </motion.button>

              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
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
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    toast.success(
      `Switched to ${!darkMode ? 'dark' : 'light'} mode`, 
      {
        icon: !darkMode ? '🌙' : '☀️',
        style: {
          background: !darkMode ? '#1e293b' : '#ffffff',
          color: !darkMode ? '#ffffff' : '#000000'
        }
      }
    )
  }

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
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                  >
                    {item}
                  </a>
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-dark/95 dark:bg-secondary-dark/95 bg-white/95 backdrop-blur-md border-b border-gray-800 dark:border-gray-800 border-gray-200">
export default Home
              <div className="relative group">
                  className="w-full pl-10 pr-4 py-2 bg-secondary/50 dark:bg-secondary/50 bg-gray-100/80 border border-gray-700 dark:border-gray-700 border-gray-300 rounded-lg text-white dark:text-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            {/* Theme Toggle & User Menu */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-secondary/20 dark:bg-secondary/20 bg-gray-100 hover:bg-secondary/40 dark:hover:bg-secondary/40 hover:bg-gray-200 transition-all duration-200 group"
                title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform duration-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 group-hover:-rotate-12 transition-transform duration-200" />
                )}
              </button>
              
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                <span className="text-white dark:text-white text-gray-900 font-medium">User</span>
        
        {/* Search Results Indicator */}
        <div className="bg-secondary-dark/95 dark:bg-secondary-dark/95 bg-white/95 border-b border-gray-800 dark:border-gray-800 border-gray-200 sticky top-16 z-40 backdrop-blur-md">
                  className="bg-secondary dark:bg-secondary bg-gray-100 border border-gray-700 dark:border-gray-700 border-gray-300 text-white dark:text-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  className="bg-secondary dark:bg-secondary bg-gray-100 border border-gray-700 dark:border-gray-700 border-gray-300 text-white dark:text-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  className="bg-secondary dark:bg-secondary bg-gray-100 border border-gray-700 dark:border-gray-700 border-gray-300 text-white dark:text-white text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              <div key={item.id} className="group cursor-pointer transform hover:scale-105 transition-transform duration-200">
                  {/* Hover Overlay */}
                  <h3 className="text-white dark:text-white text-gray-900 font-semibold text-sm line-clamp-1">{item.title}</h3>
              <div className="text-gray-400 dark:text-gray-400 text-gray-600 text-lg mb-2">No content found</div>

export default Home