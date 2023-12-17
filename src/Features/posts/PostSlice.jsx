import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import sub from "date-fns/sub";

const initialState = [
  {
    id: "1",
    title: "Today's weather",
    content: "The day was very sunny today, was it not? Feeling the heat🥵🥵🥵",
    name: "Daisy Dawn",
    avatar:
      "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737034/blk1_4i9y_230714_x8kepn.jpg",
    location: "California, USA",
    gender: "female",
    date: sub(new Date(), {minutes: 10}).toISOString(),
    reactions: {
        thumbsUp: 3,
        thumbsDown: 1,
        heart: 5,
        wow: 0,
        rocket: 2,
    }
  },
  {
    id: "2",
    title: "Tech Growth",
    content:
      "The rapid growth in tech and creation of more AI's as the day goes by, Do you think the tech owners should be placed on a limit? Because i personally feel so. Before there will be no job left for humans. Tech is the future 👩‍💻💻🌠🌟",
    name: "Mario David",
    avatar:
      "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737070/zf5r_euha_230522_ndmen0.jpg",
    location: "Los Angelos, USA",
    gender: "male",
    date: sub(new Date(), {minutes: 5}).toISOString(),
    reactions: {
        thumbsUp: 8,
        thumbsDown: 2,
        heart: 15,
        wow: 4,
        rocket: 7,
    }
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, name, location, gender = "") {
        const avatarList = {
            male: [
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781342/9088054_yowxe9.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781347/atjv_kj7k_230227_frcmt3.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781370/8ezm_o3w4_140614_gsnbh3.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781358/ue1w_22gt_230713_nxou79.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737070/zf5r_euha_230522_ndmen0.jpg"
              ],
              female: [
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781357/DJV_MAR_1010-09_o3mhix.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781340/9080026_isf6b3.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781341/9439729_asiuqe.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/39545_bwlqed.jpg",
                "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737034/blk1_4i9y_230714_x8kepn.jpg",
              ],
              anonymous: "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/1389952697_tx2fdc.svg"
        }

        const selectedAvatar = avatarList[gender]?.[Math.floor(Math.random() * avatarList[gender]?.length)] || avatarList.anonymous;

        return {
          payload: {
            id: nanoid(),
            title,
            content,
            name,
            location,
            gender,
            avatar: selectedAvatar,
            date: new Date().toISOString(),
            reactions: {
                thumbsUp: 0,
                thumbsDown: 0,
                heart: 0,
                wow: 0,
                rocket: 0,
            }
          },
        };
      },
    },
    reactionAdded(state, action) {
        const {postId, reaction} = action.payload
        const existingPost = state.find(post => post.id === postId)
        if (existingPost) {
            existingPost.reactions[reaction]++;
        }
    }
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
