import HeaderCard from '../headerCard/HeaderCard'
import Comments from '../comments/Comments'


export default function Cardpost({post,isDetails}) {
  return (
    <>
         <div  className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-md w-lg">
  
  
   <HeaderCard  post={post}/>
  
   <Comments  post={post}  details={isDetails}/>
  </div>
</div>
    </>
  )
}
