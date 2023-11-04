import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "../AddToCart";
import { incrementProductQuantity } from "../actions";

// setup the props for the page
interface ProductPageProps {
  params: {
    id: string,
  }
}
// de-duplicate getProduct calls; react cache function
const getProduct = cache(async (id: string) => {
  // get product from database
  // this is a server-side rendered page/ component
  // so we can query the database directly
  const product = await prisma.product.findUnique({
    where: { id }
  })
  if (!product) notFound();
  return product;
})

export async function generateMetadata(
  { params: { id } }: ProductPageProps
): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + ' - Kabayan',
    description: product.description,
    // open graph metadata
    openGraph: {
      images: [
        {
          url: product.imageUrl,
          width: 500,
          height: 500,
          alt: product.name,
        }
      ]
    }
  }
}

export default async function ProductPage(
  { params: { id } }: ProductPageProps
) {
  // get product from getProduct; cache
  const product = await getProduct(id);
  // render product page
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
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
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity} />
      </div>
    </div>
  )
}