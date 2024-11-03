import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();
const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":

      return { ...state, isAuthenticated: true, user: payload.user };
    case "SET_LOGGED_OUT":
      console.log
      return initialState
    default:
      return state
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading,setIsAppLoading]=useState(true)

  const readProfile = useCallback(()=>{
    
    onAuthStateChanged(auth, async (authUser)=>{
      if(authUser){
        const docSnap=await getDoc(doc(firestore,"users",authUser.uid))
        const user=docSnap.data()
        dispatch({type:"SET_LOGGED_IN",payload:{user}})

      }else{
        dispatch({type:"SET_LOGGED_OUT"})
        signOut(auth)
      }
    })
  })

  useEffect(()=>{readProfile()},[])

  return (
    <AuthContext.Provider value={{ ...state, dispatch,isAppLoading,setIsAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext)