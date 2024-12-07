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
  {
    id: "3",
    title: "Travel Diary: Exploring the Amazon Rainforest",
    content:
      "Embarked on an adventure deep into the heart of the Amazon Rainforest. Witnessed breathtaking biodiversity, encountered exotic wildlife, and marveled at the lush greenery. Stay tuned for a detailed travelogue and photos!",
    name: "Nature Explorer",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702737070/zf5r_euha_230522_ndmen0.jpg",
    location: "Amazon Rainforest",
    gender: "male",
    date: sub(new Date(), { days: 2 }).toISOString(),
    reactions: {
      thumbsUp: 15,
      thumbsDown: 1,
      heart: 10,
      wow: 7,
      rocket: 3,
    }
  },
  {
    id: "4",
    title: "Space Exploration Update",
    content:
      "NASA's latest mission has uncovered new mysteries about distant galaxies. Learn about the fascinating findings and the ongoing efforts to explore the vast cosmos.",
    name: "Stellar Explorer",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/39545_bwlqed.jpg",
    location: "Houston, USA",
    gender: "female",
    date: sub(new Date(), { days: 5 }).toISOString(),
    reactions: {
      thumbsUp: 12,
      thumbsDown: 0,
      heart: 8,
      wow: 5,
      rocket: 3,
    },
  },

  {
    id: "5",
    title: "Culinary Delights: Global Food Festival",
    content:
      "Recently attended a global food festival featuring diverse cuisines from around the world. From savory street food to exquisite desserts, it was a feast for the senses! Share your favorite international dishes in the comments.",
    name: "Foodie Explorer",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781357/DJV_MAR_1010-09_o3mhix.jpg",
    location: "Paris, France",
    gender: "non-binary",
    date: sub(new Date(), { weeks: 1 }).toISOString(),
    reactions: {
      thumbsUp: 20,
      thumbsDown: 3,
      heart: 15,
      wow: 8,
      rocket: 5,
    },
  },

  {
    id: "6",
    title: "Health and Wellness Tips",
    content:
      "Embracing a healthy lifestyle with daily exercise and mindful practices. Discover the benefits of incorporating small wellness habits into your routine for a happier and more energetic life.",
    name: "Wellness Guru",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781358/ue1w_22gt_230713_nxou79.jpg",
    location: "Wellness Center CapeTown",
    gender: "male",
    date: sub(new Date(), { months: 1 }).toISOString(),
    reactions: {
      thumbsUp: 18,
      thumbsDown: 2,
      heart: 12,
      wow: 6,
      rocket: 4,
    },
  },

  {
    id: "7",
    title: "Artistic Expressions: Painting Workshop Recap",
    content:
      "Recently attended a mesmerizing painting workshop where artists showcased their creativity. The vibrant colors and diverse styles were truly inspiring. Share your favorite art forms in the comments!",
    name: "ArtEnthusiast",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781340/9080026_isf6b3.jpg",
    location: "Art Studio Georgia",
    gender: "female",
    date: sub(new Date(), { months: 2 }).toISOString(),
    reactions: {
      thumbsUp: 25,
      thumbsDown: 1,
      heart: 20,
      wow: 10,
      rocket: 7,
    },
  },

  {
    id: "8",
    title: "Fitness Challenge: 30-Day Yoga Journey",
    content:
      "Embarked on a 30-day yoga challenge for improved flexibility and mindfulness. Join the fitness journey and share your favorite yoga poses and tips for a healthier lifestyle.",
    name: "Yoga Warrior",
    avatar:
      "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/1389952697_tx2fdc.svg",
    location: "Accra Ghana",
    gender: "non-binary",
    date: sub(new Date(), { months: 3 }).toISOString(),
    reactions: {
      thumbsUp: 30,
      thumbsDown: 4,
      heart: 25,
      wow: 15,
      rocket: 8,
    },
  },

  {
    id: "9",
    title: "Technology Trends: Augmented Reality in Education",
    content:
      "Exploring the impact of augmented reality in education. Discover how AR is revolutionizing the learning experience, making it more interactive and engaging for students of all ages.",
    name: "EduTech Innovator",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781347/atjv_kj7k_230227_frcmt3.jpg",
    location: "Virtual Classroom",
    gender: "male",
    date: sub(new Date(), { months: 4 }).toISOString(),
    reactions: {
      thumbsUp: 22,
      thumbsDown: 3,
      heart: 18,
      wow: 12,
      rocket: 6,
    },
  },

  {
    id: "10",
    title: "Mindful Living: Meditation and Stress Reduction",
    content:
      "Sharing insights on incorporating meditation into daily life for stress reduction and mental well-being. Join the conversation and share your favorite mindfulness practices.",
    name: "MindfulSoul",
    avatar:
    "https://res.cloudinary.com/di3p64c4o/image/upload/v1702781344/39545_bwlqed.jpg",
    location: "Zen Garden, NY",
    gender: "female",
    date: sub(new Date(), { months: 5 }).toISOString(),
    reactions: {
      thumbsUp: 28,
      thumbsDown: 2,
      heart: 22,
      wow: 14,
      rocket: 7,
    },
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
