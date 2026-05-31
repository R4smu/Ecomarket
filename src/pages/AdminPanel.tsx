import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import { ProductForm } from '../components/ProductForm'
import { InventoryTable } from '../components/InventoryTable'
import { ReservationsTable } from '../components/ReservationsTable'
import type { Product, Reservation } from '../types'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  const [products, setProducts] = useState<Product[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { 
        fetchData() 
      } else { 
        navigate('/') 
      }
      setIsChecking(false)
    })
  }, [navigate])

  async function fetchData() {
    const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (prodData) setProducts(prodData)

    const { data: resData } = await supabase.from('reservations').select('*, products(name)').order('created_at', { ascending: false })
    if (resData) setReservations(resData)
  }

  async function handleSaveProduct(formData: { name: string, description: string, price: string, category: string, imageFile: File | null }) {
    setLoadingProduct(true)
    try {
      let imageUrl = null

      if (formData.imageFile) {
        const fileName = `${Math.random()}.${formData.imageFile.name.split('.').pop()}`
        const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, formData.imageFile)
        if (uploadError) throw uploadError
        imageUrl = supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl
      }

      const productData: any = { 
        name: formData.name, 
        description: formData.description, 
        price: Number.parseFloat(formData.price), 
        category: formData.category 
      }
      
      if (imageUrl) productData.image_url = imageUrl

      if (editingProduct) {
        await supabase.from('products').update(productData).eq('id', editingProduct.id)
        alert("¡Producto actualizado!")
        setEditingProduct(null)
      } else {
        productData.status = 'Disponible'
        await supabase.from('products').insert([productData])
        alert("¡Producto añadido!")
      }
      
      fetchData()
    } catch (error: any) {
      alert("Error al guardar: " + error.message)
    } finally {
      setLoadingProduct(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchData()
  }

  async function handleStatusChange(id: string, newStatus: string) {
    await supabase.from('products').update({ status: newStatus }).eq('id', id)
    fetchData()
  }

  async function markReservationAsRead(id: string) {
    await supabase.from('reservations').update({ is_read: true }).eq('id', id)
    fetchData()
  }

  if (isChecking) return <div className="text-center py-10 text-gray-500">Verificando acceso...</div>

  return (
    <div className="space-y-10">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Panel de Administración</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProductForm 
          editingProduct={editingProduct} 
          loading={loadingProduct} 
          onSave={handleSaveProduct} 
          onCancelEdit={() => setEditingProduct(null)} 
        />
        <InventoryTable 
          products={products} 
          onEdit={(p) => { setEditingProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} 
          onDelete={handleDelete} 
          onStatusChange={handleStatusChange} 
        />
      </div>

      <ReservationsTable 
        reservations={reservations} 
        onMarkAsRead={markReservationAsRead} 
      />
    </div>
  )
}