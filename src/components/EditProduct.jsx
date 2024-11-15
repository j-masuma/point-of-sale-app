/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useRef } from "react";
import { ProductContext } from "../App";

function EditProduct({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.image,
  });

  const modalRef = useRef(null);
  const { handleEditProduct } = useContext(ProductContext);

  useEffect(() => {
    setUpdatedProduct({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFields = {
      ...product,
      ...updatedProduct,
    };
    handleEditProduct(updatedFields);
    modalRef.current.close();
  };

  return (
    <div>
      <button onClick={() => modalRef.current.showModal()}>Edit</button>
      <dialog ref={modalRef} id="edit_modal" className="modal">
        <div className="modal-box">
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => modalRef.current.close()}
                type="button"
              >
                ✕
              </button>
              <input
                name="title"
                type="text"
                placeholder="Update Product Name"
                className="input input-bordered w-full max-w-xs"
                value={updatedProduct.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder="Update Product Description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                required
              ></textarea>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  className="grow"
                  placeholder="Update Product Price"
                  type="number"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  step={5}
                  required
                />
                <kbd className="kbd kbd-sm">$</kbd>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn btn-neutral w-28 rounded-sm" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default EditProduct;
