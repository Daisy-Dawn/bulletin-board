import {useSelector} from "react-redux";
import { selectAllPosts } from "./PostSlice";

const PostLists = () => {
    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts.map((post) =>(
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>
    ))
  return (
    <section>
        <h2>POSTS</h2>
        {renderedPosts}
    </section>
  )
}

export default PostLists