import { Helmet } from 'react-helmet'
import Posts from '../../components/posts/Posts'
import Createpost from '../../components/shared/createPost/Createpost'
import {useNetworkState} from 'react-use'
export default function Home() {

 let {online} = useNetworkState()
  return (
    <>
   
    <Helmet>
      <title>Home</title>
    </Helmet>

     {online &&(
     <>
       <Createpost/>
      <Posts/>
     </>)   }

     {!online && <h1 className='text-center text-4xl text-red-500'>your are offline now</h1>}
    
    </>
  )
}
