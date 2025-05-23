import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Profile = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  // User profile data
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Movie enthusiast and binge-watching expert. Love discovering new content and sharing recommendations.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    memberSince: '2023',
    subscription: 'Premium',
    watchTime: '2,450 hours'
  })

  // Form data for editing
  const [formData, setFormData] = useState(userProfile)

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    autoplay: true,
    highQuality: true,
    parentalControls: false,
    dataUsage: 'auto',
    language: 'en',
    subtitles: true
  })

  // Password change data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'User' },
    { id: 'settings', name: 'Settings', icon: 'Settings' },
    { id: 'security', name: 'Security', icon: 'Shield' },
    { id: 'preferences', name: 'Preferences', icon: 'Sliders' }
  ]

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('flixvibe-profile')
    const savedSettings = localStorage.getItem('flixvibe-settings')
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserProfile(profile)
      setFormData(profile)
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save profile changes
  const handleSaveProfile = () => {
    setUserProfile(formData)
    localStorage.setItem('flixvibe-profile', JSON.stringify(formData))
    setIsEditing(false)
    toast.success('Profile updated successfully!', {
      position: "top-right",
      autoClose: 3000,
    })
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setFormData(userProfile)
    setIsEditing(false)
    toast.info('Changes discarded', {
      position: "top-right",
      autoClose: 2000,
    })
  }

  // Handle settings change
  const handleSettingChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value }
    setSettings(newSettings)
    localStorage.setItem('flixvibe-settings', JSON.stringify(newSettings))
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`, {
      position: "top-right",
      autoClose: 2000,
    })
  }

  // Handle password change
  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields', {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match', {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long', {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    // Simulate password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowPasswordModal(false)
    toast.success('Password changed successfully!', {
      position: "top-right",
      autoClose: 3000,
    })
  }

  // Handle account deletion
  const handleDeleteAccount = () => {
    // Clear all data
    localStorage.removeItem('flixvibe-profile')
    localStorage.removeItem('flixvibe-settings')
    localStorage.removeItem('flixvibe-watchlist')
    
    toast.success('Account deleted successfully', {
      position: "top-right",
      autoClose: 3000,
    })
    
    // Navigate to home after a delay
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  // Handle file upload for avatar
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newFormData = { ...formData, avatar: e.target.result }
        setFormData(newFormData)
        setUserProfile(newFormData)
        localStorage.setItem('flixvibe-profile', JSON.stringify(newFormData))
        toast.success('Avatar updated successfully!', {
          position: "top-right",
          autoClose: 3000,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-secondary-dark' : 'bg-white'}`}>
      {/* Navigation Header */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-secondary-dark/90 backdrop-blur-md border-b border-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Back Button */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white hover:text-primary transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </motion.button>
              
              <div className="h-6 w-px bg-gray-600" />
              
              <h1 className="text-xl font-bold text-white">
                My Profile
              </h1>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-surface-800 hover:bg-surface-700 rounded-xl transition-colors"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 text-white" 
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1"
          >
            <div className="bg-surface-800/50 rounded-2xl p-6 border border-gray-700">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                  />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
                    <ApperIcon name="Camera" className="w-4 h-4 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{userProfile.name}</h2>
                <p className="text-gray-400 text-sm">{userProfile.subscription} Member</p>
                <p className="text-gray-500 text-xs">Member since {userProfile.memberSince}</p>
              </div>

              {/* Tab Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-glow'
                        : 'text-gray-300 hover:bg-surface-700 hover:text-white'
                    }`}
                  >
                    <ApperIcon name={tab.icon} className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface-800/50 rounded-2xl p-6 md:p-8 border border-gray-700">
              <AnimatePresence mode="wait">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Profile Information</h3>
                      {!isEditing ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                          Edit Profile
                        </motion.button>
                      ) : (
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-colors"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSaveProfile}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors"
                          >
                            Save Changes
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Profile Form Fields */}
                      <div>
                        <label className="block text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={isEditing ? formData.name : userProfile.name}
                          onChange={(e) => isEditing && setFormData({...formData, name: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={isEditing ? formData.email : userProfile.email}
                          onChange={(e) => isEditing && setFormData({...formData, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={isEditing ? formData.phone : userProfile.phone}
                          onChange={(e) => isEditing && setFormData({...formData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">Location</label>
                        <input
                          type="text"
                          value={isEditing ? formData.location : userProfile.location}
                          onChange={(e) => isEditing && setFormData({...formData, location: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={isEditing ? formData.bio : userProfile.bio}
                        onChange={(e) => isEditing && setFormData({...formData, bio: e.target.value})}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-surface-700/50 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{userProfile.watchTime}</div>
                        <div className="text-gray-400 text-sm">Watch Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">127</div>
                        <div className="text-gray-400 text-sm">Movies Watched</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">43</div>
                        <div className="text-gray-400 text-sm">Shows Completed</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Settings</h3>
                    
                    <div className="space-y-6">
                      {/* Notification Settings */}
                      <div className="p-6 bg-surface-700/50 rounded-xl">
                        <h4 className="text-lg font-semibold text-white mb-4">Notifications</h4>
                        <div className="space-y-4">
                          {[
                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Get notified about new releases via email' },
                            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' }
                          ].map(({ key, label, desc }) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <div className="text-white font-medium">{label}</div>
                                <div className="text-gray-400 text-sm">{desc}</div>
                              </div>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSettingChange(key, !settings[key])}
                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                  settings[key] ? 'bg-primary' : 'bg-gray-600'
                                }`}
                              >
                                <motion.div
                                  animate={{ x: settings[key] ? 24 : 0 }}
                                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                                />
                              </motion.button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Playback Settings */}
                      <div className="p-6 bg-surface-700/50 rounded-xl">
                        <h4 className="text-lg font-semibold text-white mb-4">Playback</h4>
                        <div className="space-y-4">
                          {[
                            { key: 'autoplay', label: 'Autoplay', desc: 'Automatically play next episode' },
                            { key: 'highQuality', label: 'High Quality', desc: 'Stream in highest available quality' },
                            { key: 'subtitles', label: 'Subtitles', desc: 'Show subtitles by default' }
                          ].map(({ key, label, desc }) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <div className="text-white font-medium">{label}</div>
                                <div className="text-gray-400 text-sm">{desc}</div>
                              </div>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSettingChange(key, !settings[key])}
                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                  settings[key] ? 'bg-primary' : 'bg-gray-600'
                                }`}
                              >
                                <motion.div
                                  animate={{ x: settings[key] ? 24 : 0 }}
                                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                                />
                              </motion.button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Security</h3>
                    
                    <div className="space-y-6">
                      {/* Password Section */}
                      <div className="p-6 bg-surface-700/50 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">Password</h4>
                            <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowPasswordModal(true)}
                            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                          >
                            Change Password
                          </motion.button>
                        </div>
                      </div>

                      {/* Account Actions */}
                      <div className="p-6 bg-surface-700/50 rounded-xl">
                        <h4 className="text-lg font-semibold text-white mb-4">Account Actions</h4>
                        <div className="space-y-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              toast.info('Download started - Check your downloads folder', {
                                position: "top-right",
                                autoClose: 3000,
                              })
                            }}
                            className="w-full flex items-center justify-between p-4 bg-surface-800 hover:bg-surface-600 rounded-xl transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <ApperIcon name="Download" className="w-5 h-5 text-white" />
                              <div className="text-left">
                                <div className="text-white font-medium">Download My Data</div>
                                <div className="text-gray-400 text-sm">Export your account data</div>
                              </div>
                            </div>
                            <ApperIcon name="ChevronRight" className="w-5 h-5 text-gray-400" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full flex items-center justify-between p-4 bg-red-900/30 hover:bg-red-900/50 border border-red-800 rounded-xl transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <ApperIcon name="Trash2" className="w-5 h-5 text-red-400" />
                              <div className="text-left">
                                <div className="text-red-400 font-medium">Delete Account</div>
                                <div className="text-red-500 text-sm">Permanently delete your account</div>
                              </div>
                            </div>
                            <ApperIcon name="ChevronRight" className="w-5 h-5 text-red-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Preferences</h3>
                    
                    <div className="space-y-6">
                      {/* Language Settings */}
                      <div className="p-6 bg-surface-700/50 rounded-xl">
                        <h4 className="text-lg font-semibold text-white mb-4">Language & Region</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-2">Language</label>
                            <select
                              value={settings.language}
                              onChange={(e) => handleSettingChange('language', e.target.value)}
                              className="w-full px-4 py-3 bg-surface-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-2">Data Usage</label>
                            <select
                              value={settings.dataUsage}
                              onChange={(e) => handleSettingChange('dataUsage', e.target.value)}
                              className="w-full px-4 py-3 bg-surface-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="auto">Auto</option>
                              <option value="wifi">Wi-Fi Only</option>
                              <option value="low">Low Data Mode</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Content Preferences */}
                      <div className="p-6 bg-surface-700/50 rounded-xl">
                        <h4 className="text-lg font-semibold text-white mb-4">Content</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-medium">Parental Controls</div>
                              <div className="text-gray-400 text-sm">Restrict mature content</div>
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSettingChange('parentalControls', !settings.parentalControls)}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                settings.parentalControls ? 'bg-primary' : 'bg-gray-600'
                              }`}
                            >
                              <motion.div
                                animate={{ x: settings.parentalControls ? 24 : 0 }}
                                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                              />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-800 rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Change Password
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-800 rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Delete Account</h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                </p>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    Delete Account
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile