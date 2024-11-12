import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then(res=>{
            console.log(res.data);
            setProducts(res.data);
        })
        .catch(err=>console.log(err));
      },[])
  return (
        <div className='flex flex-row flex-wrap gap-5 justify-center'>
            {
                products.map((product, id)=>{
                    return(
                        <div className="card card-compact bg-base-100 w-80 shadow-xl" key={id}>
                            <figure>
                            <img
                                src={product.image}
                                className='h-48'
                                alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.category}</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-neutral">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
  )
}

export default Products