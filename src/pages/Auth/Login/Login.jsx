
import { Button, Input} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { sendLoginData } from "../../../services/login.service";
import { loginSchema } from "../../../schema/login.schema";
import { tokenContext } from "../../../context/tokenContext";

export default function Login() {

  let {setToken} = useContext(tokenContext);

 
  let [isError,setError]= useState(false);
  let [isLoading,setLoading] = useState(false);
  let navigate = useNavigate()
  
  
    const {register,handleSubmit,formState:{errors,isSubmitting}} =useForm({
      resolver:zodResolver(loginSchema),
      defaultValues:{
      email:"",
      password:"",
    },
    mode:"onBlur"
    }
  );
   
  
  async function onSubmitForm(data){
   setError(false)
   setLoading(false)
    try{
   let response =await sendLoginData(data)
   setLoading(true)
   toast.success("success")
   navigate('/')
   setToken(response.data.token);
   localStorage.setItem('token',response.data.token);
    }catch(err){
    setError(true)
    toast.error("Enter avalid data")
    }
   
  }

  return (
       <section className="py-10">
        
      <div className="max-w-100 md:max-w-1/3 lg:max-w-1/2 mx-auto">
      
        <h1 className="text-4xl font-bold text-center mb-3">Login</h1>
         
        <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white\ shadow-2xl mt-3 p-12 flex flex-col gap-4 rounded-sm">
          
          

       
          <Input  {...register('email')}  label="Enter Your Email" type="email" variant="bordered" />

            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

          <Input {...register('password')} label="Enter your password" type="password" variant="bordered" />

            {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

          <Button isLoading={isSubmitting} type="submit" color="primary">Login</Button>
          <Link to={'/auth/signup'} className="text-xl text-center">Don't have an account? <span className=" text-sky-600">Sign up</span></Link>
        </form>
      </div>
    </section>

  )
}
