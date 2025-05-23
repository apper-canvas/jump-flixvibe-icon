import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Search, Filter, Trash2, Play, Star, Calendar, Sun, Moon } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function MyList({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [sortBy, setSortBy] = useState('date-added')
  
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      type: "Movie",
      genre: "Action, Crime, Drama",
      year: 2008,
      rating: 9.0,
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "152 min",
      dateAdded: new Date('2024-01-15'),
      description: "Batman faces his greatest challenge yet with the emergence of the Joker."
    },
    {
      id: 2,
      title: "Stranger Things",
      type: "TV Show",
      genre: "Sci-Fi, Horror, Drama",
      year: 2016,
      rating: 8.7,
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "4 Seasons",
      dateAdded: new Date('2024-01-20'),
      description: "A group of kids uncover supernatural mysteries in their small town."
    },
    {
      id: 3,
      title: "Inception",
      type: "Movie",
      genre: "Sci-Fi, Thriller",
      year: 2010,
      rating: 8.8,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "148 min",
      dateAdded: new Date('2024-01-25'),
      description: "A skilled thief enters people's dreams to steal their secrets."
    },
    {
      id: 4,
      title: "Breaking Bad",
      type: "TV Show",
      genre: "Crime, Drama, Thriller",
      year: 2008,
      rating: 9.5,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "5 Seasons",
      dateAdded: new Date('2024-02-01'),
      description: "A chemistry teacher turns to manufacturing drugs after a cancer diagnosis."
    },
    {
      id: 5,
      title: "Interstellar",
      type: "Movie",
      genre: "Sci-Fi, Drama",
      year: 2014,
      rating: 8.6,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "169 min",
      dateAdded: new Date('2024-02-05'),
      description: "A team of explorers travel through a wormhole in space to save humanity."
    },
    {
      id: 6,
      title: "The Crown",
      type: "TV Show",
      genre: "Biography, Drama, History",
      year: 2016,
      rating: 8.7,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "6 Seasons",
      dateAdded: new Date('2024-02-10'),
      description: "The political rivalries and romance of Queen Elizabeth II's reign."
    }
  ])

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

  const handleBack = () => {
    navigate('/')
    toast.info('Returning to home', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleRemoveFromList = (id, title) => {
    setWatchlist(prev => prev.filter(item => item.id !== id))
    toast.success(`"${title}" removed from your list`, {
      position: "top-right",
      autoClose: 3000
    })
  }

  const handlePlayContent = (title) => {
    toast.success(`Now playing "${title}"`, {
      position: "top-right",
      autoClose: 3000,
      icon: '▶️'
    })
  }

  const filteredWatchlist = watchlist
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' || item.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-added':
          return new Date(b.dateAdded) - new Date(a.dateAdded)
        case 'title':
          return a.title.localeCompare(b.title)
        case 'rating':
          return b.rating - a.rating
        case 'year':
          return b.year - a.year
        default:
          return 0
      }
    })

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark dark:from-black dark:via-secondary-dark dark:to-black">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-safari bg-secondary-dark/80 dark:bg-black/80 border-b border-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-300" />
              </motion.button>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">My List</h1>
                <p className="text-gray-400 text-sm">
                  {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-gray-300" 
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search and Filter Controls */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your list..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-surface-800 text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ApperIcon name="Filter" className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 bg-surface-800 text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Movie">Movies</option>
                  <option value="TV Show">TV Shows</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-surface-800 text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none"
              >
                <option value="date-added">Date Added</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Watchlist Grid */}
        {filteredWatchlist.length > 0 ? (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredWatchlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-surface-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePlayContent(item.title)}
                        className="p-2 bg-primary rounded-full text-white hover:bg-primary-light transition-colors"
                      >
                        <ApperIcon name="Play" className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveFromList(item.id, item.title)}
                        className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.type === 'Movie' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-purple-600 text-white'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent font-medium">{item.year}</span>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Star" className="w-4 h-4 text-yellow-500" />
                      <span className="text-white font-medium">{item.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Genre:</span>
                      <span className="text-gray-300">{item.genre}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-300">{item.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Added:</span>
                      <span className="text-gray-300">{formatDate(item.dateAdded)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Search" className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {searchTerm || filterType !== 'All' ? 'No results found' : 'Your list is empty'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterType !== 'All' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start adding movies and shows to your personal watchlist'
                }
              </p>
              {(!searchTerm && filterType === 'All') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
                >
                  Browse Content
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MyList