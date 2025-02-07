import React from 'react'
import Feed, { Post } from './Feed';

export type FeedType = {
  category: string;
  posts: Post[]
}

const FeedSection = ({ feed }: { feed: FeedType }) => {
  const { category, posts } = feed

  return (
    <div>
      <h3>{category}</h3>

      <div>
        {posts.map((post, index) => (
          <Feed key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default FeedSection
