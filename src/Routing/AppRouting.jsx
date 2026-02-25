import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/notfound/NotFound";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import MainProtectedRoute from "../components/guard/mainProtectedRoute/MainProtectedRoute";
import Authprotected from "../components/guard/authprotected/Authprotected";
import PostDetails from "../pages/postDetails/PostDetails";

export const  routes =createBrowserRouter([
    {path:'',element:<MainProtectedRoute><MainLayout/></MainProtectedRoute>,children:[
        {index:true,element:<Home/>},
        {path:'profile/:userId',element:<Profile/>},
        {path:'postDetails/:postId',element:<PostDetails/>},
        {index:'*',element:<NotFound/>},
    ]},
    {
        path:'auth',element:<Authprotected><AuthLayout/></Authprotected>,children:[
            {path:'login',element:<Login/>},
            {path:'signup',element:<Register/>}
        ]
    }
])


