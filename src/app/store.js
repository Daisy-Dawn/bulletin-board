import {configureStore} from "@reduxjs/toolkit"
import postsReducer from "../Features/posts/PostSlice"

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
})