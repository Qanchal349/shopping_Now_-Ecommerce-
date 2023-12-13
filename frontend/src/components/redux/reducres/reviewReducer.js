import {createReducer} from '@reduxjs/toolkit' 

export const reviewReducer = createReducer({reviews:[]},{

      // get all review 
      getAllReviewRequest:(state)=>{
         state.loading=true
      },
      getAllReviewSuccess:(state,action)=>{
         state.loading=false;
         state.reviews=action.payload 
      },

      getAllReviewFail:(state,action)=>{
         state.loading = false;
         state.error = action.payload 
      },

      getAllReviewClearError:(state)=>{
          state.error = null
      },

      // create new review 
      createNewReviewRequest:(state)=>{
         state.loading = true;
      }  ,

      createNewReviewSuccess:(state,action)=>{
         state.loading = false;
         state.message = action.payload 
      },

      createNewReviewFail:(state,action)=>{
         state.loading = false 
         state.error = action.payload 
      },

      createNewReviewClearError:(state)=>{
         state.error = null 
      },

      createNewReviewClearMessage:(state)=>{
         state.message = null 
      },

      // delete review 
      deleteReviewRequest:(state)=>{
          state.loading = true 
      },

      deleteReviewSuccess:(state,action)=>{
         state.loading = false 
         state.message = action.payload 
      } ,
 
      deleteReviewFail:(state,action)=>{
         state.loading = false 
         state.error = action.payload 
      },
      
      deleteReviewClearError:(state)=>{
         state.error = null 
      },

      deleteReviewClearMessage:(state)=>{
         state.message = null 
      }

})