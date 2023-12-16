import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {id: "1", title: "Today's weather", content: "The day was very sunny today, was it not? Feeling the heat🥵🥵🥵"},
    {id: "2", title: "Tech Growth", content: "The rapid growth in tech and creation of more AI's as the day goes by, Do you think the tech owners should be placed on a limit? Because i personally feel so. Before there will be no job left for humans. Tech is the future 👩‍💻💻🌠🌟"},
]

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        }
    },
})

export const selectAllPosts = (state) => state.posts;

export default postSlice.reducer;