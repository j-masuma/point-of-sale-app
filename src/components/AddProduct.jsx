import { useContext, useState } from "react";
import { ProductContext } from "../App";


function AddProduct() {
  const [newProduct, setNewProduct]= useState({
    title: '',
    description: '',
    category:'Women Clothing',
    price:0,
    image: null
  })
  const {handleAddProduct} = useContext(ProductContext);
  
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setNewProduct((prevProduct)=>(
      {
        ...prevProduct,
        [name] : value,
      }
    ));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 200 * 1024) {
      alert("Image file size should be less than 200KB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Resize the image
        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to Base64
        const base64String = canvas.toDataURL("image/jpeg");
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          image: base64String,
        }));
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      handleAddProduct(newProduct);
      document.getElementById('my_modal_3').close();

    }
  return (
    <div>
      <button className="btn btn-neutral" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Products</button>
      <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
              <form method="dialog" className="p-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3">
                      <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={()=>{document.getElementById('my_modal_3').close();}}>
                          ✕
                      </button>
                      <input 
                          name="title"
                          type="text" 
                          placeholder="Product Name" 
                          className="input input-bordered w-full max-w-xs"
                          value={newProduct.title} 
                          onChange={handleInputChange} 
                          required
                        />
                      <textarea 
                        name="description"
                        className="textarea textarea-bordered" 
                        placeholder="Product description"
                        value={newProduct.description}
                        onChange={handleInputChange} 
                        required
                      ></textarea>
                      
                      <label className="input input-bordered flex items-center gap-2" >
                        <input  
                        className="grow" 
                        placeholder="Product Price" 
                        type="number"
                        name="price"
                        value={newProduct.price}
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
                        required
                      />
                      
                  </div>
                  <div className="flex justify-end mt-6">
                      <button className="btn btn-neutral w-28 rounded-sm" type="submit">Add</button>
                  </div>
                  
              </form>
          </div>
      </dialog>
    </div>
  )
}

export default AddProduct