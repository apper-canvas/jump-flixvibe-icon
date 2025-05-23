import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

function SearchPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [watchlist, setWatchlist] = useState([])

  // Sample movie and series data
  const [content] = useState([
    {
      id: 1,
      title: "The Midnight Quest",
      type: "movie",
      genre: "action",
      year: 2023,
      rating: 8.7,
      duration: "2h 15m",
      description: "An epic adventure through mystical realms where heroes battle ancient evils.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 95
    },
    {
      id: 2,
      title: "Cosmic Horizons",
      type: "series",
      genre: "sci-fi",
      year: 2024,
      rating: 9.1,
      duration: "3 Seasons",
      description: "A mind-bending journey across galaxies with stunning visual effects.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 98
    },
    {
      id: 3,
      title: "Laugh Out Loud",
      type: "movie",
      genre: "comedy",
      year: 2023,
      rating: 7.8,
      duration: "1h 45m",
      description: "A hilarious comedy that will keep you entertained from start to finish.",
      image: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 82
    },
    {
      id: 4,
      title: "Hearts Entwined",
      type: "series",
      genre: "drama",
      year: 2024,
      rating: 8.3,
      duration: "2 Seasons",
      description: "A touching drama about love, loss, and finding hope in unexpected places.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 88
    },
    {
      id: 5,
      title: "Neon Nights",
      type: "movie",
      genre: "action",
      year: 2023,
      rating: 8.9,
      duration: "2h 30m",
      description: "High-octane action in a cyberpunk world with incredible chase sequences.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 91
    },
    {
      id: 6,
      title: "Ocean's Mystery",
      type: "series",
      genre: "thriller",
      year: 2024,
      rating: 8.1,
      duration: "1 Season",
      description: "A suspenseful thriller set in the depths of the ocean's darkest secrets.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 85
    },
    {
      id: 7,
      title: "The Crown Chronicles",
      type: "series",
      genre: "drama",
      year: 2023,
      rating: 9.0,
      duration: "4 Seasons",
      description: "An intimate portrait of royal family dynamics across decades of change.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 94
    },
    {
      id: 8,
      title: "Quantum Leap",
      type: "movie",
      genre: "sci-fi",
      year: 2024,
      rating: 8.5,
      duration: "2h 05m",
      description: "Time travel meets cutting-edge science in this thrilling adventure.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 87
    }
  ])

  const genres = [
    { id: 'all', name: 'All', icon: 'Grid3x3' },
    { id: 'action', name: 'Action', icon: 'Zap' },
    { id: 'sci-fi', name: 'Sci-Fi', icon: 'Rocket' },
    { id: 'comedy', name: 'Comedy', icon: 'Smile' },
    { id: 'drama', name: 'Drama', icon: 'Heart' },
    { id: 'thriller', name: 'Thriller', icon: 'Eye' }
  ]

  const contentTypes = [
    { id: 'all', name: 'All', icon: 'Grid3x3' },
    { id: 'movie', name: 'Movies', icon: 'Film' },
    { id: 'series', name: 'Series', icon: 'Tv' }
  ]

  // Load search history and watchlist on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('flixvibe-search-history')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
    
    const savedWatchlist = localStorage.getItem('flixvibe-watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  // Handle search functionality with loading simulation
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true)
      
      // Simulate API call delay
      const searchTimeout = setTimeout(() => {
        const filtered = content.filter(item => {
          const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre
          const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               item.description.toLowerCase().includes(searchQuery.toLowerCase())
          return matchesGenre && matchesSearch
        }).sort((a, b) => {
          if (sortBy === 'popularity') return b.popularity - a.popularity
          if (sortBy === 'rating') return b.rating - a.rating
          if (sortBy === 'year') return b.year - a.year
          if (sortBy === 'title') return a.title.localeCompare(b.title)
          return 0
        })
        
        setSearchResults(filtered)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(searchTimeout)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [searchQuery, selectedGenre, sortBy, content])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        navigate('/')
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

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

  const handleSearchSubmit = (query) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory.slice(0, 4)]
      setSearchHistory(newHistory)
      localStorage.setItem('flixvibe-search-history', JSON.stringify(newHistory))
      
      toast.success(`Searching for "${query.trim()}"`, {
        position: "top-right",
        autoClose: 2000,
        icon: '🔍'
      })
    }
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

  const toggleWatchlist = (itemId, itemTitle) => {
    setWatchlist(prev => {
      const isAlreadyInWatchlist = prev.includes(itemId)
      const newWatchlist = isAlreadyInWatchlist 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
      
      localStorage.setItem('flixvibe-watchlist', JSON.stringify(newWatchlist))
      
      toast.success(
        isAlreadyInWatchlist 
          ? `"${itemTitle}" removed from watchlist`
          : `"${itemTitle}" added to watchlist`,
        {
          position: "top-right",
          autoClose: 2000,
        }
      )
      
      return newWatchlist
    })
  }

  const playContent = (item) => {
    toast.success(`Playing "${item.title}"`, {
      position: "top-right",
      autoClose: 2000,
      icon: '▶️'
    })
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedGenre('all')
    setSortBy('popularity')
    toast.info('All filters cleared', {
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
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">FlixVibe</span>
            </motion.div>

            {/* Page Title */}
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-white">Search</h1>
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
                onClick={() => navigate('/')}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="X" className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Search Content */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Search 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Everything</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Find your next favorite movie or series from our extensive collection
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for movies, series, actors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
                className="w-full pl-14 pr-4 py-5 bg-surface-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all duration-300"
                autoFocus
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <ApperIcon name="X" className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Search Filters */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Genre Filters */}
              <div className="w-full lg:w-auto">
                <h3 className="text-white font-semibold mb-3">Filter by Genre</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <motion.button
                      key={genre.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedGenre(genre.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        selectedGenre === genre.id
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

              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-surface-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="year">Newest</option>
                  <option value="title">A-Z</option>
                </select>

                <div className="flex bg-surface-800 rounded-xl p-1 border border-gray-600">
                  {[
                    { mode: 'grid', icon: 'Grid3x3' },
                    { mode: 'list', icon: 'List' }
                  ].map(({ mode, icon }) => (
                    <motion.button
                      key={mode}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode(mode)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === mode
                          ? 'bg-primary text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <ApperIcon name={icon} className="w-4 h-4" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Results or Initial State */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Searching...</p>
              </motion.div>
            ) : searchQuery.trim() ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-gray-400">
                    Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                  </p>
                </div>

                {searchResults.length > 0 ? (
                  <div className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }>
                    {searchResults.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group relative ${
                          viewMode === 'list' 
                            ? 'flex flex-col md:flex-row bg-surface-800/30 rounded-2xl overflow-hidden border border-gray-700 hover:border-primary/50' 
                            : 'bg-surface-800/30 rounded-2xl overflow-hidden border border-gray-700 hover:border-primary/50'
                        } backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                      >
                        {/* Content Image */}
                        <div className={`relative overflow-hidden ${
                          viewMode === 'list' ? 'md:w-48 h-48 md:h-auto' : 'aspect-[16/9]'
                        }`}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          {/* Play Button Overlay */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => playContent(item)}
                              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50"
                            >
                              <ApperIcon name="Play" className="w-8 h-8 text-white ml-1" />
                            </motion.button>
                          </motion.div>

                          {/* Watchlist Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleWatchlist(item.id, item.title)}
                            className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                              watchlist.includes(item.id)
                                ? 'bg-primary border-primary text-white'
                                : 'bg-black/50 border-white/30 text-white hover:bg-primary hover:border-primary'
                            }`}
                          >
                            <ApperIcon 
                              name={watchlist.includes(item.id) ? "Check" : "Plus"} 
                              className="w-5 h-5 mx-auto" 
                            />
                          </motion.button>

                          {/* Content Type Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                              item.type === 'movie' 
                                ? 'bg-blue-500/80 text-white' 
                                : 'bg-green-500/80 text-white'
                            }`}>
                              {item.type === 'movie' ? 'Movie' : 'Series'}
                            </span>
                          </div>
                        </div>

                        {/* Content Info */}
                        <div className={`p-4 md:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-1 ml-2">
                              <ApperIcon name="Star" className="w-4 h-4 text-accent fill-current" />
                              <span className="text-accent font-semibold text-sm">{item.rating}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 text-sm">
                            <span className="px-2 py-1 bg-primary/20 text-primary rounded-lg font-medium capitalize">
                              {item.genre}
                            </span>
                            <span className="text-gray-400">{item.year}</span>
                            <span className="text-gray-400">{item.duration}</span>
                          </div>

                          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => playContent(item)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium text-sm hover:shadow-glow transition-all duration-300"
                            >
                              <ApperIcon name="Play" className="w-4 h-4" />
                              {item.type === 'movie' ? 'Watch Now' : 'Start Series'}
                            </motion.button>

                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors"
                              >
                                <ApperIcon name="Share" className="w-4 h-4 text-gray-300" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors"
                              >
                                <ApperIcon name="Info" className="w-4 h-4 text-gray-300" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <ApperIcon name="Search" className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                    <p className="text-gray-400 mb-6">
                      Try different keywords or adjust your filters
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearAllFilters}
                      className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                    >
                      Clear All Filters
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Recent Searches */}
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-lg">Recent Searches</h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearSearchHistory}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        Clear All
                      </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {searchHistory.map((query, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => selectRecentSearch(query)}
                          className="flex items-center gap-2 px-4 py-2 bg-surface-800 hover:bg-surface-700 rounded-xl text-gray-300 transition-colors"
                        >
                          <ApperIcon name="Clock" className="w-4 h-4" />
                          <span>{query}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4">Popular This Week</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {['Action Movies', 'Netflix Originals', 'Comedy Series', 'Sci-Fi Thrillers', 'Award Winners', 'New Releases'].map((suggestion) => (
                      <motion.button
                        key={suggestion}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectRecentSearch(suggestion)}
                        className="flex items-center gap-3 px-4 py-3 bg-surface-800/50 hover:bg-surface-700/50 rounded-xl text-gray-300 transition-colors text-left"
                      >
                        <ApperIcon name="TrendingUp" className="w-5 h-5 text-primary" />
                        <span>{suggestion}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SearchPage