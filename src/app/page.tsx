import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/db/prisma'
import Image from 'next/image'

export default async function Home() {
  // get products from database
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' }
  })

  return (
    <div>
      <ProductCard product={products[2]} />
    </div>
  )
}
