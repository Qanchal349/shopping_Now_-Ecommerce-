import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import { createProductAction } from '../redux/actions/adminAction'
import "./createProduct.css"

const CreateProduct = () => {

   
  const {loading,error,message} = useSelector(state=>state.adminProduct)

  const dispatch = useDispatch();

  const [name, setName] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState()
  const [color, setColor] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState([])
  const [imagePrev, setImagePrev] = useState([])

  const submitHandler=(e)=>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.append('name',name)
      myForm.append('category',category)
      myForm.append('price',price)
      myForm.append('color',color)
      myForm.append('description',description)
      
      image.forEach((img) => {
        myForm.append("images", img);
      });

      dispatch(createProductAction(myForm))
  }

  
  const imageHandler = (e)=>{
    const files = Array.from(e.target.files);
    setImage([]);
    setImagePrev([]);

    files.forEach((file)=>{
      const reader = new FileReader();
      reader.onload = () => {
           if (reader.readyState === 2) {
            setImagePrev((old) => [...old, reader.result]);
            setImage((old) => [...old, reader.result]);
           }
        };
      reader.readAsDataURL(file);
    })
  }


  useEffect(() => {
    if(error){
       toast.error(error)
       dispatch({type:'productClearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'productClearMessage'})
   }
  }, [error,message,dispatch])
  

  return (
       <div className="form">
         <form onSubmit={submitHandler}>
                 <div className="input">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" placeholder='Enter Product Name' name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                  </div> 
               
                 <div className="input">
                   <label htmlFor="category">Category</label>
                   <input type="text" placeholder='Enter Product Category' name='category' value={category} onChange={(e)=>setCategory(e.target.value)}  />
                 </div> 

                 <div className="input">
                   <label htmlFor="price">Price</label>
                   <input type="text" placeholder='Enter Product Price' name='price' value={price} onChange={(e)=>setPrice(e.target.value)}  />
                 </div> 

                 <div className="input">
                   <label htmlFor="color">Color</label>
                   <input type="text" placeholder='Enter Product Color' name='color' value={color} onChange={(e)=>setColor(e.target.value)}  />
                 </div> 

                 <div className="input">
                   <label htmlFor="description">Description</label>
                   <input type="text" placeholder='Enter Product Description' name='description' value={description} onChange={(e)=>setDescription(e.target.value)}  />
                 </div> 

                 <div className="input">
                   <label htmlFor="image">Images</label>
                   <input type="file" multiple name='image'  accept='image/*' onChange={imageHandler}  />
                 </div>

                 <div id="createProductFormImage">
                   {imagePrev.map((image, index) => (
                       <img key={index} src={image} alt="Product Preview" width={'20%'} />
                   ))}
                 </div>

                  <button type='submit'>Create</button>
         </form>
       </div>
  )
}

export default CreateProduct