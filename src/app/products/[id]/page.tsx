import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";

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
}