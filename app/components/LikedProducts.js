// app/components/LikedProducts.js
'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserData, removeLikedProduct } from '../firebase/firestore';

export default function LikedProducts({ onClose }) {
  const { user } = useAuth();
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          setLikedProducts(userData?.likedProducts || []);
        } catch (error) {
          console.error('Error fetching liked products:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLikedProducts();
  }, [user]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Liked Items</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        {likedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No liked products yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-lg font-bold text-purple-600">
                    {product.currency} {product.price}
                  </p>
                  <p className="text-sm text-gray-500">{product.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}