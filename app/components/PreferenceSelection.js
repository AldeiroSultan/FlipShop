// app/components/PreferenceSelection.js
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PreferenceSelection({ onSubmit }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  
  const categories = [
    { id: 'tops', label: 'Tops', emoji: '👕' },
    { id: 'pants', label: 'Pants', emoji: '👖' },
    { id: 'shoes', label: 'Shoes', emoji: '👟' },
    { id: 'caps', label: 'Caps', emoji: '🧢' },
    { id: 'bags', label: 'Bags', emoji: '👜' },
    { id: 'accessories', label: 'Accessories', emoji: '💍' },
  ]

  const handleContinue = () => {
    if (selectedCategories.length > 0) {
      onSubmit(selectedCategories)
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold text-white mb-16">
        What are you looking for?
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategories(prev => 
                prev.includes(category.id)
                  ? prev.filter(id => id !== category.id)
                  : [...prev, category.id]
              )
            }}
            className={`bg-white p-4 rounded-xl shadow-lg hover:shadow-xl
                     transition-all text-center font-semibold text-lg
                     flex flex-col items-center justify-center gap-2
                     ${selectedCategories.includes(category.id) 
                       ? 'bg-purple-100 border-2 border-purple-500' 
                       : 'hover:bg-gray-50'}`}
          >
            <span className="text-3xl">{category.emoji}</span>
            {category.label}
          </button>
        ))}
      </div>
      <motion.button
        onClick={handleContinue}
        disabled={selectedCategories.length === 0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-16 px-12 py-4 rounded-full font-semibold text-lg
                   shadow-lg transition-all
                   ${selectedCategories.length > 0 
                     ? 'bg-[#F3B664] text-white hover:bg-[#f0a850]' 
                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Continue
      </motion.button>
    </div>
  )
}