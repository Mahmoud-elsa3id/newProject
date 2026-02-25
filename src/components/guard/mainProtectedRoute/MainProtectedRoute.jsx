import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { tokenContext } from "../../../context/tokenContext"

export default function MainProtectedRoute({children}) {
 
   let {userToken} = useContext(tokenContext)

    if(userToken){
        return children
    }else{
        return <Navigate to={'/auth/login'}/>
    }
}
