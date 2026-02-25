import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import Cardpost from '../shared/cardpost/Cardpost';
import Loading from './../shared/loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { tokenContext } from '../../context/tokenContext';
import { BaseUrl } from './../../env/env.environment';

export default function Posts() {

 let {userToken}= useContext(tokenContext)

   async function getAllPosts(){

      let {data} = await  axios.get(`${BaseUrl}/posts?limit=10`,{
         headers:{
           'Authorization':`Bearer ${userToken}`
         }
        })
        return data.data
    }

  let {data,isError,error,isLoading,isFetching,refetch}= useQuery({
    queryFn:getAllPosts,
    queryKey:['post'],
   })



    if(isLoading){
      return <Loading/>
    }


    if(isError){
      return <p className='text-red-500'>there is an error</p>
    }
  return (
    <>
       {data.posts.map((post)=>{
        return  <Cardpost key={post.id}  post={post}/>
       })}
    </>
  )
}
