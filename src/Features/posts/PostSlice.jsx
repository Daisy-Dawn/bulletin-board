import {createSlice} from "@reduxjs/toolkit"; 
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: "1", title: "Today's weather", content: "The day was very sunny today, was it not? Feeling the heat🥵🥵🥵", name: "Daisy Dawn", avatar: "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737034/blk1_4i9y_230714_x8kepn.jpg", location: "California"},
    {id: "2", title: "Tech Growth", content: "The rapid growth in tech and creation of more AI's as the day goes by, Do you think the tech owners should be placed on a limit? Because i personally feel so. Before there will be no job left for humans. Tech is the future 👩‍💻💻🌠🌟", name: "Mario David", avatar: "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737070/zf5r_euha_230522_ndmen0.jpg", location: "Los Angelos"},
]

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
        },
        prepare(title, content, name, location){
            return {
                payload: {
                    id: nanoid(),
                    title,
                    content,
                    name,
                    location,
            }
        }
        }
    }
    }
    
})

export const selectAllPosts = (state) => state.posts;

export const {postAdded} = postSlice.actions

export default postSlice.reducer;