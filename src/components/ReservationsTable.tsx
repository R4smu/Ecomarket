import { Button } from "@/components/ui/button"
import type { Reservation } from "../types"

interface ReservationsTableProps {
  reservations: Reservation[]
  onMarkAsRead: (id: string) => void
}

export function ReservationsTable({ reservations, onMarkAsRead }: Readonly<ReservationsTableProps>) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Solicitudes de Reserva</h3>
      {reservations.length === 0 ? (
        <p className="text-sm text-gray-500">No hay reservas pendientes.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Interesado</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Mensaje</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(res => (
                <tr key={res.id} className={`border-b hover:bg-gray-50 ${res.is_read ? 'opacity-50' : 'bg-green-50/30'}`}>
                  <td className="px-4 py-3 text-xs">{new Date(res.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium">{res.sender_name}</td>
                  <td className="px-4 py-3"><a href={`mailto:${res.sender_email}`} className="text-blue-600 hover:underline">{res.sender_email}</a></td>
                  <td className="px-4 py-3 font-semibold text-green-700">{res.products?.name || 'Producto borrado'}</td>
                  <td className="px-4 py-3 italic text-gray-600">{res.message}</td>
                  <td className="px-4 py-3 text-right">
                    {!res.is_read && (
                      <Button variant="outline" size="sm" onClick={() => onMarkAsRead(res.id)}>Marcar Leída</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}