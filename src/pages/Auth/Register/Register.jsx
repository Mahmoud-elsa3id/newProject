import { Button, Input} from "@heroui/react";
import {RadioGroup, Radio} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "../../../schema/register.schema";
import { sendRegisterData } from "../../../services/register.service";

import {Alert} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {


let [isError,setError]= useState(false);
let [isLoading,setLoading] = useState(false);
let navigate = useNavigate()


  const {register,handleSubmit,control,formState:{errors,isSubmitting}} =useForm({
    resolver:zodResolver(registerSchema),
    defaultValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""
  },
  mode:"onBlur"
  }
);
 

async function onSubmitForm(data){
 setError(false)
 setLoading(false)
  try{
 let response =await sendRegisterData(data)
 setLoading(true)
 toast.success("success")
 navigate('/auth/login')
  }catch(err){
  setError(true)
  toast.error("Enter avalid data")
  }
 
}

  return (
    <section className="py-10">
      <div className="max-w-100 md:max-w-1/3 lg:max-w-1/2 mx-auto">
        <h1 className="text-4xl font-bold text-center">Create account</h1>
        <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white shadow-2xl mt-3 p-12 flex flex-col gap-4 rounded-sm">
          
          <Input {...register('name')} label="Enter your full name" type="text" variant="bordered" />

            {errors.name && (<p className="text-red-500">{errors.name.message}</p>)}
          
          <Input  {...register('email')}  label="name@example.com" type="email" variant="bordered" />

            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

          <Input {...register('password')} label="Creat strong password" type="password" variant="bordered" />

            {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

          <Input {...register('rePassword')} label="confirm Your Password" type="password" variant="bordered" />

            {errors.rePassword && (<p className="text-red-500">{errors.rePassword.message}</p>)}


          <Input {...register('dateOfBirth')} label="dateOfBirth" type="date" variant="bordered" />

            {errors.dateOfBirth && (<p className="text-red-500">{errors.dateOfBirth.message}</p>)}


          <Controller
              name="gender"
              control={control}
              render={({field})=>(

                <RadioGroup {...field}  label="gender">
            <Radio value="male">male</Radio>
            <Radio  value="female">female</Radio>
          </RadioGroup>
              )   
            }
          />
         
          {errors.gender && (<p className="text-red-500">{errors.gender.message}</p>)}

          <Button isLoading={isSubmitting} type="submit" color="primary">Register</Button>
          <Link  to={'/auth/login'} className="text-center text-xl">Aleary have accout? <span className="text-xl text-sky-700 ">Login Now</span></Link>
        </form>
      </div>
    </section>    
  );
}
