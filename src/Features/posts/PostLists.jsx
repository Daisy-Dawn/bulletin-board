import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostSlice";

const PostLists = () => {
  const posts = useSelector(selectAllPosts);
  const renderedPosts = posts.map((post) => (
    <article
      className="w-full bg-white my-5 rounded-lg p-5 flex gap-2 items-center"
      key={post.id}
    >
      <span className="">
        <img
          className="inline-block mb-2 h-8 w-8 rounded-full ring-2 ring-slate-900"
          src={post.avatar}
          alt=""
        />
        <p>{post.name} </p>
      </span>
      <div className="">
        <h3 className="pb-3 text-2xl font-bold">{post.title}</h3>
        <p
          className="text-lg"
          style={{ fontFamily: "Rethink Sans, sans-serif" }}
        >
          {post.content}
        </p>
        <p> {post.location} </p>
      </div>
    </article>
  ));
  return (
    <section className="mx-10">
      <h2 className="text-white text-2xl text-center font-bold font-mono">
        POSTS
      </h2>
      {renderedPosts}
    </section>
  );
};

export default PostLists;
