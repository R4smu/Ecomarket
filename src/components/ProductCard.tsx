import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onReserveClick: (product: Product) => void
}

export function ProductCard({ product, onReserveClick }: Readonly<ProductCardProps>) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">Sin imagen</div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge variant={product.status === 'Disponible' ? 'default' : 'secondary'}>
            {product.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 font-medium">{product.category}</p>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-green-600">{product.price} €</p>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={product.status !== 'Disponible'}
          onClick={() => onReserveClick(product)}
        >
          {product.status === 'Disponible' ? 'Solicitar Reserva' : 'No disponible'}
        </Button>
      </CardFooter>
    </Card>
  )
}