import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Button } from "@/components/ui/button"
import { ProductCard } from '../components/ProductCard'
import { ReservationModal } from '../components/ReservationModal'
import type { Product } from '../types'

const CATEGORIES = ['Todas', 'Libros', 'Ropa', 'Tecnología', 'Otros']

export default function PublicCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  
  const [reservingProduct, setReservingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (error) throw error
      if (data) setProducts(data)
    } catch (error) {
      console.error("Error cargando productos:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleReserveSubmit(formData: { senderName: string, senderEmail: string, message: string }) {
    if (!reservingProduct) return
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('reservations').insert([{
        product_id: reservingProduct.id,
        sender_name: formData.senderName,
        sender_email: formData.senderEmail,
        message: formData.message
      }])

      if (error) throw error
      alert(`¡Reserva enviada! El administrador contactará contigo pronto.`)
      setReservingProduct(null)
    } catch (error: any) {
      alert("Error al enviar la reserva: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredProducts = selectedCategory === 'Todas' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) return <div className="text-center py-10">Cargando catálogo...</div>

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b">
        <span className="font-semibold mr-2 text-gray-700">Filtrar por:</span>
        {CATEGORIES.map(cat => (
          <Button 
            key={cat} 
            variant={selectedCategory === cat ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No se encontraron productos en esta categoría.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onReserveClick={(p) => setReservingProduct(p)} 
            />
          ))}
        </div>
      )}

      {reservingProduct && (
        <ReservationModal 
          product={reservingProduct}
          isSubmitting={isSubmitting}
          onClose={() => setReservingProduct(null)}
          onSubmit={handleReserveSubmit}
        />
      )}
    </div>
  )
}