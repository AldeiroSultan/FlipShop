// app/components/LocationSelection.js
'use client'
import { motion } from 'framer-motion'

export default function LocationSelection({ onSubmit }) {
  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Miami, FL',
    'Houston, TX',
    'San Francisco, CA',
  ]

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-16 mt-8">
        Where are you located?
      </h1>
      <div className="w-full max-w-md space-y-4">
        {locations.map((location) => (
          <button
            key={location}
            onClick={() => onSubmit(location)}
            className="w-full bg-white p-4 rounded-xl shadow-lg hover:shadow-xl
                     transition-all text-center font-semibold text-lg"
          >
            {location}
          </button>
        ))}
      </div>
      <button
        onClick={() => onSubmit(locations[0])}
        className="mt-16 px-12 py-4 bg-[#F3B664] text-white rounded-full font-semibold 
                 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Continue
      </button>
    </div>
  )
}