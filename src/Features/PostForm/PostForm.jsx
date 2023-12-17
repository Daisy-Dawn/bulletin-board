import React, { useState } from "react";
import tweet2 from "../../assets/images/tweet2.jpg";
import { useDispatch } from "react-redux";
import { postAdded } from "../posts/PostSlice";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setlocation] = useState("");
  const [gender, setGender] = useState("");

  const nameChange = (e) => setName(e.target.value);
  const titleChange = (e) => setTitle(e.target.value);
  const contentChange = (e) => setContent(e.target.value);
  const locationChange = (e) => setlocation(e.target.value);
  const genderChange = (e) => setGender(e.target.value);
  // const

  const canSave = Boolean(title) && Boolean(content);

  const onSavePost = () => {
    if (title && content) {
      dispatch(postAdded(title, content, name, location, gender));
      setTitle("");
      setContent("");
      setlocation("");
      setName("");
      navigate("/");
    }
  };

  return (
    <div
      style={{ minHeight: "570px" }}
      className="bg-gray-400 p-10 flex items-center justify-center"
    >
      <div className="form-wrapper bg-white rounded-xl w-11/12 px-14 py-8">
        <h2 className="text-rose-900 text-3xl font-bold">
          Let's Know Your Thoughts
        </h2>

        <form style={{ minHeight: "480px" }} className="flex justify-between">
          {/* RIGHT SIDE */}
          <div className="left w-1/2 py-6">
            <p className="font-semibold text-xl pb-3">Name</p>
            <input
              placeholder="John Phillips"
              value={name}
              onChange={nameChange}
              className=" w-3/4 placeholder:text-gray-400 mb-3 rounded-lg bg-slate-200 border-none"
              type="text"
            />

            <p className="font-semibold text-xl pb-3">
              Title <span className="text-red-500 text-sm">*</span>
            </p>
            <input
              placeholder="Climatic Change"
              value={title}
              onChange={titleChange}
              className="w-3/4 rounded-lg placeholder:text-gray-400 mb-3 bg-slate-200 border-none"
              type="text"
            />

            <p className="font-semibold text-xl pb-3">
              Content <span className="text-red-500 text-sm">*</span>
            </p>
            <textarea
              placeholder="Message......"
              style={{ minHeight: "130px" }}
              value={content}
              onChange={contentChange}
              className="w-3/4 placeholder:text-gray-400 mb-3 rounded-lg bg-slate-200 border-none"
              type="text"
            />

            <p className="font-semibold text-xl pb-3">Location</p>
            <input
              placeholder="Paris"
              value={location}
              onChange={locationChange}
              className="w-3/4 rounded-lg placeholder:text-gray-400 bg-slate-200 mb-3 border-none"
              type="text"
            />

            <p className="font-semibold text-xl pb-3">Gender:</p>
            <select
              value={gender}
              onChange={genderChange}
              className="block mb-12 rounded-lg"
              name="gender"
              id=""
            >
            <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button
              onClick={onSavePost}
              disabled={!canSave}
              className={`block w-3/4 rounded-md py-3 ${
                !canSave
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Save Post
            </button>
          </div>
          {/* LEFT SIDE */}
          <div className="right w-1/2">
            <img className="h-full justify-end" src={tweet2} alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
