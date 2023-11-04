//  functions we use in server actions
import prisma from "./prisma";
import {cookies} from "next/headers"
// create an empty cart
export async function createCart() {
  const newCart = await prisma.cart.create({
    data: {}
  })

  // use cookies for anonymous carts
  cookies().set("localCartId", newCart.id);
}