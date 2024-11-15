
import { useContext} from 'react';

import { ProductContext } from '../App';
import EditProduct from './EditProduct';

function Products() {
    
    const {products,handleRemoveProduct} = useContext(ProductContext);
  return (
        <div className='flex flex-row flex-wrap gap-5 justify-center'>
            {
                products.map((product, index)=>{
                    return(
                        <div className="card card-compact bg-base-100 w-80 shadow-xl" key={index}>
                            <figure>
                            <img
                                src={product?.image}
                                className='h-48'
                                alt="Women Clothing" />
                            </figure>
                            <div className="card-body">
                                <div className='flex justify-between'>
                                    <h2 className="card-title">{product?.category}</h2>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className=" m-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                            </svg>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow">
                                            <li>
                                                <EditProduct product={product}/>    
                                            </li>  
                                            <li>
                                                <a>
                                                    <button onClick={()=>handleRemoveProduct(product.id)}>Remove</button>
                                                </a>
                                            </li> 
                                              
                                        </ul>
                                    </div>

                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                <div className="card-actions justify-between align-middle ">
                                    <p className=' p-1 font-bold text-stone-700 ' >{product?.price}$</p>
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