import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import PublicCatalog from './pages/PublicCatalog'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import { Button } from "@/components/ui/button"
import type { Session } from '@supabase/supabase-js'

function Header() {
  const [session, setSession] = useState<Session | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm p-4 border-b flex justify-between items-center max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800">Mercadillo Solidario IES Albarregas</h1>
      {session && (
        <Button variant="ghost" size="sm" onClick={handleLogout}>Cerrar Sesión</Button>
      )}
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/catalog" element={<PublicCatalog />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App