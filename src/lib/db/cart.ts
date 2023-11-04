//  functions we use in server actions
import prisma from "./prisma";
import {cookies} from "next/headers"

// gets the cart from database
export async function getCart() {
  // get the cart id from the cookie
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId? await prisma.cart.findUnique({
    where: {id: localCartId},
    include: { items}
  })
}

// create an empty cart
export async function createCart() {
  const newCart = await prisma.cart.create({
    data: {}
  })

  // use cookies for anonymous carts
  //  Note: Needs encryption + secure settings in real production app
  // Note: Needs to be a session cookie
  cookies().set("localCartId", newCart.id);
}