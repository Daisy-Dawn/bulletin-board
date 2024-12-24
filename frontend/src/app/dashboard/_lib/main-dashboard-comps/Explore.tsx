import NewPost from '@/components/ui/explore/NewPost'
import PostsContainer from '@/components/ui/explore/PostsContainer'
import React from 'react'

const Explore = () => {
    return (
        <div className="min-h-[90vh] flex flex-col gap-[1.5rem]">
            <NewPost />
            <PostsContainer />
        </div>
    )
}

export default Explore
