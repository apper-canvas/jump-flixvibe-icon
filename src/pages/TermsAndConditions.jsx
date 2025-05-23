import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowLeft, Shield, Users, FileText, Eye, AlertTriangle, Clock } from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function TermsAndConditions({ darkMode, setDarkMode }) {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
    toast.info('Returning to home page', {
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

  const termsSection = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: "By accessing and using FlixVibe, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: Shield,
      title: "2. Service Description", 
      content: "FlixVibe is a streaming entertainment platform that provides access to movies, TV shows, and original content. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time."
    },
    {
      icon: Users,
      title: "3. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      icon: Eye,
      title: "4. Content and Conduct",
      content: "You agree not to use the service to upload, download, or share content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable."
    },
    {
      icon: AlertTriangle,
      title: "5. Privacy and Data",
      content: "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding your personal information."
    },
    {
      icon: Clock,
      title: "6. Limitation of Liability",
      content: "FlixVibe shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use the service."
    }
  ]

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
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleBackClick}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">FlixVibe</span>
            </motion.div>

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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackClick}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using FlixVibe
            </p>
            <div className="mt-6 text-sm text-gray-400">
              Last updated: January 2024
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsSection.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-surface-800/50 dark:bg-surface-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 bg-surface-800/50 dark:bg-surface-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Additional Information</h2>
            
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">7. Termination</h3>
                <p className="leading-relaxed">
                  Either party may terminate this agreement at any time. Upon termination, 
                  your right to use the service will cease immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">8. Governing Law</h3>
                <p className="leading-relaxed">
                  These terms and conditions are governed by and construed in accordance 
                  with the laws of the jurisdiction in which FlixVibe operates.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">9. Changes to Terms</h3>
                <p className="leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be 
                  effective when posted. Your continued use of the service constitutes 
                  acceptance of the modified terms.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">10. Contact Information</h3>
                <p className="leading-relaxed">
                  If you have any questions about these Terms and Conditions, please 
                  contact us through our Help Center or customer support channels.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Questions About Our Terms?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Our customer support team is here to help you understand our terms and conditions. 
                Don't hesitate to reach out if you need clarification.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/contact-us')
                  toast.info('Navigating to Contact Us', {
                    position: "top-right",
                    autoClose: 2000
                  })
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
              >
                Contact Support
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary-dark border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-light rounded flex items-center justify-center">
              <ApperIcon name="Play" className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-semibold">FlixVibe</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 FlixVibe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default TermsAndConditions