import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from 'react-chartjs-2' 
import {Chart as ChartJS ,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend} from "chart.js"
import "./dashboard.css"
import {useDispatch, useSelector} from "react-redux"
import { getAllAdminUsersAction, getAllOrdersAction } from '../redux/actions/adminAction'
import { productsAction } from '../redux/actions/productAction'




ChartJS.register(
    CategoryScale,
    LinearScale,PointElement,
    LineElement,Title,
    Tooltip,ArcElement,Legend  
)


const Dashboard = () => {



   const disptch = useDispatch();
   const {loading,error,message,users} = useSelector(state=>state.adminUsers) 
   const {products,count} = useSelector(state=>state.products);
   const {orderCount,orders} = useSelector(state=>state.adminOrders)
 
   let outOfStock = 0;
   products.map((product)=>{
      if(product.stock==0) outOfStock++;
   })  

   const totalAmount=orders ? Object.values(orders).reduce((acc, val)=>{
      return acc+=val.productItem.price; 
     },0) : 0

 const lineState={
     labels:['Initial Amount','Amount Earned'],
     datasets:[
         {
            label:"TOTAL AMOUNT",
            backgroundColor:["#7C2335"],
            hoverBackgroundColor:["#F8CFD0"],
            data:[0,totalAmount]
         }
     ]
 }

 const doughnutState={
     labels:["Out of Stock","InStock"],
     datasets:[
         {
            backgroundColor:["#F8CFD0","#7C2335"],
            data:[outOfStock,count-outOfStock]
         }
     ]
 }

  


  useEffect(() => {
   
   disptch(getAllAdminUsersAction())
   disptch(productsAction())
   disptch(getAllOrdersAction())

 }, [disptch,count,orderCount])
 
  return (
          
    <div className="dashboard">

            <div className="detailNav">
                   <div className="userDiv forall">
                     <Link to="/admin/users"className='link'>All Users</Link>
                     <p>{users.length}</p>
                  </div> 
                  <div className="productDiv forall">
                     <Link to="/admin/products" className='link'>All Products</Link>
                     <p>{count}</p>
                  </div>  
                  <div className="ordersDiv forall">
                     <Link to="/admin/orders" className='link'>All Orders</Link>
                     <p>{orderCount}</p>
                  </div> 
                  <div className="ordersDiv forall">
                     <Link to="#" className='amount'>All Amount</Link>
                     <p>₹{totalAmount}</p>
                  </div>   
            </div>

            <div className="graphRep">
                   <div className="lineChart">
                      <Line data={lineState}/>
                   </div>
                   <div className="doughnutChart">
                      <Doughnut data={doughnutState}/>
                   </div>
            </div>
    </div>

  )
}

export default Dashboard