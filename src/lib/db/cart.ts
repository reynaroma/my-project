//  functions we use in server actions
import { Cart, Prisma } from "@prisma/client";
import prisma from "./prisma";
import {cookies} from "next/headers"

// create the type for the cart with products
export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>

// the cart type; add what type
export type ShoppingCart = CartWithProducts & {
  size: number,
  subtotal: number,
};

// gets the cart from database
export async function getCart() {
  // get the cart id from the cookie
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId? await prisma.cart.findUnique({
    where: {id: localCartId},
    // include the items in the cart
    include: { items: { include: {product: true}  } }
  })
  : null;

  if (!cart) {
    return null;
  }

  return {
    // 
    ...cart,
    // calculate the size of the cart
    size: cart.items.reduce((acc, items) => acc + items.quantity, 0),
    subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
  }
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