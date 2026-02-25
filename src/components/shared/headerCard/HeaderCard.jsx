import { useContext } from 'react';
import placeholder from '../../../assets/img/img.png';
import { tokenContext } from '../../../context/tokenContext';
import DropDown from '../dropDown/DropDown';


export default function HeaderCard({post}) {
    let {userData} = useContext(tokenContext);


  

  return (
    <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src={post.user.photo} alt="User Avatar" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-gray-800 font-semibold">{post.user.name}</p>
                <p className="text-gray-500 text-sm">{post?.createdAt?.split('T')[0]}</p>
              </div>
            </div>
            <div className="text-gray-500 cursor-pointer">
              {userData._id === post.user._id && (
                <DropDown postId={post._id}/>
              )}
                
            </div>
          </div>
      
      
          <div className="mb-4">
            <p>{post?.body}</p>
          </div>
          <div className="mb-4">
            <img src={post?.image ? post?.image : placeholder} alt="Post Image" className="w-full h-80 object-cover rounded-md" />
          </div>
    </>
  )
}

