import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Search, Play, Plus, ThumbsUp, ChevronDown, Star, Filter, Calendar, Sun, Moon } from 'lucide-react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home({ darkMode, setDarkMode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [selectedSearchGenre, setSelectedSearchGenre] = useState('all')
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

  // Sample movie data for search (in real app, this would come from API)
  const [movies] = useState([
    {
      id: 1,
      title: "The Midnight Quest",
      genre: "action",
      year: 2023,
      rating: 8.7,
      description: "An epic adventure through mystical realms where heroes battle ancient evils.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Cosmic Horizons",
      genre: "sci-fi",
      year: 2024,
      rating: 9.1,
      description: "A mind-bending journey across galaxies with stunning visual effects.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Laugh Out Loud",
      genre: "comedy",
      year: 2023,
      rating: 7.8,
      description: "A hilarious comedy that will keep you entertained from start to finish.",
      image: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Hearts Entwined",
      genre: "drama",
      year: 2024,
      rating: 8.3,
      description: "A touching drama about love, loss, and finding hope in unexpected places.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Neon Nights",
      genre: "action",
      year: 2023,
      rating: 8.9,
      description: "High-octane action in a cyberpunk world with incredible chase sequences.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Ocean's Mystery",
      genre: "thriller",
      year: 2024,
      rating: 8.1,
      description: "A suspenseful thriller set in the depths of the ocean's darkest secrets.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ])

  const searchGenres = [
    { id: 'all', name: 'All', icon: 'Grid3x3' },
    { id: 'action', name: 'Action', icon: 'Zap' },
    { id: 'sci-fi', name: 'Sci-Fi', icon: 'Rocket' },
    { id: 'comedy', name: 'Comedy', icon: 'Smile' },
    { id: 'drama', name: 'Drama', icon: 'Heart' },
    { id: 'thriller', name: 'Thriller', icon: 'Eye' }
  ]

  // Load search history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('flixvibe-search-history')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = movies.filter(movie => {
        const matchesGenre = selectedSearchGenre === 'all' || movie.genre === selectedSearchGenre
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             movie.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesGenre && matchesSearch
      })
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, selectedSearchGenre, movies])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isSearchOpen])

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
    setIsSearchOpen(true)
    toast.info('Search opened - Press Esc to close', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
    setSelectedSearchGenre('all')
  }

  const handleSearchSubmit = (query) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory.slice(0, 4)]
      setSearchHistory(newHistory)
      localStorage.setItem('flixvibe-search-history', JSON.stringify(newHistory))
    }
  }

  const selectSearchResult = (movie) => {
    toast.success(`Selected "${movie.title}"`, {
      position: "top-right",
      autoClose: 2000,
      icon: '🎬'
    })
    handleSearchSubmit(movie.title)
    closeSearch()
  }

  const selectRecentSearch = (query) => {
    setSearchQuery(query)
    handleSearchSubmit(query)
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('flixvibe-search-history')
    toast.success('Search history cleared', {
      position: "top-right"
    })
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
                onClick={openSearch}
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

      {/* Search Overlay */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          onClick={closeSearch}
        >
          <div className="container mx-auto px-4 pt-24 pb-8">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Search FlixVibe</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeSearch}
                  className="p-2 bg-surface-800 hover:bg-surface-700 rounded-full transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-gray-300" />
                </motion.button>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for movies, shows, actors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-800/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  Ctrl+K
                </div>
              </div>

              {/* Genre Filters */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Filter by Genre</h3>
                <div className="flex flex-wrap gap-2">
                  {searchGenres.map((genre) => (
                    <motion.button
                      key={genre.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSearchGenre(genre.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedSearchGenre === genre.id
                          ? 'bg-primary text-white'
                          : 'bg-surface-800 text-gray-300 hover:bg-surface-700'
                      }`}
                    >
                      <ApperIcon name={genre.icon} className="w-4 h-4" />
                      <span>{genre.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">
                    Results ({searchResults.length})
                  </h3>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto scrollbar-hide">
                      {searchResults.map((movie) => (
                        <motion.div
                          key={movie.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => selectSearchResult(movie)}
                          className="flex items-center gap-3 p-3 bg-surface-800/50 hover:bg-surface-700/50 rounded-xl cursor-pointer transition-all duration-300"
                        >
                          <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate">{movie.title}</h4>
                            <p className="text-gray-400 text-sm truncate">{movie.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded capitalize">
                                {movie.genre}
                              </span>
                              <span className="text-gray-500 text-xs">{movie.year}</span>
                              <div className="flex items-center gap-1">
                                <ApperIcon name="Star" className="w-3 h-3 text-accent" />
                                <span className="text-accent text-xs">{movie.rating}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ApperIcon name="Search" className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">No results found for "{searchQuery}"</p>
                      <p className="text-gray-500 text-sm mt-1">Try different keywords or check spelling</p>
                    </div>
                  )}
                </div>
              )}

              {/* Recent Searches & Suggestions */}
              {!searchQuery.trim() && (
                <div className="space-y-6">
                  {/* Recent Searches */}
                  {searchHistory.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">Recent Searches</h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={clearSearchHistory}
                          className="text-gray-400 hover:text-white text-sm transition-colors"
                        >
                          Clear All
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchHistory.map((query, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => selectRecentSearch(query)}
                            className="flex items-center gap-2 px-3 py-2 bg-surface-800 hover:bg-surface-700 rounded-lg text-gray-300 transition-colors"
                          >
                            <ApperIcon name="Clock" className="w-4 h-4" />
                            <span className="text-sm">{query}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">Popular This Week</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Action Movies', 'Netflix Originals', 'Trending Now', 'Comedy Series'].map((suggestion) => (
                        <motion.button
                          key={suggestion}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectRecentSearch(suggestion)}
                          className="flex items-center gap-2 px-3 py-2 bg-surface-800/50 hover:bg-surface-700/50 rounded-lg text-gray-300 transition-colors text-left"
                        >
                          <ApperIcon name="TrendingUp" className="w-4 h-4 text-primary" />
                          <span className="text-sm">{suggestion}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}

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

export default Home