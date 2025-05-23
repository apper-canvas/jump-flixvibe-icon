import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Search, User, Home, Film, Tv, Bookmark, Info, Sun, Moon, ArrowLeft } from 'lucide-react'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

export default function PrivacyPolicy({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigate = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    toast.success(`Switched to ${!darkMode ? 'dark' : 'light'} mode`, {
      position: "top-right",
      autoClose: 2000,
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-secondary-dark text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-primary-dark/95 backdrop-blur-sm border-b border-surface-700' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ApperIcon className="h-8 w-8" />
              <span className="text-xl font-bold text-primary-500">FlixVibe</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigate('/')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigate('/movies')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Film className="h-4 w-4" />
                <span>Movies</span>
              </button>
              <button
                onClick={() => handleNavigate('/tv-shows')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Tv className="h-4 w-4" />
                <span>TV Shows</span>
              </button>
              <button
                onClick={() => handleNavigate('/my-list')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Bookmark className="h-4 w-4" />
                <span>My List</span>
              </button>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => handleNavigate('/search')}
                className={`p-2 rounded-md transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleNavigate('/profile')}
                className={`p-2 rounded-md transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={toggleMenu}
                className={`md:hidden p-2 rounded-md transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'border-surface-700 bg-primary-dark' : 'border-gray-200 bg-white'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigate('/')}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigate('/movies')}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Film className="h-5 w-5" />
                <span>Movies</span>
              </button>
              <button
                onClick={() => handleNavigate('/tv-shows')}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Tv className="h-5 w-5" />
                <span>TV Shows</span>
              </button>
              <button
                onClick={() => handleNavigate('/my-list')}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Bookmark className="h-5 w-5" />
                <span>My List</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'text-gray-300 hover:text-white hover:bg-surface-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>

          <div className={`rounded-lg shadow-lg ${darkMode ? 'bg-surface-800 border border-surface-700' : 'bg-white border border-gray-200'} p-8`}>
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, and viewing preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  We use the information we collect to provide, maintain, and improve our services, personalize your experience, and communicate with you about our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  If you have any questions about this privacy policy, please contact us at privacy@flixvibe.com or through our contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}