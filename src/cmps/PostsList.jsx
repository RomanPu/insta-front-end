import { useSelector } from "react-redux"
// import { useEffect } from "react";

import PostPreview from "./PostPreview"
import { useEffect } from "react"
import { LoadPosts } from "../store/posts/posts.actions"
import { getUserById } from "../store/users/users.actions"
// LoadPosts()

export function PostsList({ _id }) {
  const user = getUserById(_id)
  const allPosts = useSelector((storeState) => storeState.postsModule.posts)

  const posts = allPosts.filter((post) =>
    user.following.map((follow) => follow === post.userId).includes(true),
  )

  useEffect(() => {
    LoadPosts()
  }, [])

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <li key={post._id}>
          <PostPreview post={post} />
        </li>
      ))}
    </ul>
  )
}
