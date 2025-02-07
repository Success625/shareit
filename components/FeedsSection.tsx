import React from 'react'
import FeedSection, { FeedType } from './FeedSection'

const FeedsSection = () => {
  // TODO: Add the feeds fetching logic here
  const feeds: FeedType[] = [
    {
      category: "Editor's Pick",
      posts: [
        {
          createdAt: "1st Dec, 2024",
          id: "1",
          author: {
            name: "Success",
            email: "adeniyi@gmail.com",
            image: "https://google.com"
          },
          desc: "First pick of Editor Success"
        }
      ]
    },
    {
      category: "Most Viewed",
      posts: [
        {
          createdAt: "2st Dec, 2024",
          id: "2",
          author: {
            name: "John Doe",
            email: "johni@gmail.com",
            image: "https://yahoo.com"
          },
          desc: "A post by John Doe and most viewed"
        }
      ]
    },
  ];

  return (
    <section>
      {feeds.map((feed, index) => (
        <FeedSection key={index} feed={feed} />
      ))}
    </section>
  )
}

export default FeedsSection
