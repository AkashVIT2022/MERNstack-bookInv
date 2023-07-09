import { createContext, useReducer } from "react";

export const AuthContext=createContext();

export const AuthContextProvider =({children})=>{
    const INITIAL_STATE={
        id:null
    }
    const chatreducer=(state,action)=>{
        if(action.type==='SET_USER'){
            return{
                id:action.payload
            }
        }
    }
    const [state,dispatch]=useReducer(chatreducer,INITIAL_STATE);
    return(
        <AuthContext.Provider value={{data:state,dispatch}}>
        {children}
        </AuthContext.Provider>
    );
};
