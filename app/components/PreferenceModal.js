// app/components/PreferenceModal.js
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PreferenceModal({ onClose, onSubmit }) {
  const [preferences, setPreferences] = useState('')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl max-w-md w-full p-6"
      >
        <h2 className="text-2xl font-bold mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-gray-600 mb-4">
          Tell us more about what you want, and we'll help you find it.
        </p>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Example: I'm looking for vintage leather jackets in brown, size medium, under $200..."
          className="w-full h-32 p-3 border rounded-lg resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(preferences)}
            className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Find Items
          </button>
        </div>
      </motion.div>
    </div>
  )
}