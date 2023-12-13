import { createReducer } from "@reduxjs/toolkit";

export const modelsReducer = createReducer({open:false},{

      changeOpenState:(state,action)=>{
         state.open = action.payload 
      }
})
