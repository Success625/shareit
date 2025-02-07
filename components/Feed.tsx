import React from 'react'

export interface Post {
  createdAt: string;
  id: string;
  author: {
    name: string;
    email: string;
    image: string;
  }
  desc: string;
}

const Feed = ({ post }: { post: Post }) => {

  return (
    <div>
      <p>Post ID: {post.id}</p>
      <p>Post Desc: {post.desc}</p>
    </div>
  )
}

export default Feed
