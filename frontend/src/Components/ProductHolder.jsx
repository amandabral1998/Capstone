
import { useContext } from "react";
import "../CSS/ProductHolder.css";
import { useGetAllProductsQuery } from "../redux/ProductApi";
import Product from "./Product";
import { DataContext } from "../../Context/DataContext";
import { SpinnerCircular } from 'spinners-react';


const ProductHolder = () => {  
const {data , isLoading , error} = useGetAllProductsQuery('get-product')
const {search} = useContext(DataContext)



if (isLoading) {
  return <div className="loading-screen ">This may take some time. Please Wait.
  <SpinnerCircular size={'50'}  /></div>;
}

if (error) {
  return <div className="loading-screen " >Error: {error.message}</div>;
}

const filteredProducts = data.filter((product) => {
  if (search === "") {
    
    return product;
  } else {
  
    return product.title.toLowerCase().startsWith(search.toLowerCase());
  }
});




  return (
    <div className='product-main-holder d-flex justify-content-center gap-4 '>
    
  
{filteredProducts.length > 0 ? (filteredProducts.map((data , index)=>{
      return <Product key={index} product={data}/>
    })) : (
      <div className="not-found mt-5">Searched Product does not found.</div>
    ) }

    
  
    </div>
  );
};
export default ProductHolder;
