import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [watchlist, setWatchlist] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popularity')

  const [movies] = useState([
    {
      id: 1,
      title: "The Midnight Quest",
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
      genre: "sci-fi",
      year: 2024,
      rating: 9.1,
      duration: "2h 45m",
      description: "A mind-bending journey across galaxies with stunning visual effects.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 98
    },
    {
      id: 3,
      title: "Laugh Out Loud",
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
      genre: "drama",
      year: 2024,
      rating: 8.3,
      duration: "2h 10m",
      description: "A touching drama about love, loss, and finding hope in unexpected places.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 88
    },
    {
      id: 5,
      title: "Neon Nights",
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
      genre: "thriller",
      year: 2024,
      rating: 8.1,
      duration: "1h 55m",
      description: "A suspenseful thriller set in the depths of the ocean's darkest secrets.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popularity: 85
    }
  ])

  const genres = [
    { id: 'all', name: 'All Genres', icon: 'Grid3x3' },
    { id: 'action', name: 'Action', icon: 'Zap' },
    { id: 'sci-fi', name: 'Sci-Fi', icon: 'Rocket' },
    { id: 'comedy', name: 'Comedy', icon: 'Smile' },
    { id: 'drama', name: 'Drama', icon: 'Heart' },
    { id: 'thriller', name: 'Thriller', icon: 'Eye' }
  ]

  const filteredMovies = movies
    .filter(movie => {
      const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesGenre && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'year') return b.year - a.year
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return 0
    })

  const toggleWatchlist = (movieId, movieTitle) => {
    setWatchlist(prev => {
      const isAlreadyInWatchlist = prev.includes(movieId)
      const newWatchlist = isAlreadyInWatchlist 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
      
      toast.success(
        isAlreadyInWatchlist 
          ? `"${movieTitle}" removed from watchlist`
          : `"${movieTitle}" added to watchlist`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      )
      
      return newWatchlist
    })
  }

  useEffect(() => {
    // Load watchlist from localStorage on component mount
    const savedWatchlist = localStorage.getItem('flixvibe-watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem('flixvibe-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-12 md:py-16 bg-gradient-to-b from-secondary-dark to-black"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Discover Your Next
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Binge</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our curated collection of movies and shows, personalized just for you
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies and shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center justify-between">
            {/* Genre Filter */}
            <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max lg:min-w-0">
                {genres.map((genre) => (
                  <motion.button
                    key={genre.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGenre(genre.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedGenre === genre.id
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-glow'
                        : 'bg-surface-800/50 text-gray-300 hover:bg-surface-700 border border-gray-600'
                    }`}
                  >
                    <ApperIcon name={genre.icon} className="w-4 h-4" />
                    <span className="text-sm md:text-base">{genre.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* View and Sort Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-surface-800 border border-gray-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="year">Newest</option>
                <option value="title">A-Z</option>
              </select>

              {/* View Mode Toggle */}
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

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedGenre !== 'all' && ` in ${genres.find(g => g.id === selectedGenre)?.name}`}
          </p>
        </motion.div>

        {/* Movies Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedGenre}-${searchQuery}-${sortBy}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
                : "space-y-4"
            }
          >
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group relative ${
                  viewMode === 'list' 
                    ? 'flex flex-col md:flex-row bg-surface-800/30 rounded-2xl overflow-hidden border border-gray-700 hover:border-primary/50' 
                    : 'bg-surface-800/30 rounded-2xl overflow-hidden border border-gray-700 hover:border-primary/50'
                } backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              >
                {/* Movie Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'md:w-48 h-48 md:h-auto' : 'aspect-[16/9]'
                }`}>
                  <img
                    src={movie.image}
                    alt={movie.title}
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
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50"
                    >
                      <ApperIcon name="Play" className="w-8 h-8 text-white ml-1" />
                    </motion.button>
                  </motion.div>

                  {/* Watchlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWatchlist(movie.id, movie.title)}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                      watchlist.includes(movie.id)
                        ? 'bg-primary border-primary text-white'
                        : 'bg-black/50 border-white/30 text-white hover:bg-primary hover:border-primary'
                    }`}
                  >
                    <ApperIcon 
                      name={watchlist.includes(movie.id) ? "Check" : "Plus"} 
                      className="w-5 h-5 mx-auto" 
                    />
                  </motion.button>
                </div>

                {/* Movie Info */}
                <div className={`p-4 md:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <ApperIcon name="Star" className="w-4 h-4 text-accent fill-current" />
                      <span className="text-accent font-semibold text-sm">{movie.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 text-sm">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded-lg font-medium capitalize">
                      {movie.genre}
                    </span>
                    <span className="text-gray-400">{movie.year}</span>
                    <span className="text-gray-400">{movie.duration}</span>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                    {movie.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium text-sm hover:shadow-glow transition-all duration-300"
                    >
                      <ApperIcon name="Play" className="w-4 h-4" />
                      Watch Now
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
          </motion.div>
        </AnimatePresence>

        {/* No Results State */}
        {filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ApperIcon name="Search" className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No content found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('')
                setSelectedGenre('all')
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default MainFeature