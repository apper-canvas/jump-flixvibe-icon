import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Book, User, Settings, CreditCard, Wifi, Play, ArrowLeft, ExternalLink } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function HelpCenter({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const helpCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: 'Play', color: 'text-blue-400' },
    { id: 'account', name: 'Account & Billing', icon: 'User', color: 'text-green-400' },
    { id: 'technical', name: 'Technical Issues', icon: 'Settings', color: 'text-orange-400' },
    { id: 'content', name: 'Content & Features', icon: 'Book', color: 'text-purple-400' }
  ]

  const helpArticles = [
    {
      id: 1,
      title: 'How to create your FlixVibe account',
      category: 'getting-started',
      summary: 'Step-by-step guide to signing up for FlixVibe',
      content: 'Learn how to create your account and start streaming...',
      views: 15420
    },
    {
      id: 2,
      title: 'Managing your subscription and billing',
      category: 'account',
      summary: 'Everything about your subscription, payments, and billing',
      content: 'Your subscription details and payment information...',
      views: 12850
    },
    {
      id: 3,
      title: 'Troubleshooting streaming issues',
      category: 'technical',
      summary: 'Fix common streaming problems and improve video quality',
      content: 'If you\'re experiencing buffering or quality issues...',
      views: 9630
    },
    {
      id: 4,
      title: 'Using the watchlist and favorites',
      category: 'content',
      summary: 'How to save and organize your favorite content',
      content: 'Your watchlist helps you keep track of shows and movies...',
      views: 8720
    },
    {
      id: 5,
      title: 'Setting up parental controls',
      category: 'account',
      summary: 'Create safe viewing experiences for children',
      content: 'Parental controls allow you to restrict content...',
      views: 7890
    },
    {
      id: 6,
      title: 'Download content for offline viewing',
      category: 'content',
      summary: 'Watch your favorites without an internet connection',
      content: 'Download movies and shows to watch offline...',
      views: 11240
    }
  ]

  const faqs = [
    {
      id: 1,
      question: 'How much does FlixVibe cost?',
      answer: 'FlixVibe offers several subscription plans starting from $8.99/month for our Basic plan, $13.99/month for Standard, and $17.99/month for Premium with 4K streaming and multiple screens.',
      category: 'account'
    },
    {
      id: 2,
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your FlixVibe subscription at any time. There are no cancellation fees, and you\'ll continue to have access until the end of your current billing period.',
      category: 'account'
    },
    {
      id: 3,
      question: 'How many devices can I use with one account?',
      answer: 'The number of devices depends on your plan. Basic allows 1 screen, Standard allows 2 screens, and Premium allows 4 screens simultaneously. You can install the app on unlimited devices.',
      category: 'technical'
    },
    {
      id: 4,
      question: 'What video quality can I expect?',
      answer: 'Video quality depends on your plan and internet connection. Basic offers Standard Definition (SD), Standard offers High Definition (HD), and Premium offers Ultra High Definition (4K) where available.',
      category: 'technical'
    },
    {
      id: 5,
      question: 'How do I download content for offline viewing?',
      answer: 'Look for the download icon on eligible titles. Tap it to download to your device. Downloaded content is available in the "Downloads" section and can be watched without internet.',
      category: 'content'
    },
    {
      id: 6,
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 30-day free trial for new subscribers. You can cancel anytime during the trial period without being charged.',
      category: 'getting-started'
    }
  ]

  const contactMethods = [
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      icon: 'MessageCircle'
    },
    {
      type: 'email',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      icon: 'Mail'
    },
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Mon-Fri 9AM-6PM EST',
      icon: 'Phone'
    }
  ]

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        const results = helpArticles.filter(article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }, [searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent! We\'ll get back to you within 24 hours.', {
        position: "top-right",
        autoClose: 4000
      })
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const handleContactMethodClick = (method) => {
    if (method === 'chat') {
      toast.info('Opening live chat...', {
        position: "top-right",
        autoClose: 2000
      })
    } else if (method === 'phone') {
      toast.info('Call us at 1-800-FLIXVIBE', {
        position: "top-right",
        autoClose: 3000
      })
    }
  }

  const filteredArticles = selectedCategory === 'all' 
    ? helpArticles 
    : helpArticles.filter(article => article.category === selectedCategory)

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark dark:from-black dark:via-secondary-dark dark:to-black">
      {/* Header */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-safari bg-secondary-dark/80 dark:bg-black/80 border-b border-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-300" />
              </motion.button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Play" className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FlixVibe Help</span>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Search */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-16 bg-gradient-to-r from-primary/10 to-accent/10"
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            How can we help?
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Search our knowledge base or contact our support team
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 bg-surface-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Search Results */}
            {(searchQuery.length > 0 || searchResults.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface-800 border border-gray-600 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50"
              >
                {isSearching ? (
                  <div className="p-4 text-center text-gray-400">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((article) => (
                    <motion.button
                      key={article.id}
                      whileHover={{ backgroundColor: 'rgba(229, 9, 20, 0.1)' }}
                      className="w-full text-left p-4 border-b border-gray-700 last:border-b-0 hover:bg-primary/5 transition-colors"
                      onClick={() => {
                        toast.success(`Opening article: ${article.title}`, {
                          position: "top-right",
                          autoClose: 2000
                        })
                        setSearchQuery('')
                      }}
                    >
                      <h4 className="text-white font-medium mb-1">{article.title}</h4>
                      <p className="text-gray-400 text-sm">{article.summary}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </motion.button>
                  ))
                ) : searchQuery.length > 2 ? (
                  <div className="p-4 text-center text-gray-400">No results found</div>
                ) : null}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Browse by Category
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {helpCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => {
                  setSelectedCategory(category.id)
                  toast.info(`Filtering by ${category.name}`, {
                    position: "top-right",
                    autoClose: 2000
                  })
                }}
                className={`p-6 bg-surface-800 rounded-xl border border-gray-700 hover:border-primary transition-all duration-300 ${
                  selectedCategory === category.id ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <ApperIcon name={category.icon} className={`w-8 h-8 ${category.color} mx-auto mb-4`} />
                <h3 className="text-white font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">
                  {helpArticles.filter(a => a.category === category.id).length} articles
                </p>
              </motion.button>
            ))}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-800 text-gray-300 hover:bg-surface-700'
              }`}
            >
              All Categories
            </motion.button>
            {helpCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-800 text-gray-300 hover:bg-surface-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-surface-800/20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Popular Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-surface-800 rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  toast.success(`Opening: ${article.title}`, {
                    position: "top-right",
                    autoClose: 2000
                  })
                }}
              >
                <h3 className="text-white font-semibold text-lg mb-3">{article.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{article.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.views.toLocaleString()} views</span>
                  <ApperIcon name="ExternalLink" className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-800 rounded-xl border border-gray-700 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between transition-colors"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ApperIcon 
                    name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                    className="w-5 h-5 text-gray-400 flex-shrink-0" 
                  />
                </motion.button>
                
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-surface-800/20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Still Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.button
                key={method.type}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleContactMethodClick(method.type)}
                className="bg-surface-800 rounded-xl p-6 border border-gray-700 hover:border-primary transition-all duration-300 text-center"
              >
                <ApperIcon name={method.icon} className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-2">{method.description}</p>
                <p className="text-sm text-gray-500">{method.availability}</p>
              </motion.button>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto bg-surface-800 rounded-xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Send us a message</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Describe your issue or question in detail..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HelpCenter