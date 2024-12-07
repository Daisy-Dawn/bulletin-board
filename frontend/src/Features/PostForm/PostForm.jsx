import React, { useState } from 'react'
import tweet2 from '../../assets/images/tweet2.jpg'
import { useDispatch } from 'react-redux'
import { postAdded } from '../posts/PostSlice'
import { useNavigate } from 'react-router-dom'

const PostForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [location, setlocation] = useState('')
    const [gender, setGender] = useState('')

    const nameChange = (e) => setName(e.target.value)
    const titleChange = (e) => setTitle(e.target.value)
    const contentChange = (e) => setContent(e.target.value)
    const locationChange = (e) => setlocation(e.target.value)
    const genderChange = (e) => setGender(e.target.value)
    // const

    const canSave = Boolean(title) && Boolean(content)

    const onSavePost = () => {
        if (title && content) {
            let processedName = name.trim() // Remove leading and trailing whitespaces
            const spaceIndex = processedName.indexOf(' ')

            if (spaceIndex !== -1) {
                const firstName = processedName.slice(0, spaceIndex)
                const lastName = processedName.slice(spaceIndex + 1)

                if (firstName.length > 15 && lastName.length <= 15) {
                    const useInitials = window.confirm(
                        `First name is more than 15 letters in length. Do you want to use initials instead?`
                    )

                    if (useInitials) {
                        processedName = `${firstName
                            .slice(0, 1)
                            .toUpperCase()} ${lastName}`
                    }
                } else if (lastName.length > 15 && firstName.length <= 15) {
                    const useInitials = window.confirm(
                        `Last name is more than 15 letters in length. Do you want to use initials instead?`
                    )

                    if (useInitials) {
                        processedName = `${firstName} ${lastName
                            .slice(0, 1)
                            .toUpperCase()}`
                    }
                } else if (firstName.length > 15 && lastName.length > 15) {
                    const useInitials = window.confirm(
                        `Both first and last names are more than 15 letters in length. Do you want to use initials for both?`
                    )

                    if (useInitials) {
                        processedName = `${firstName
                            .slice(0, 1)
                            .toUpperCase()} ${lastName
                            .slice(0, 1)
                            .toUpperCase()}`
                    }
                }
            } else if (processedName.length > 15) {
                // If there's no space but the name is too long
                const useInitials = window.confirm(
                    `Name is more than 15 letters in length. Do you want to use initials instead?`
                )

                if (useInitials) {
                    processedName = `${processedName
                        .slice(0, 1)
                        .toUpperCase()} ${processedName
                        .slice(1, 2)
                        .toUpperCase()}`
                } else {
                    // User chose not to use initials, do not save the post
                    return
                }
            }

            dispatch(postAdded(title, content, processedName, location, gender))
            setTitle('')
            setContent('')
            setlocation('')
            setName('')
            navigate('/')
        }
    }

    return (
        <div
            style={{ minHeight: '570px' }}
            className="bg-gray-400 p-2 md:p-4 lg:p-10 flex items-center justify-center"
        >
            <div className="form-wrapper bg-white rounded-xl w-11/12 px-4 md:px-8 lg:px-14 py-2 md:py-4 lg:py-8">
                <h2 className="text-rose-900 md:text-3xl text-center md:text-justify text-xl font-bold">
                    Let's Know Your Thoughts
                </h2>

                <form
                    style={{ minHeight: '480px' }}
                    className="flex justify-between md:gap-2 items-center"
                >
                    {/* RIGHT SIDE */}
                    <div className="left md:w-1/2 w-full py-6">
                        <p className="font-semibold text-sm md:text-xl pb-3">
                            Name
                        </p>
                        <input
                            placeholder="John Phillips"
                            value={name}
                            onChange={nameChange}
                            className="w-full lg:w-full xl:w-3/4 placeholder:text-gray-400 mb-3 rounded-lg bg-slate-200 border-none"
                            type="text"
                        />

                        <p className="font-semibold text-sm md:text-xl pb-3">
                            Title{' '}
                            <span className="text-red-500 text-sm">*</span>
                        </p>
                        <input
                            placeholder="Climatic Change"
                            value={title}
                            onChange={titleChange}
                            className="w-full xl:w-3/4 lg:w-full rounded-lg placeholder:text-gray-400 mb-3 bg-slate-200 border-none"
                            type="text"
                        />

                        <p className="font-semibold  text-sm md:text-xl pb-3">
                            Content{' '}
                            <span className="text-red-500 text-sm">*</span>
                        </p>
                        <textarea
                            placeholder="Message......"
                            style={{ minHeight: '130px' }}
                            value={content}
                            onChange={contentChange}
                            className="w-full xl:w-3/4 lg:w-full placeholder:text-gray-400 mb-3 rounded-lg bg-slate-200 border-none"
                            type="text"
                        />

                        <p className="font-semibold text-sm md:text-xl pb-3">
                            Location
                        </p>
                        <input
                            placeholder="Paris"
                            value={location}
                            onChange={locationChange}
                            className="w-full xl:w-3/4 lg:w-full rounded-lg placeholder:text-gray-400 bg-slate-200 mb-3 border-none"
                            type="text"
                        />

                        <p className="font-semibold text-sm md:text-xl pb-3">
                            Gender:
                        </p>
                        <select
                            value={gender}
                            onChange={genderChange}
                            className="block w-1/2 md:w-1/3 mb-12 rounded-lg"
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
                            className={`block w-full md:w-full lg:w-3/4 rounded-md py-3 ${
                                !canSave
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                        >
                            Save Post
                        </button>
                    </div>
                    {/* LEFT SIDE */}
                    <div className="right md:w-1/2 hidden md:inline-block">
                        <img
                            className="w-full justify-end items-center"
                            src={tweet2}
                            alt=""
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm
