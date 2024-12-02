// app/hooks/useProducts.js
'use client'
import { useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Vintage Leather Jacket",
      price: 199.99,
      currency: "$",
      location: "New York, NY",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Designer Sneakers",
      price: 149.99,
      currency: "$",
      location: "Los Angeles, CA",
      image: "/api/placeholder/400/300"
    }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateSearchParams = async (newParams) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return { products, loading, error, updateSearchParams }
}