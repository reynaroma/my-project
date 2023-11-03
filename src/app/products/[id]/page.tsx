import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

// setup the props for the page
interface ProductPageProps {
  params: {
    id: string,
  }
}

export default async function ProductPage(
  { params: { id } }: ProductPageProps
) {
  // get product from database
  // this is a server-side rendered page/ component
  // so we can query the database directly
  const product = await prisma.product.findUnique({
    where: { id }
  })

  if (!product) notFound();
  // render product page
  return (
    <div className="flex flex-col lg:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price}  className="mt-4"/>
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  )
}