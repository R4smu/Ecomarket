import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product } from "../types"

interface ProductFormProps {
  editingProduct: Product | null
  loading: boolean
  onSave: (data: { name: string, description: string, price: string, category: string, imageFile: File | null }) => void
  onCancelEdit: () => void
}

export function ProductForm({ editingProduct, loading, onSave, onCancelEdit }: Readonly<ProductFormProps>) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Otros')
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name)
      setDescription(editingProduct.description)
      setPrice(editingProduct.price.toString())
      setCategory(editingProduct.category)
      setImageFile(null)
    } else {
      resetFields()
    }
  }, [editingProduct])

  const resetFields = () => {
    setName('')
    setDescription('')
    setPrice('')
    setCategory('Otros')
    setImageFile(null)
    const fileInput = document.getElementById('image') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave({ name, description, price, category, imageFile })
    if (!editingProduct) resetFields()
  }

  const getSubmitButtonText = () => {
    if (loading) return 'Guardando...'
    if (editingProduct) return 'Actualizar Producto'
    return 'Guardar Producto'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-1 h-fit">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{editingProduct ? 'Editar Producto' : 'Añadir Producto'}</h3>
        {editingProduct && <Button variant="ghost" size="sm" onClick={onCancelEdit}>Cancelar Edición</Button>}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><Label htmlFor="name">Nombre</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <textarea id="description" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="price">Precio (€)</Label><Input id="price" type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)} required /></div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Libros">Libros</option><option value="Ropa">Ropa</option><option value="Tecnología">Tecnología</option><option value="Otros">Otros</option>
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="image">Fotografía {editingProduct && <span className="text-xs text-gray-400">(Dejar vacío para mantener actual)</span>}</Label>
          <Input id="image" type="file" accept="image/*" onChange={e => { if (e.target.files) setImageFile(e.target.files[0]) }} />
        </div>
        <Button type="submit" className="w-full mt-4" disabled={loading}>
            {getSubmitButtonText()}
        </Button>
      </form>
    </div>
  )
}