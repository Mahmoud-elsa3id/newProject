import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { tokenContext } from './../../../context/tokenContext';
import { IoMdImages } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseUrl } from "../../../env/env.environment";
import { toast } from "react-toastify";

export default function Createpost() {

    let {userData,userToken} = useContext(tokenContext);
    let [selectedFile,setFile] = useState(null)
    let [imgSrc,setSrc]=useState(null);

    let inputFile =useRef()

    let {register,handleSubmit,reset}=useForm({
        defaultValues:{
            body:''
        }
    })

    function submitForm(data){
       console.log(data)
       const fd = new FormData();

       fd.append('body',data.body);
       fd.append('image',selectedFile);

       mutate(fd)

    }

    function getImageFile(e){
        setSrc(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }


    async function createUserPost(formData){
        let {data}=await axios.post(`${BaseUrl}/posts`,formData,{
            headers:{
           'Authorization':`Bearer ${userToken}`
         }
        })
        return data
    }

   let queryClient = useQueryClient()
    let {mutate}=useMutation({
        mutationFn:createUserPost,
        onSuccess:(data)=>{
            reset();
            setSrc(null)
            toast.success(data.message),
            queryClient.invalidateQueries({
                queryKey:['post']
            }),
            queryClient.invalidateQueries({
                queryKey:['profilePosts']
            })  
        },
        onError:()=>{}
    })

  return (
    <Card className="md:w-[70%] max-w-130 mx-auto">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src={userData?.photo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{userData?.name}</p>
          <p className="text-small text-default-500">create post</p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handleSubmit(submitForm)}>
          <CardBody>
          <Input {...register('body')} type="text" placeholder="what is in your mind ..?"/>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-end w-full items-center">
            {imgSrc &&  <img src={imgSrc} width='100'  alt="..."/>}
           
        <IoMdImages size={30} onClick={()=>inputFile.current.click()} className="text-sky-700 mx-2"/>
        <input type="file" onChange={getImageFile} ref={inputFile} hidden/>
        <Button color='primary' type="submit">create</Button>
        </div>
      </CardFooter>
      </form>
     
    </Card>
  );
}
