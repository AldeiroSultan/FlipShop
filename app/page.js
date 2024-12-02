// app/page.js
'use client'
import { useState, useEffect } from 'react'
import ProductSwiper from './components/ProductSwiper'
import PreferenceSelection from './components/PreferenceSelection'
import LocationSelection from './components/LocationSelection'
import PreferenceModal from './components/PreferenceModal'
import LikedProducts from './components/LikedProducts'
import { useAuth } from './context/AuthContext'
import SignupForm from './components/Auth/SignupForm'
import { useProducts } from './hooks/useProducts'
import { LogOut, Settings } from 'lucide-react'

export default function Home() {
  // Auth state
  const { user, updateUserPreferences, logout } = useAuth()

  // App state
  const [step, setStep] = useState('preferences')
  const [preferences, setPreferences] = useState({
    categories: [],
    location: '',
  })
  
  // Product interaction state
  const [leftSwipes, setLeftSwipes] = useState(0)
  const [rightSwipes, setRightSwipes] = useState(0)
  const [showPreferenceModal, setShowPreferenceModal] = useState(false)
  const [showLikedProducts, setShowLikedProducts] = useState(false)
  
  // Products data
  const { products, loading, error, updateSearchParams } = useProducts()

  useEffect(() => {
    if (user) {
      if (user.preferences) {
        setPreferences(user.preferences)
        setStep('swiper')
      } else {
        setStep('preferences')
      }
    }
  }, [user])

  const handlePreferencesSubmit = async (categories) => {
    const newPreferences = { ...preferences, categories }
    setPreferences(newPreferences)
    await updateUserPreferences(newPreferences)
    setStep('location')
  }

  const handleLocationSubmit = async (location) => {
    const newPreferences = { ...preferences, location }
    setPreferences(newPreferences)
    await updateUserPreferences(newPreferences)
    await updateSearchParams(newPreferences)
    setStep('swiper')
  }

  const handleSwipe = (direction, product) => {
    if (direction === 'left') {
      const newCount = leftSwipes + 1
      setLeftSwipes(newCount)
      if (newCount >= 40) {
        setShowPreferenceModal(true)
      }
    } else {
      const newCount = rightSwipes + 1
      setRightSwipes(newCount)
      if (newCount >= 10) {
        setShowLikedProducts(true)
      }
    }
  }

  const handleDetailedPreferences = async (detailedPreferences) => {
    try {
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences, detailedPreferences })
      })
      
      if (!response.ok) throw new Error('Failed to process preferences')
      
      const data = await response.json()
      await updateSearchParams(data.searchParams)
      setShowPreferenceModal(false)
      setLeftSwipes(0)
    } catch (error) {
      console.error('Error processing preferences:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logout()
      setStep('preferences')
      setPreferences({
        categories: [],
        location: '',
      })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleResetPreferences = () => {
    setStep('preferences')
    setPreferences({
      categories: [],
      location: '',
    })
  }

  if (!user) {
    return <SignupForm />
  }

  const renderStep = () => {
    switch (step) {
      case 'preferences':
        return <PreferenceSelection onSubmit={handlePreferencesSubmit} />
      
      case 'location':
        return <LocationSelection onSubmit={handleLocationSubmit} />
      
      case 'swiper':
        return (
          <ProductSwiper 
            products={products}
            loading={loading}
            onSwipe={handleSwipe}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-[#2D2D35] relative">
      {/* Header Buttons */}
      <div className="absolute top-4 right-4 flex gap-4 z-50">
        {step === 'swiper' && (
          <button
            onClick={handleResetPreferences}
            className="flex items-center gap-2 px-4 py-2 
                     bg-purple-600 text-white rounded-lg shadow-lg 
                     hover:bg-purple-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Change Preferences
          </button>
        )}

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 
                   bg-white rounded-lg shadow-lg hover:bg-gray-100 
                   transition-colors text-gray-700"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      {renderStep()}

      {/* Modals */}
      {showPreferenceModal && (
        <PreferenceModal 
          onClose={() => setShowPreferenceModal(false)}
          onSubmit={handleDetailedPreferences}
        />
      )}

      {showLikedProducts && (
        <LikedProducts 
          onClose={() => setShowLikedProducts(false)}
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </main>
  )
}