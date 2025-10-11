'use client'
import {useUser} from '@clerk/nextjs'
const CreatePostPage = () => {
    const {isSignedIn,user, isLoaded} = useUser();
    if(!isLoaded){
        return null;
    }
    if(isSignedIn && user.publicMetadata.isAdmin){
      return <div>
        CreatePost
      </div>
    }
    else{
        return (
            <h1 className='text-center text-3xl my-7 font-semibold'>
                Access Denied. You do not have permission to view this page.
            </h1>
        )
    }
  return (
    <div>
     CreatePostPage
    </div>
  )
}

export default CreatePostPage
