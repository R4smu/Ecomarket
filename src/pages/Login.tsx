import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) redirectBasedOnRole(session.user.email)
    })
  }, [])

  const redirectBasedOnRole = (userEmail: string | undefined) => {
    if (userEmail === 'admin@iesalbarregas.com') {
      navigate('/admin')
    } else {
      navigate('/catalog')
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      alert("Error al iniciar sesión: " + error.message)
    } else if (data.session) {
      redirectBasedOnRole(data.session.user.email)
    }
    
    setLoading(false)
  }

  const fillAdmin = () => { setEmail('admin@iesalbarregas.com'); setPassword('Admin2026') }
  const fillUser = () => { setEmail('user@iesalbarregas.com'); setPassword('User2026!') }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Bienvenido</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Inicia sesión para acceder al mercadillo</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400 mb-4 uppercase tracking-wider font-semibold">
            Atajos de Evaluación
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              type="button" 
              variant="secondary" 
              size="sm" 
              className="text-xs h-auto py-2 whitespace-normal" 
              onClick={fillAdmin}
            >
              Autocompletar Admin
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              size="sm" 
              className="text-xs h-auto py-2 whitespace-normal" 
              onClick={fillUser}
            >
              Autocompletar Usuario
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}