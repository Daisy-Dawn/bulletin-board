import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostSlice";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostLists = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article
      className="w-full bg-white my-5 rounded-lg p-5 flex gap-2 items-center"
      key={post.id}
    >
      <span className="">
        <img
          className="inline-block mb-2 h-8 w-8 rounded-full ring-2 ring-slate-900"
          src={post.gender === "" ? "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/1389952697_tx2fdc.svg" : post.avatar}
          alt=""
        />
        <p>{post.name || "Anonymous"} </p>
      </span>
      <div className="">
        <h3 className="pb-3 text-2xl font-bold">{post.title}</h3>
        <p
          className="text-lg"
          style={{ fontFamily: "Rethink Sans, sans-serif" }}
        >
          {post.content}
        </p>
        <p> {post.location || "Unknown Location"} </p>
        <TimeAgo timeStamp={post.date} />
        <ReactionButtons post={post} />
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
