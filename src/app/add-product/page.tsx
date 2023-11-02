import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Add Product - Kabayan'
};
// server-side only; server action
async function addProduct(formData: FormData) {
  'use server';

  // TODO: get form data
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  // TODO: validate input
  if (!name || !description || !imageUrl || !price) {
    throw new Error('Missing required fields');
  }

  // TODO: add product to database using Prisma or create document
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

// route to AddProductPage
export default function AddProductPage() {

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full mb-3"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input input-bordered w-full mb-3"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered w-full mb-3"
        />
        <FormSubmitButton
          className="btn btn-primary btn-block"
          type="submit">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}