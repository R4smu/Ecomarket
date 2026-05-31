export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  status: string
  image_url: string
}

export interface Reservation {
  id: string
  created_at: string
  product_id: string
  sender_name: string
  sender_email: string
  message: string
  is_read: boolean
  products?: { name: string }
}