"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
// use the getCart function from the cart.ts file
// to get the cart from the database
export async function incrementProductQuantity(productId: string) {
  const cart = await getCart() ?? await createCart();
  // find the article in the cart
  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1} },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: cart.id,
        productId,
      },
    });
  }

  revalidatePath("/products/[id]");
}