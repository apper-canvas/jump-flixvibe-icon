import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart, 
  Coffee, 
  Zap, 
  Award, 
  Sun, 
  Moon, 
  ArrowLeft,
  Send,
  Upload,
  CheckCircle,
  Building,
  Calendar,
  Globe
} from 'lucide-react'
import ApperIcon from '../components/ApperIcon'

function Careers({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null,
    portfolio: ''
  })

  const [jobListings] = useState([
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Join our engineering team to build the next generation of streaming experiences. We're looking for passionate developers who love creating scalable, user-friendly applications.",
      requirements: [
        "5+ years of experience with React and Node.js",
        "Experience with cloud platforms (AWS, Azure, GCP)",
        "Strong understanding of microservices architecture",
        "Experience with streaming technologies"
      ],
      benefits: ["Health Insurance", "401k", "Flexible PTO", "Remote Work"],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Create intuitive and beautiful user experiences for millions of users. We're seeking a creative designer who understands both user needs and business goals.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar tools",
        "Strong portfolio showcasing user-centered design",
        "Experience with design systems"
      ],
      benefits: ["Health Insurance", "401k", "Creative Budget", "Flexible Hours"],
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $160k",
      description: "Help us understand user behavior and optimize our content recommendations using advanced analytics and machine learning techniques.",
      requirements: [
        "PhD or Masters in Data Science, Statistics, or related field",
        "Experience with Python, R, and SQL",
        "Knowledge of machine learning algorithms",
        "Experience with big data technologies"
      ],
      benefits: ["Health Insurance", "401k", "Learning Budget", "Remote Work"],
      posted: "3 days ago"
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Drive product strategy and execution for our core streaming platform. Lead cross-functional teams to deliver features that delight our users.",
      requirements: [
        "5+ years of product management experience",
        "Experience with streaming or entertainment products",
        "Strong analytical and communication skills",
        "MBA preferred but not required"
      ],
      benefits: ["Health Insurance", "401k", "Stock Options", "Flexible PTO"],
      posted: "5 days ago"
    },
    {
      id: 5,
      title: "Content Operations Specialist",
      department: "Operations",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$65k - $85k",
      description: "Manage content workflows and ensure high-quality media delivery across our platform. Work with content teams to optimize our catalog.",
      requirements: [
        "2+ years of operations experience",
        "Experience with media workflows",
        "Strong attention to detail",
        "Knowledge of video encoding formats"
      ],
      benefits: ["Health Insurance", "401k", "Wellness Program", "Team Events"],
      posted: "1 week ago"
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$100k - $140k",
      description: "Build and maintain our cloud infrastructure to support millions of concurrent users. Focus on scalability, reliability, and security.",
      requirements: [
        "3+ years of DevOps experience",
        "Experience with Kubernetes and Docker",
        "Knowledge of CI/CD pipelines",
        "Cloud platform experience (AWS preferred)"
      ],
      benefits: ["Health Insurance", "401k", "Tech Stipend", "Conference Budget"],
      posted: "4 days ago"
    }
  ])

  const departments = ['All', 'Engineering', 'Design', 'Analytics', 'Product', 'Operations']
  const locations = ['All', 'San Francisco, CA', 'New York, NY', 'Remote', 'Los Angeles, CA', 'Austin, TX', 'Seattle, WA']

  const benefits = [
    { icon: 'Heart', title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
    { icon: 'Coffee', title: 'Work-Life Balance', description: 'Flexible hours and unlimited PTO policy' },
    { icon: 'Zap', title: 'Growth Opportunities', description: 'Learning budget and career development programs' },
    { icon: 'Award', title: 'Competitive Compensation', description: 'Competitive salaries and equity packages' },
    { icon: 'Users', title: 'Amazing Team', description: 'Work with talented, passionate colleagues' },
    { icon: 'Globe', title: 'Remote Friendly', description: 'Flexible remote and hybrid work options' }
  ]

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation
    return matchesSearch && matchesDepartment && matchesLocation
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    toast.success(`Switched to ${!darkMode ? 'dark' : 'light'} mode`, {
      icon: !darkMode ? '🌙' : '☀️',
      position: "top-right"
    })
  }

  const handleGoBack = () => {
    navigate(-1)
    toast.info('Going back', {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
    toast.info(`Viewing ${job.title} details`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleApplyClick = (job) => {
    setSelectedJob(job)
    setShowApplicationForm(true)
    toast.info(`Starting application for ${job.title}`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setApplicationData(prev => ({
      ...prev,
      resume: file
    }))
    toast.info(`Resume uploaded: ${file.name}`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleSubmitApplication = (e) => {
    e.preventDefault()
    
    // Validation
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.resume) {
      toast.error('Please fill in all required fields and upload your resume', {
        position: "top-right",
        autoClose: 3000
      })
      return
    }

    // Simulate API call
    toast.loading('Submitting your application...', {
      position: "top-right",
      autoClose: false,
      toastId: 'application-submit'
    })

    setTimeout(() => {
      toast.dismiss('application-submit')
      toast.success(`Application submitted successfully for ${selectedJob.title}! We'll be in touch soon.`, {
        position: "top-right",
        autoClose: 5000
      })
      
      setShowApplicationForm(false)
      setSelectedJob(null)
      setApplicationData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null,
        portfolio: ''
      })
    }, 2000)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-black' : 'bg-white'} transition-colors duration-300`}>
      {/* Header */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-safari bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoBack}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Play" className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">FlixVibe Careers</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-gray-700 dark:text-gray-300" 
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20"
      >
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Join Our Team
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Help us build the future of entertainment. Join a team of passionate creators, engineers, and innovators 
            working to deliver amazing streaming experiences to millions of users worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <ApperIcon name="Users" className="w-5 h-5" />
              <span>500+ Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Globe" className="w-5 h-5" />
              <span>Remote Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Award" className="w-5 h-5" />
              <span>Top Rated Employer</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Job Search and Filters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-12 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Search */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Jobs
                  </label>
                  <div className="relative">
                    <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by title or description..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredJobs.length} of {jobListings.length} positions
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Job Listings */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-12"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Building" className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="MapPin" className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Clock" className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="DollarSign" className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-4 md:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleJobClick(job)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApplyClick(job)}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.benefits.slice(0, 3).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                    {job.benefits.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                        +{job.benefits.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work at FlixVibe?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in creating an environment where our team can thrive personally and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={benefit.icon} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Application Modal */}
      {showApplicationForm && selectedJob && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowApplicationForm(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Apply for {selectedJob.title}
                </h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={applicationData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={applicationData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <ApperIcon name="Upload" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400 mb-1">
                        {applicationData.resume ? applicationData.resume.name : 'Click to upload your resume'}
                      </p>
                      <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max 10MB)</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={applicationData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://your-portfolio.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us why you're interested in this position..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    <ApperIcon name="Send" className="w-4 h-4" />
                    Submit Application
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Careers