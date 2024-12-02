// app/components/ProductSwiper.js
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'

export default function ProductSwiper({ products, loading, onSwipe }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(null)

  const handleSwipe = (dir) => {
    setDirection(dir)
    onSwipe(dir, products[currentIndex])
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
      setDirection(null)
    }, 300)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] max-w-md mx-auto p-4">
      <AnimatePresence>
        {products[currentIndex] && (
          <motion.div
            key={currentIndex}
            initial={{ scale: 1 }}
            animate={{
              scale: 1,
              x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
              opacity: direction ? 0 : 1,
              rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative w-full aspect-square bg-[#0C1B7A]">
              <img
                src={products[currentIndex].image}
                alt={products[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                <span className="font-bold text-lg">
                  {products[currentIndex].currency} {products[currentIndex].price}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{products[currentIndex].title}</h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  <span className="inline-block mr-2">📍</span>
                  {products[currentIndex].location}
                </p>
                {products[currentIndex].seller && (
                  <p className="text-sm text-gray-500">
                    by {products[currentIndex].seller}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-8">
        {/* Dislike Button */}
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center
                   text-white hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 
                   transition-all duration-300"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Like Button */}
        <button
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center
                   text-white hover:bg-white hover:text-green-500 hover:border-2 hover:border-green-500 
                   transition-all duration-300"
        >
          <Heart className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center gap-2">
          {products.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-6 bg-white' 
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}