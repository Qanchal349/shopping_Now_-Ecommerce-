import React, { useEffect, useState } from 'react'
import "./Product.css"
import {Box, Slider } from '@material-ui/core'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {productsAction} from "../redux/actions/productAction"
import {useSearchParams} from "react-router-dom"

const Product = () => {

    const [rating, setRating] = useState(0)
    const [price, setPrice] = useState([0,200000])
    const [category ,setCategory] = useState('')
    const categories = ['Wear',"Shirt",'Jeans',"Mobile","Laptop"] // keyword
    
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {loading,error,products} = useSelector(state=>state.products)
    const keyword=searchParams.get('keyword') ? searchParams.get('keyword'):'' ;

     useEffect(()=>{

      if(error) {
         toast.error(error);
         dispatch({type:"allProductClearError"})
      }
        dispatch(productsAction(keyword,price,rating,category)) 

      },[error,dispatch,price,keyword,rating,category])

    return (
     <>
                        <div className="filter" >
                                <div className="byCategory">
                                     <p>categories</p>
                                     <select name="item" id="item" onChange={(e)=>setCategory(e.target.value)}> 
                                        {categories.map((item,i)=>(
                                            <option value={item} key={i} >{item}</option>
                                        ))}
                                    </select>    
                                </div>
                                <div className="byPrice">
                                    <p>price</p>
                                        <Box style={{width:'250px',marginTop:'1rem'}}>
                                            <Slider
                                                max={200000}
                                                min={0}
                                                valueLabelDisplay='auto'
                                                value={price}
                                                color="secondary"
                                                onChange={(e,newPrice)=>setPrice(newPrice)}
                                            />
                                        </Box>

                                </div>
                               <div className="byRating">
                                <p>Rating</p>
                                 <Box style={{width:'130px' ,marginTop:'1rem'}}>
                                        <Slider
                                            value={rating}
                                            onChange={(e,newRating)=>setRating(newRating)}
                                            max={5}
                                            min={0}
                                            aria-labelledby='continuous-slider'
                                            valueLabelDisplay='auto'
                                            color="secondary"
                                        />
                                 </Box>
                               </div>

                         </div>
        
                  

                   <div className="product">
                     {products && products.map((product)=>(
                         <ProductItem product={product} link={`/productDetail/${product._id}`} />
                     ))}
                  </div>
       
    </>
  )
}

export default Product