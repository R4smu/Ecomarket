import { Button } from "@/components/ui/button"
import type { Product } from "../types"

interface InventoryTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, newStatus: string) => void
}

export function InventoryTable({ products, onEdit, onDelete, onStatusChange }: Readonly<InventoryTableProps>) {
    return (
    <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-2 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Catálogo Actual</h3>
      {products.length === 0 ? (
        <p className="text-sm text-gray-500">No hay productos en el inventario.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {product.image_url ? <img src={product.image_url} alt="img" className="w-10 h-10 object-cover rounded" /> : <div className="w-10 h-10 bg-gray-200 rounded text-[10px] flex items-center justify-center">N/A</div>}
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">{product.price} €</td>
                  <td className="px-4 py-3">
                    <select className="border rounded p-1 text-xs" value={product.status} onChange={(e) => onStatusChange(product.id, e.target.value)}>
                      <option value="Disponible">Disponible</option><option value="Reservado">Reservado</option><option value="Vendido">Vendido</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(product)}>Editar</Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>Borrar</Button>
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