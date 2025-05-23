import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Scale, Shield, FileText, Globe, Mail, Phone } from 'lucide-react'

function LegalInfo({ darkMode, setDarkMode }) {
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-secondary-dark' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-secondary-dark/80 border-b border-gray-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Scale className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Legal Information</h1>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-surface-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-surface-700 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full">
              <Scale className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Legal Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Important legal notices, disclaimers, and compliance information for FlixVibe services
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Legal Notice */}
          <section className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-card">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Legal Notice</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                FlixVibe is operated by FlixVibe Entertainment Ltd., a company incorporated under the laws of [Jurisdiction]. 
                This website and its content are provided for entertainment and informational purposes only.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                All content displayed on this platform is either owned by FlixVibe or licensed from third-party content providers. 
                Unauthorized reproduction, distribution, or transmission of any content is strictly prohibited.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-card">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disclaimers</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Content Accuracy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  While we strive to provide accurate and up-to-date information, FlixVibe makes no warranties regarding 
                  the accuracy, completeness, or reliability of any content on our platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Service Availability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  FlixVibe services are provided "as is" and "as available." We do not guarantee uninterrupted access 
                  to our services and may experience downtime for maintenance or technical issues.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Third-Party Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our platform may contain links to third-party websites or content. FlixVibe is not responsible 
                  for the content, privacy practices, or terms of service of external sites.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-card">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Intellectual Property Rights</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All trademarks, service marks, trade names, logos, and other intellectual property displayed on FlixVibe 
                are the property of their respective owners. The FlixVibe name, logo, and all related marks are 
                trademarks of FlixVibe Entertainment Ltd.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Users are granted a limited, non-exclusive license to access and use the FlixVibe service for personal, 
                non-commercial purposes only. Any commercial use requires prior written authorization.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-card">
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law & Jurisdiction</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These legal terms and your use of FlixVibe services are governed by the laws of [Jurisdiction], 
                without regard to conflict of law principles.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Any disputes arising from or relating to FlixVibe services shall be subject to the exclusive 
                jurisdiction of the courts of [Jurisdiction].
              </p>
            </div>
          </section>

          {/* Compliance */}
          <section className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-card">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Regulatory Compliance</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                FlixVibe is committed to compliance with applicable laws and regulations, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Digital Millennium Copyright Act (DMCA)</li>
                <li>General Data Protection Regulation (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Accessibility standards (WCAG 2.1)</li>
                <li>Local broadcasting and content distribution regulations</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-card">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Legal Contact Information</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For legal inquiries, copyright notices, or compliance matters, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  Email: legal@flixvibe.com
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Address: Legal Department, FlixVibe Entertainment Ltd., [Address]
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default LegalInfo