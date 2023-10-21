export const metadata = {
  title: 'Add Product - Kabayan'
};

async function addProduct(formData: FormData) {
  'use server';

  
}

export default function AddProductPage() {

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form>
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
        <button
          className="btn btn-primary btn-block"
          type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}