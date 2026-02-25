import { Link } from 'react-router-dom';
import placeholder from '../../../assets/img/img.png';
import PostComments from '../postComments/PostComments';
import { FiSend } from "react-icons/fi";
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { tokenContext } from '../../../context/tokenContext';
import { BaseUrl } from '../../../env/env.environment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BsCardImage } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";


export default function Comments({post,details}) {

let {userToken} = useContext(tokenContext)
let [selectedImage,setSelectedImage] =useState(null)
let inputFile =  useRef()

  let {register,handleSubmit,reset}=useForm({
    defaultValues:{
      content:''
    }
  })

  function creatPostComment(data){
    console.log(data.content,selectedImage)
    const form = new FormData();

    form.append('content',data.content);
    form.append('image',selectedImage);

    mutate(form)
  }


 async function  sendData(formData){
     let {data} =await axios.post(`${BaseUrl}/posts/${post._id}/comments`,formData,{
        headers:{
           'Authorization':`Bearer ${userToken}`
         }
     })
     return data
  }

  const queryClient =useQueryClient()

  let {mutate}=useMutation({
    mutationFn:sendData,
    onSuccess:(data)=>{
       queryClient.invalidateQueries({
        queryKey:['getcomments']
       }),
       queryClient.invalidateQueries({
        queryKey:['posts']
       }),
      reset();
      setSelectedImage(null);
      console.log(data)
       toast.success(data.message);
      
    },
    onError:()=>{

    }
  })


  function getImageFile(e){
    console.log('change',e.target.files[0])
    setSelectedImage(e.target.files[0])
  }

  return (
    <>
        
    <div className="flex items-center justify-end text-gray-500">
      
      <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
        <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" />
          </g>
        </svg>
        <span>{post?.commentsCount}</span>
      </button>
    </div>
    <hr className="mt-2 mb-2" />
    <div className='flex justify-between w-full'>
    <p className="text-gray-800 font-semibold">Comment</p>
    {!details && (
    <Link to={`postDetails/`+post._id}> <p className='text-sky-700'>View Details...</p></Link>
    )}
    </div>
    <hr className="mt-2 mb-2" />
    <form onSubmit={handleSubmit(creatPostComment)}>
      <div className='flex items-center'>
      <Input {...register('content')} type="text" placeholder='Enter your comment' />
        <BsCardImage size={25} onClick={()=>inputFile.current.click()} />

        <input ref={inputFile} onChange={getImageFile} type='file' hidden/>

      <Button  type="submit" className='bg-transparent p-0 m-0'>
      <RiSendPlaneFill  size={30} className='text-sky-700'/>
      </Button>
    </div>
    </form>
   
    <div className="mt-4">
      {/* Comment 1 */}

      {!details ?
(


post?.commentsCount > 0 ? 

      <div className="flex items-center space-x-2">
        <img src={post?.topComment?.commentCreator?.photo.includes('undefined') ? placeholder : post?.topComment?.commentCreator?.photo} alt="User Avatar" className="w-6 h-6 rounded-full" />
        <div>
          <p className="text-gray-800 font-semibold">{post?.topComment?.commentCreator?.name}</p>
          <p className="text-gray-500 text-sm">{post?.topComment?.content}</p>
        </div>
      </div> : <p className='text-slate-400'>there is no comment in this post</p>

)
      
    
      :

       <PostComments post={post}/> 

      }
     
 
    </div>
    </>
  )
}
