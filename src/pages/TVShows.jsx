import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Search, Play, Plus, ThumbsUp, Star, Filter, Calendar, Sun, Moon, User, Bell, ArrowLeft, Info } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function TVShows({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState('popularity')
  const [shows, setShows] = useState([])
  const [filteredShows, setFilteredShows] = useState([])

  const genres = ['All', 'Drama', 'Comedy', 'Action', 'Sci-Fi', 'Horror', 'Documentary', 'Reality', 'Crime', 'Romance']

  const tvShowsData = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Sci-Fi",
      year: 2023,
      rating: 9.2,
      seasons: 4,
      episodes: 42,
      duration: "50 min",
      inWatchlist: false
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped Britain.",
      image: "https://images.unsplash.com/photo-1594736797933-d0d64a8d6ca9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Drama",
      year: 2022,
      rating: 8.7,
      seasons: 6,
      episodes: 60,
      duration: "60 min",
      inWatchlist: true
    },
    {
      id: 3,
      title: "Breaking Bad",
      description: "A high school chemistry teacher turned methamphetamine producer partners with a former student.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Crime",
      year: 2023,
      rating: 9.5,
      seasons: 5,
      episodes: 62,
      duration: "47 min",
      inWatchlist: false
    },
    {
      id: 4,
      title: "The Office",
      description: "A mockumentary sitcom about the everyday lives of office employees working at a paper company.",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Comedy",
      year: 2021,
      rating: 8.9,
      seasons: 9,
      episodes: 201,
      duration: "22 min",
      inWatchlist: true
    },
    {
      id: 5,
      title: "Game of Thrones",
      description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Drama",
      year: 2023,
      rating: 9.3,
      seasons: 8,
      episodes: 73,
      duration: "57 min",
      inWatchlist: false
    },
    {
      id: 6,
      title: "Friends",
      description: "Follows the personal and professional lives of six twenty to thirty-something friends living in Manhattan.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Comedy",
      year: 2020,
      rating: 8.9,
      seasons: 10,
      episodes: 236,
      duration: "22 min",
      inWatchlist: true
    },
    {
      id: 7,
      title: "The Mandalorian",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the New Republic.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Sci-Fi",
      year: 2023,
      rating: 8.7,
      seasons: 3,
      episodes: 24,
      duration: "40 min",
      inWatchlist: false
    },
    {
      id: 8,
      title: "Sherlock",
      description: "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
      image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      genre: "Crime",
      year: 2022,
      rating: 9.1,
      seasons: 4,
      episodes: 13,
      duration: "90 min",
      inWatchlist: false
    }
  ]

  useEffect(() => {
    setShows(tvShowsData)
    setFilteredShows(tvShowsData)
  }, [])

  useEffect(() => {
    let filtered = shows.filter(show => 
      show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(show => show.genre === selectedGenre)
    }

    // Sort shows
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'year':
          return b.year - a.year
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return b.rating - a.rating // popularity by rating
      }
    })

    setFilteredShows(filtered)
  }, [searchTerm, selectedGenre, sortBy, shows])

  const toggleWatchlist = (showId) => {
    setShows(prev => prev.map(show => 
      show.id === showId 
        ? { ...show, inWatchlist: !show.inWatchlist }
        : show
    ))
    
    const show = shows.find(s => s.id === showId)
    toast.success(
      `${show.title} ${show.inWatchlist ? 'removed from' : 'added to'} watchlist`,
      {
        position: "top-right",
        autoClose: 2000
      }
    )
  }

  const playShow = (show) => {
    navigate(`/player/${show.id}`)
    toast.success(`Loading ${show.title}`, {
      position: "top-right",
    })
  }

  const viewShowDetails = (show) => {
    toast.info(`Viewing details for ${show.title}`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleBack = () => {
    navigate('/')
    toast.info('Returning to home', {
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
            {/* Logo and Back */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </motion.button>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-white">TV Shows</span>
              </motion.div>
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
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="container mx-auto px-4 lg:px-8 py-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
            TV Shows
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Discover the best TV series, from trending shows to timeless classics
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mb-8">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search TV shows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full lg:w-48 px-4 py-3 bg-surface-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full lg:w-48 px-4 py-3 bg-surface-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="year">Newest</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </motion.div>

        {/* TV Shows Grid */}
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-surface-800 rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
              >
                {/* Show Image */}
                <div className="relative group">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => playShow(show)}
                        className="p-3 bg-primary rounded-full text-white shadow-lg"
                      >
                        <Play className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => viewShowDetails(show)}
                        className="p-3 bg-surface-700 rounded-full text-white shadow-lg"
                      >
                        <Info className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Watchlist Badge */}
                  {show.inWatchlist && (
                    <div className="absolute top-3 right-3 bg-primary px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-medium">In List</span>
                    </div>
                  )}
                </div>

                {/* Show Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                      {show.genre}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{show.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                    {show.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {show.description}
                  </p>

                  <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                    <span>{show.year}</span>
                    <span>{show.seasons} Seasons</span>
                    <span>{show.episodes} Episodes</span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => playShow(show)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleWatchlist(show.id)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        show.inWatchlist 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredShows.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-white text-xl font-semibold mb-2">No shows found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary-dark border-t border-gray-800 py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-light rounded flex items-center justify-center">
                <Play className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-semibold">FlixVibe TV Shows</span>
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

export default TVShows