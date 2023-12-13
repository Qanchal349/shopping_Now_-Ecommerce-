import React from 'react'
import { Avatar } from '@material-ui/core'
import ReactStars from "react-rating-stars-component";
import './Review.css'

const Review = ({review}) => {


    const options={
        edit:false,
        color:"rgb(247, 181, 181)",
        activeColor:"rgb(85, 55, 55)" ,
        size:window.innerWidth <600 ?20:30,
        value:review.rating,
        isHalf:true
      }

  return (
        <>
          <div className="reviewCard">
            <Avatar/>
             <p>{review.name}</p>
             <ReactStars {...options}
                count={5}
                value={review.rating}
                size={30}
                edit={false}
                activeColor="#783B3E"
                isHalf={true}
                color="#F8CFD0"
             
             />
             <p style={{fontWeight:"lighter"}}>{review.comment}</p>
          </div>
        </>
     )
}

export default Review