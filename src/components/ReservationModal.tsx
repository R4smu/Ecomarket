import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product } from "../types"

interface ReservationModalProps {
  product: Product
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (data: { senderName: string, senderEmail: string, message: string }) => void
}

export function ReservationModal({ product, isSubmitting, onClose, onSubmit }: Readonly<ReservationModalProps>) {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ senderName, senderEmail, message })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold mb-2">Solicitar: {product.name}</h3>
        <p className="text-sm text-gray-500 mb-6">Rellena este formulario para que el administrador contacte contigo.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="senderName">Tu Nombre</Label>
            <Input id="senderName" value={senderName} onChange={e => setSenderName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="senderEmail">Tu Email</Label>
            <Input id="senderEmail" type="email" value={senderEmail} onChange={e => setSenderEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="message">Mensaje Adicional</Label>
            <textarea 
              id="message" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Ej: Me gustaría recogerlo el martes por la tarde..."
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              required 
            />
          </div>
          
          <div className="flex gap-3 justify-end mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}