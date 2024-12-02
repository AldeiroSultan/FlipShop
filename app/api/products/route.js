// app/api/products/route.js
import { OAuth2 } from 'oauth'

const EBAY_APP_ID = process.env.EBAY_APP_ID
const EBAY_CERT_ID = process.env.EBAY_CERT_ID

async function getEbayAccessToken() {
  const credentials = Buffer.from(`${EBAY_APP_ID}:${EBAY_CERT_ID}`).toString('base64')
  
  const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request) {
  try {
    const searchParams = await request.json()
    const accessToken = await getEbayAccessToken()

    const queryParams = new URLSearchParams({
      q: searchParams.categories.join(' '),
      limit: '50',
      filter: `locationId:${searchParams.location}`,
    })

    const response = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        },
      }
    )

    const data = await response.json()
    
    const products = data.itemSummaries.map(item => ({
      id: item.itemId,
      title: item.title,
      price: parseFloat(item.price.value),
      currency: item.price.currency,
      location: item.itemLocation.city,
      image: item.image?.imageUrl || '/api/placeholder/400/300',
      url: item.itemWebUrl
    }))

    return Response.json({ products })
  } catch (error) {
    console.error('eBay API error:', error)
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}