import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import { BaseUrl } from '../env/env.environment';
import { jwtDecode } from "jwt-decode";

export const tokenContext =createContext();

export function TokenContextProvider({children}){

  
    let [userToken,setToken] = useState(()=>{
         return localStorage.getItem('token');
    });


    let [userData,setData] = useState(null)


    useEffect(() => {
  if (!userToken) return;

  try {
    const decoded = jwtDecode(userToken);
    console.log(decoded);

    axios.get(`${BaseUrl}/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }).then((response) => {
      setData(response.data.data.user);
    });

  } catch (error) {
    console.log("Invalid Token");
    localStorage.removeItem("token");
    setToken(null);
  }

}, [userToken]);


    return <tokenContext.Provider value={{userToken,setToken,userData}}>
        {children}
    </tokenContext.Provider>
}