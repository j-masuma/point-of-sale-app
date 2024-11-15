

import { createContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Products from './components/Products'
import axios from 'axios';

const ProductContext = createContext({
  products: [],
  addProduct: ()=>{},
  removeProduct: ()=>{}
});
function App() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
      axios.get('https://fakestoreapi.com/products')
      .then(res=>{
          console.log(res.data);
          setProducts(res.data);
      })
      .catch(err=>console.log(err));
    },[]);

    const handleAddProduct = async (newProduct) => {
      try {
        const response = await axios.post('https://fakestoreapi.com/products', newProduct);
        const createdProduct = response.data;
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        console.log(`Product added successfully:`, createdProduct);
      } catch (err) {
        console.log(`Error Adding Product: ${err}`);
      }
    };
    const handleEditProduct = async(updatedProduct) => {
      try{
        const response = await axios.put(`https://fakestoreapi.com/products/${updatedProduct.id}`,updatedProduct);
        const editedProduct = response.data;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? editedProduct : product
          )
        );
        console.log(`Product with ID ${updatedProduct.id} edited successfully`);

      }catch(err){
        console.log(`Error Editing Product: ${err}`);
      }

    };
    const handleRemoveProduct = async (productId) => {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${productId}`);
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        console.log(`Product with ID ${productId} removed successfully`);
      } catch (err) {
        console.log(`Error Removing Product: ${err}`);
      }
    };

 return(
    
      <ProductContext.Provider value={{products, handleAddProduct, handleEditProduct, handleRemoveProduct}}>
          <Header/>
          <Products/>
      </ProductContext.Provider>
   
 )
}

export default App;
export {ProductContext};