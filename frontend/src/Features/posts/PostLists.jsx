import { useSelector } from "react-redux";
import { selectAllPosts } from "./PostSlice";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostLists = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article
      className="w-full bg-white my-5 rounded-lg p-5 flex gap-3 "
      key={post.id}
    >
      <span className="mt-2 sm:w-1/12 w-2/12">
        <img
          className="inline-block mb-2 h-8 w-8 sm:w-8 rounded-full ring-2 ring-slate-900"
          src={
            post.gender === ""
              ? "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/1389952697_tx2fdc.svg"
              : post.avatar
          }
          alt=""
        />
        <p
          className="text-xs sm:text-base"
          style={{ fontFamily: "Rethink Sans, sans-serif" }}
        >
          {post.name || "Anonymous"}{" "}
        </p>
      </span>
      <div className="flex sm:w-11/12 w-10/12 flex-col gap-2">
        <h3 className="md:text-xl text-base font-bold">{post.title}</h3>
        <p
          className="sm:text-lg text-sm"
          style={{ fontFamily: "Rethink Sans, sans-serif" }}
        >
          {post.content}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <ReactionButtons post={post} />
          <div className="flex sm:gap-12 justify-between">
            <p className="sm:text-base text-xs">
              {" "}
              {post.location || "Unknown Location"}{" "}
            </p>
            <TimeAgo timeStamp={post.date} />
          </div>
        </div>
      </div>
    </article>
  ));
  return (
    <section className="mx-10">
      <h2 className="text-white text-lg sm:text-2xl m-2 text-center font-bold font-mono">
        POSTS
      </h2>
      {renderedPosts}
    </section>
  );
};

export default PostLists;
