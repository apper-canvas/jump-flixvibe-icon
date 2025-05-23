import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-secondary to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text mb-4">
              404
            </h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 rounded-full"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Oops! Content Not Found
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            The content you're looking for seems to have vanished into the streaming void. 
            Don't worry, there's plenty more to discover!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold text-lg shadow-glow hover:shadow-xl transition-all duration-300"
              >
                <ApperIcon name="Home" className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="flex items-center gap-3 px-8 py-4 bg-surface-800 text-white rounded-xl font-semibold text-lg border border-gray-600 hover:bg-surface-700 transition-all duration-300"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              Go Back
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          {[
            { icon: "Film", label: "Movies" },
            { icon: "Tv", label: "TV Shows" },
            { icon: "Star", label: "Popular" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-surface-800/50 rounded-xl p-4 text-center backdrop-blur-sm border border-gray-700"
            >
              <ApperIcon name={item.icon} className="w-8 h-8 text-primary mx-auto mb-2" />
              <span className="text-gray-300 text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound