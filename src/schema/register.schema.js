import * as z from "zod"; 

export const registerSchema = z.object({
  name:z.string().nonempty("name is required").min(3,"name must be at least 3 charcters").max(10,"name must be max 10 charcters"),
  email:z.string().nonempty("email is required").email("Enter avalid email"),
  password:z.string().nonempty("password is required").regex(/^.{8,}/,'Enter avalid password'),
  rePassword:z.string().nonempty("confirm password is required"),
  dateOfBirth:z.string().nonempty("date of birth is required").refine((date)=>{
       let currentYear = new Date().getFullYear();
       let selectedYear = new Date(date).getFullYear(); 

       let age = currentYear - selectedYear;

       return age >=18;
  },"Age not Allowed less than 18 years old"
),
  gender:z.enum(["female","male"],"choose male or female")
}).refine((data)=>data.password === data.rePassword,{
    message:"password not matched",
    path:["rePassword"]
})