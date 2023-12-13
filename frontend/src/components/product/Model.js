import React, { useState } from 'react'
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { createNewReview } from '../redux/actions/reviewAction'
import { modelAction } from '../redux/actions/modelAction'
import ReactStars from "react-rating-stars-component";


const Model = ({dialogToggle,id}) => {

  const [rating, setRating] = useState(0) 
  const [comment, setComment] = useState('') 
  const dispatch = useDispatch();
  const {open} = useSelector(state=>state.open) 

  const ratingChanged = (newRating) => {
      setRating(newRating);
  };

  const reviewSubmitHandler=()=>{

       const formData = new FormData()
       formData.append('rating',rating)
       formData.append('comment',comment) 
       dispatch(createNewReview(id,formData)) 
       dispatch(modelAction(!open))  
   } 


  return (

        <Dialog
            aria-labelledby='simple-dialog-title'
            open={open} 
            onClose={dialogToggle} 
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
             />

            <textarea cols="30" rows="5" name='comment' value={comment} onChange={(e)=>setComment(e.target.value)} />
           </DialogContent>
            <DialogActions>
                <Button onClick={dialogToggle}>Cancel</Button>
                <Button color='primary' onClick={reviewSubmitHandler} >Submit</Button>
            </DialogActions>
       </Dialog>
  )
}

export default Model