import { configureStore } from "@reduxjs/toolkit";
import stuslice from "./slices/stuslice";

export const store=configureStore({
    devTools:true,
    reducer:{

        studentdata:stuslice
        
    }
})