import React, { useEffect, useState } from "react";
import "./home.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../product/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { productsAction } from "../redux/actions/productAction";



const Home = () => {

  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const dispatch  = useDispatch();
  const {products,error} = useSelector(state=>state.products) 

  const submithandler= async(e)=>{
     e.preventDefault()
     navigate(`/products?keyword=${keyword}`)
  }

  useEffect(() => {
     if(error){
        toast.error(error)
     }
     dispatch(productsAction())
  }, [dispatch,error])
  

  return (
    <>
      <section style={{display:"flex",flexDirection:'column'}}>
        <div className="topSection">
          <div className="leftSection">
            <p>
              FREE SHIPPING & RETURN <span>on all orders</span>
            </p>
          </div>
          <div className="inputSection">
            <span>
              <FaSearch />
            </span>
            <form onSubmit={submithandler}>
            <input type="text" placeholder="search...." value={keyword} name="keyword" onChange={(e)=>setKeyword(e.target.value)} />
            </form>
          </div>
        </div>
    

        <div className="midSection">
          <p>What do you want to buy? ToDay</p>
          <Link to="/products" className="seemore">
            see more...
          </Link>
        </div>
      </section>



      {products && (
        <div className="lowerSection">
          <p>Products Categoty</p>
          <div className="recommended">
              {products && products.map((product)=>(
                  <ProductItem product={product}link={'/products'} />
              ))}
          </div>
        </div>
      )}

      {/* {!recommended && (
        <div className="lowerSection">
          <div className="category"></div>
        </div>
      )} */}

     
    </>
  );
};

export default Home;
