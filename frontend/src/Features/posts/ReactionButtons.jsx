import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./PostSlice";

const reactionEmoji = {
  thumbsUp: '👍',
  thumbsDown: '👎',
  heart: '💖',
  wow: '😲',
  rocket: '🚀',
};

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name}
            type="button"
            className="md:mx-2 md:text-lg mx-1 text-sm"
            onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
