import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Cardpost from '../../components/shared/cardpost/Cardpost';
import Loading from '../../components/shared/loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { tokenContext } from '../../context/tokenContext';
import { BaseUrl } from '../../env/env.environment';


export default function PostDetails() {
  let {userToken} = useContext(tokenContext);
    let [postDetails,setDetails] = useState(null);
    let {postId} =useParams();
    


   async function getSinglePost(){
      let {data} = await  axios.get(`${BaseUrl}/posts/${postId}`,{
            headers:{
           'Authorization':`Bearer ${userToken}`
         }
        })

        return data.data
    }

   let  {data,isLoading,isError,isFetching}= useQuery({
      queryFn:getSinglePost,
      queryKey:['singlepost',postId],
      select:(data)=>data.post
    })


     if(isLoading){
      return <Loading/>
     }

     if(isError)
     {
      return <p className='text-red-500'>there is an error..</p>
     }

  return (
    <>
      <Cardpost isDetails={true} post={data}/>  
    </>
  )
}
