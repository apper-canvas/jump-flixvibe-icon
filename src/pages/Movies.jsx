import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Search, Play, Plus, Star, Filter, Calendar, ArrowLeft, Heart, Info } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function Movies({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('flixvibe-mylist')
    return saved ? JSON.parse(saved) : []
  })

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation']

  const [movies] = useState([
    {
      id: 1,
      title: "Quantum Horizon",
      description: "A thrilling journey through space and time as humanity discovers a gateway to alternate dimensions.",
      genre: "Sci-Fi",
      year: 2024,
      rating: 8.7,
      duration: "2h 18m",
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Midnight Chase",
      description: "An intense action thriller following a detective's pursuit of a notorious criminal through the city.",
      genre: "Action",
      year: 2024,
      rating: 7.9,
      duration: "1h 52m",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Hearts Entwined",
      description: "A beautiful romantic drama about two souls finding love in the most unexpected circumstances.",
      genre: "Romance",
      year: 2023,
      rating: 8.2,
      duration: "2h 5m",
      poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "The Last Kingdom",
      description: "An epic adventure following a warrior's quest to reclaim his homeland from invading forces.",
      genre: "Adventure",
      year: 2024,
      rating: 8.5,
      duration: "2h 32m",
      poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Laugh Out Loud",
      description: "A hilarious comedy about a group of friends navigating through life's most awkward moments.",
      genre: "Comedy",
      year: 2023,
      rating: 7.6,
      duration: "1h 38m",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Digital Nightmare",
      description: "A psychological thriller exploring the dark side of technology and virtual reality.",
      genre: "Thriller",
      year: 2024,
      rating: 8.1,
      duration: "1h 47m",
      poster: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Animated Dreams",
      description: "A heartwarming animated tale about friendship, courage, and the power of imagination.",
      genre: "Animation",
      year: 2023,
      rating: 8.8,
      duration: "1h 28m",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Shadow's Edge",
      description: "A gripping horror film that will keep you on the edge of your seat until the very end.",
      genre: "Horror",
      year: 2024,
      rating: 7.4,
      duration: "1h 56m",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      title: "The Family Chronicles",
      description: "A touching drama about three generations of a family coming together during challenging times.",
      genre: "Drama",
      year: 2023,
      rating: 8.3,
      duration: "2h 14m",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ])

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const toggleMyList = (movie) => {
    const isInList = myList.some(item => item.id === movie.id)
    let updatedList
    
    if (isInList) {
      updatedList = myList.filter(item => item.id !== movie.id)
      toast.success(`Removed "${movie.title}" from My List`, {
        position: "top-right",
        autoClose: 2000
      })
    } else {
      updatedList = [...myList, { ...movie, addedAt: new Date().toISOString() }]
      toast.success(`Added "${movie.title}" to My List`, {
        position: "top-right",
        autoClose: 2000
      })
    }
    
    setMyList(updatedList)
    localStorage.setItem('flixvibe-mylist', JSON.stringify(updatedList))
  }

  const handlePlayMovie = (movie) => {
    navigate(`/player/${movie.id}`)
    toast.success(`Loading "${movie.title}"`, {
      position: "top-right",
    })
  }

  const handleMovieInfo = (movie) => {
    toast.info(`Showing info for "${movie.title}"`, {
      position: "top-right",
      autoClose: 2000,
      icon: 'ℹ️'
    })
  }

  const handleBackToHome = () => {
    navigate('/')
    toast.info('Returning to home', {
      position: "top-right",
      autoClose: 2000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark dark:from-black dark:via-secondary-dark dark:to-black">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-safari bg-secondary-dark/80 dark:bg-black/80 border-b border-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToHome}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-300" />
              </motion.button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Play" className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Movies</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-surface-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                />
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Genre Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="container mx-auto px-4 lg:px-8 py-6"
      >
        <div className="flex items-center space-x-4 mb-6">
          <ApperIcon name="Filter" className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300 font-medium">Filter by Genre:</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <motion.button
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedGenre === genre
                  ? 'bg-primary text-white'
                  : 'bg-surface-800 text-gray-300 hover:bg-surface-700'
              }`}
            >
              {genre}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Movies Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 lg:px-8 pb-12"
      >
        {filteredMovies.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedGenre === 'All' ? 'All Movies' : `${selectedGenre} Movies`}
              </h2>
              <span className="text-gray-400">
                {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-surface-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handlePlayMovie(movie)}
                          className="p-2 bg-primary rounded-full hover:bg-primary-light transition-colors"
                        >
                          <ApperIcon name="Play" className="w-4 h-4 text-white" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleMyList(movie)}
                          className={`p-2 rounded-full transition-colors ${
                            myList.some(item => item.id === movie.id)
                              ? 'bg-accent text-black'
                              : 'bg-surface-700 text-white hover:bg-surface-600'
                          }`}
                        >
                          <ApperIcon name={myList.some(item => item.id === movie.id) ? "Heart" : "Plus"} className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleMovieInfo(movie)}
                          className="p-2 bg-surface-700 rounded-full hover:bg-surface-600 transition-colors"
                        >
                          <ApperIcon name="Info" className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 line-clamp-1">{movie.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{movie.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{movie.genre}</span>
                        <span className="text-gray-400 text-xs">{movie.year}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Star" className="w-4 h-4 text-accent" />
                        <span className="text-white text-sm font-medium">{movie.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-gray-400 text-xs">
                      {movie.duration}
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ApperIcon name="Search" className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search terms or filter criteria
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('')
                setSelectedGenre('All')
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Movies