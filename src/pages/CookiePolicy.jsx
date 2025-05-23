import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Cookie, Settings, Shield, AlertCircle } from 'lucide-react'

const CookiePolicy = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-secondary-dark text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-surface-800 border-surface-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center space-x-2 ${darkMode ? 'text-white hover:text-primary-400' : 'text-gray-900 hover:text-primary-600'} transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to FlixVibe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`${darkMode ? 'bg-surface-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden transition-colors duration-300`}>
          <div className="px-8 py-12">
            {/* Title Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Cookie className={`w-16 h-16 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              </div>
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Cookie Policy
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                This Cookie Policy explains how FlixVibe uses cookies and similar technologies to recognize you when you visit our platform.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                Last updated: December 2024
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* What Are Cookies */}
              <section>
                <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                  <AlertCircle className={`w-6 h-6 mr-3 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                  What Are Cookies?
                </h2>
                <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                    Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
                    as well as to provide reporting information.
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    Cookies set by the website owner (in this case, FlixVibe) are called "first party cookies". 
                    Cookies set by parties other than the website owner are called "third party cookies".
                  </p>
                </div>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                  <Settings className={`w-6 h-6 mr-3 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                  Types of Cookies We Use
                </h2>
                <div className="grid gap-6">
                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-surface-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                      Essential Cookies
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      These cookies are necessary for the website to function and cannot be switched off in our systems. 
                      They are usually only set in response to actions made by you which amount to a request for services, 
                      such as setting your privacy preferences, logging in or filling in forms.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-surface-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                      Performance Cookies
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance 
                      of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-surface-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                      Functional Cookies
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      These cookies enable the website to provide enhanced functionality and personalization. 
                      They may be set by us or by third party providers whose services we have added to our pages.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-surface-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                      Targeting Cookies
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      These cookies may be set through our site by our advertising partners. 
                      They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
                    </p>
                  </div>
                </div>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                  <Shield className={`w-6 h-6 mr-3 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                  Managing Your Cookies
                </h2>
                <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                    Most web browsers allow some control of most cookies through the browser settings. However, 
                    if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                    You can manage your cookie preferences by:
                  </p>
                  <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 ml-4`}>
                    <li>Using your browser's cookie settings</li>
                    <li>Using our cookie preference center (when available)</li>
                    <li>Opting out of third-party advertising cookies</li>
                    <li>Clearing your browser's cache and cookies</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                  Questions About This Policy
                </h2>
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-surface-700' : 'bg-gray-50'}`}>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                    If you have any questions about this Cookie Policy, please contact us at:
                  </p>
                  <p className={`${darkMode ? 'text-primary-400' : 'text-primary-600'} font-medium`}>
                    Email: privacy@flixvibe.com
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CookiePolicy