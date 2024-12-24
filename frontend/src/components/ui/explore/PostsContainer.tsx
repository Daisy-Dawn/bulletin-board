import React from 'react'
import {
    Avatar,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import avatar from '../../../app/dashboard/_lib/images/avatar.jpg'
import woman from '../../../app/dashboard/_lib/images/woman.jpg'
import { GoClock } from 'react-icons/go'
import { FaRegBookmark } from 'react-icons/fa6'
import { BsEmojiSmile, BsThreeDotsVertical } from 'react-icons/bs'
import Image from 'next/image'
import { FaRegThumbsUp } from 'react-icons/fa'
import { FaThumbsUp } from 'react-icons/fa'
import { LuMessageCircle } from 'react-icons/lu'
import { PiShare } from 'react-icons/pi'
import { SlCamera } from 'react-icons/sl'
import { IoImageOutline } from 'react-icons/io5'
import { GrAttachment } from 'react-icons/gr'
import { PiArrowBendDownRightBold } from 'react-icons/pi'
import { IoIosHeartEmpty } from 'react-icons/io'

const PostsContainer = () => {
    const [sort, setSort] = React.useState('most-popular')

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value)
    }

    const sortItems = [
        { text: 'Most Popular', value: 'most-popular' },
        { text: 'Most Recent', value: 'most-recent' },
        { text: 'Mutuals', value: 'mutuals' },
    ]

    return (
        <>
            {/* #1 */}
            <div className="w-full py-4 px-3 border-[1px] flex flex-col gap-[1rem] border-lineGrey rounded-lg  bg-background">
                {/* name and details */}
                <div className="flex justify-between items-center">
                    {/* name and details */}
                    <div className="flex gap-2 items-center">
                        <Avatar alt="Remy Sharp" src={avatar.src} />

                        <div className="flex flex-col">
                            <p className="font-medium text-[14px]">
                                Rege Jean Page
                            </p>
                            <div className="flex text-[#D7DEFE] items-center gap-1">
                                {' '}
                                <GoClock size={12} />{' '}
                                <p className=" text-[11px]">12 minutes ago</p>
                            </div>
                        </div>
                    </div>

                    {/* bookmark and other options */}
                    <div className="flex text-[#D7DEFE] gap-5">
                        <button>
                            <FaRegBookmark size={17} />
                        </button>
                        <button>
                            <BsThreeDotsVertical size={17} />
                        </button>
                    </div>
                </div>

                {/* post */}
                <p>
                    The world is so used to crumbling before my eyes, i cant
                    seem to notice when it gets better any longer. its all been
                    gloomy days and darkness that you cant seem to notice the
                    day any but of bright color appears.{' '}
                </p>

                {/* image/images, if any */}
                <div className="w-full cursor-pointer h-[350px]">
                    <Image
                        alt="post-image"
                        className="object-cover h-full w-full"
                        src={woman}
                    />
                </div>

                {/* liking a post, sharing and comment */}
                <div className="justify-around flex w-full">
                    {/* like a post */}
                    <div className="flex gap-2 text-primary items-center">
                        <button>
                            <FaThumbsUp size={17} />
                        </button>

                        <p className="text-[12px]">Liked post</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-primary">
                            <p className="text-[13px] text-foreground">1,7k</p>
                        </span>
                    </div>

                    {/* comment on a post */}
                    <div className="flex gap-2 text-[#D7DEFE]  items-center">
                        <button>
                            <LuMessageCircle size={17} />
                        </button>

                        <p className="text-[12px]">Comments</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px] text-foreground">45</p>
                        </span>
                    </div>

                    {/* share a post */}
                    <div className="flex gap-2 text-[#D7DEFE]  items-center">
                        <button>
                            <PiShare size={17} />
                        </button>

                        <p className="text-[12px]">Share</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px] text-foreground">12</p>
                        </span>
                    </div>
                </div>

                {/* line */}
                <div className="border-lineGrey border-t-[1px]"></div>

                {/* post comment */}
                <div className="flex gap-2 items-center py-[10px] px-[15px]">
                    <span className="">
                        <Avatar
                            sx={{ width: 28, height: 28 }}
                            alt="Remy Sharp"
                            src={avatar.src}
                        />
                    </span>
                    <div className="w-full justify-between py-[10px] px-[15px] flex rounded-3xl bg-[#25272D] ">
                        <input
                            className="outline-none bg-transparent w-full"
                            type="text"
                            placeholder="What's on your mind"
                        />

                        {/* camera and files actions */}
                        <div className="flex gap-3 text-[#D7DEFE] items-center">
                            <button>
                                <SlCamera size={18} />
                            </button>
                            <button>
                                <IoImageOutline size={18} />
                            </button>
                            <button>
                                <GrAttachment size={18} />
                            </button>
                            <button>
                                <BsEmojiSmile size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* comment */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">All comments</p>

                        {/* sort */}
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <div className="flex text-[rgb(215,222,254)] items-center  gap-3">
                                <p className=" text-[12px]">Sort by:</p>
                                <Select
                                    labelId="sort-by-label"
                                    id="sort-by-label-id"
                                    value={sort}
                                    onChange={handleChange}
                                    label="Sort"
                                    className="text-[12px] text-[rgb(215,222,254)]  "
                                >
                                    {sortItems.map((item) => (
                                        <MenuItem
                                            className="text-[12px] "
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </FormControl>
                    </div>

                    {/* comments and replies */}
                    <div className="px-[2rem] flex flex-col gap-2">
                        {/* comments */}
                        <div className=" flex items-center gap-4 justify-between">
                            <div className="flex gap-3 items-start">
                                <Avatar
                                    sx={{ width: 28, height: 28 }}
                                    alt="Remy Sharp"
                                    src={avatar.src}
                                />

                                <p className=" text-secondary text-[14px] ">
                                    {' '}
                                    <span className="font-medium text-foreground">
                                        Official Brad Pitt:
                                    </span>{' '}
                                    People getting this type of rejection
                                    thining its Ai have nothing to do with us
                                    but their sense of reasoning
                                </p>
                            </div>

                            <button>
                                <IoIosHeartEmpty />
                            </button>
                        </div>

                        {/* replies */}
                        <div className="flex px-[1.5rem] justify-between items-center">
                            <div className="flex cursor-pointer gap-2 items-center">
                                <PiArrowBendDownRightBold size={16} />
                                <p className="text-[13px]">Reply Comments</p>
                                <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                                    <p className="text-[12px] text-foreground">
                                        2
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* line */}
                <div className="border-lineGrey border-t-[1px]"></div>

                <button className="text-primary font-medium text-[13px] text-center">
                    View all comments
                </button>
            </div>

            {/* #2 */}
            <div className="w-full py-4 px-3 border-[1px] flex flex-col gap-[1rem] border-lineGrey rounded-lg  bg-background">
                {/* name and details */}
                <div className="flex justify-between items-center">
                    {/* name and details */}
                    <div className="flex gap-2 items-center">
                        <Avatar alt="Remy Sharp" src={avatar.src} />

                        <div className="flex flex-col">
                            <p className="font-medium text-[14px]">
                                Rege Jean Page
                            </p>
                            <div className="flex text-[#D7DEFE] items-center gap-1">
                                {' '}
                                <GoClock size={12} />{' '}
                                <p className=" text-[11px]">12 minutes ago</p>
                            </div>
                        </div>
                    </div>

                    {/* bookmark and other options */}
                    <div className="flex text-[#D7DEFE] gap-5">
                        <button>
                            <FaRegBookmark size={17} />
                        </button>
                        <button>
                            <BsThreeDotsVertical size={17} />
                        </button>
                    </div>
                </div>

                {/* post */}
                <p>
                    The world is so used to crumbling before my eyes, i cant
                    seem to notice when it gets better any longer. its all been
                    gloomy days and darkness that you cant seem to notice the
                    day any but of bright color appears.{' '}
                </p>

                {/* image/images, if any */}
                <div className="w-full cursor-pointer h-[350px]">
                    <Image
                        alt="post-image"
                        className="object-cover h-full w-full"
                        src={avatar}
                    />
                </div>

                {/* liking a post, sharing and comment */}
                <div className="justify-around flex w-full">
                    {/* like a post */}
                    <div className="flex gap-2 text-primary items-center">
                        <button>
                            <FaThumbsUp size={17} />
                        </button>

                        <p className="text-[12px]">Liked post</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-primary">
                            <p className="text-[13px] text-foreground">1,7k</p>
                        </span>
                    </div>

                    {/* comment on a post */}
                    <div className="flex gap-2 text-[#D7DEFE]  items-center">
                        <button>
                            <LuMessageCircle size={17} />
                        </button>

                        <p className="text-[12px]">Comments</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px] text-foreground">45</p>
                        </span>
                    </div>

                    {/* share a post */}
                    <div className="flex gap-2 text-[#D7DEFE]  items-center">
                        <button>
                            <PiShare size={17} />
                        </button>

                        <p className="text-[12px]">Share</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px] text-foreground">12</p>
                        </span>
                    </div>
                </div>

                {/* line */}
                <div className="border-lineGrey border-t-[1px]"></div>

                {/* post comment */}
                <div className="flex gap-2 items-center py-[10px] px-[15px]">
                    <span className="">
                        <Avatar
                            sx={{ width: 28, height: 28 }}
                            alt="Remy Sharp"
                            src={avatar.src}
                        />
                    </span>
                    <div className="w-full justify-between py-[10px] px-[15px] flex rounded-3xl bg-[#25272D] ">
                        <input
                            className="outline-none bg-transparent w-full"
                            type="text"
                            placeholder="What's on your mind"
                        />

                        {/* camera and files actions */}
                        <div className="flex gap-3 text-[#D7DEFE] items-center">
                            <button>
                                <SlCamera size={18} />
                            </button>
                            <button>
                                <IoImageOutline size={18} />
                            </button>
                            <button>
                                <GrAttachment size={18} />
                            </button>
                            <button>
                                <BsEmojiSmile size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* comment */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">All comments</p>

                        {/* sort */}
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <div className="flex text-[rgb(215,222,254)] items-center  gap-3">
                                <p className=" text-[12px]">Sort by:</p>
                                <Select
                                    labelId="sort-by-label"
                                    id="sort-by-label-id"
                                    value={sort}
                                    onChange={handleChange}
                                    label="Sort"
                                    className="text-[12px] text-[rgb(215,222,254)]  "
                                >
                                    {sortItems.map((item) => (
                                        <MenuItem
                                            className="text-[12px] "
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </FormControl>
                    </div>

                    {/* comments and replies */}
                    <div className="px-[2rem] flex flex-col gap-2">
                        {/* comments */}
                        <div className=" flex items-center gap-4 justify-between">
                            <div className="flex gap-3 items-start">
                                <Avatar
                                    sx={{ width: 28, height: 28 }}
                                    alt="Remy Sharp"
                                    src={avatar.src}
                                />

                                <p className=" text-secondary text-[14px] ">
                                    {' '}
                                    <span className="font-medium text-foreground">
                                        Official Brad Pitt:
                                    </span>{' '}
                                    People getting this type of rejection
                                    thining its Ai have nothing to do with us
                                    but their sense of reasoning
                                </p>
                            </div>

                            <button>
                                <IoIosHeartEmpty />
                            </button>
                        </div>

                        {/* replies */}
                        <div className="flex px-[1.5rem] justify-between items-center">
                            <div className="flex cursor-pointer gap-2 items-center">
                                <PiArrowBendDownRightBold size={16} />
                                <p className="text-[13px]">Reply Comments</p>
                                <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                                    <p className="text-[12px] text-foreground">
                                        2
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* line */}
                <div className="border-lineGrey border-t-[1px]"></div>

                <button className="text-primary font-medium text-[13px] text-center">
                    View all comments
                </button>
            </div>

            {/* #3 */}
            <div className="w-full py-4 px-3 border-[1px] flex flex-col gap-[1rem] border-lineGrey rounded-lg  bg-background">
                {/* name and details */}
                <div className="flex justify-between items-center">
                    {/* name and details */}
                    <div className="flex gap-2 items-center">
                        <Avatar alt="Remy Sharp" src={avatar.src} />

                        <div className="flex flex-col">
                            <p className="font-medium text-[14px]">
                                Rege Jean Page
                            </p>
                            <div className="flex text-[#D7DEFE] items-center gap-1">
                                {' '}
                                <GoClock size={12} />{' '}
                                <p className=" text-[11px]">12 minutes ago</p>
                            </div>
                        </div>
                    </div>

                    {/* bookmark and other options */}
                    <div className="flex text-[#D7DEFE] gap-5">
                        <button>
                            <FaRegBookmark size={17} />
                        </button>
                        <button>
                            <BsThreeDotsVertical size={17} />
                        </button>
                    </div>
                </div>

                {/* post */}
                <p>
                    The world is so used to crumbling before my eyes, i cant
                    seem to notice when it gets better any longer. its all been
                    gloomy days and darkness that you cant seem to notice the
                    day any but of bright color appears.{' '}
                </p>

                {/* image/images, if any */}
                <div className="w-full cursor-pointer h-[350px]">
                    <Image
                        alt="post-image"
                        className="object-cover h-full w-full"
                        src={avatar}
                    />
                </div>

                {/* liking a post, sharing and comment */}
                <div className="justify-around flex w-full">
                    {/* like a post */}
                    <div className="flex gap-2 text-primary items-center">
                        <button>
                            <FaThumbsUp size={17} />
                        </button>

                        <p className="text-[12px]">Liked post</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-primary">
                            <p className="text-[13px] text-foreground">1,7k</p>
                        </span>
                    </div>

                    {/* comment on a post */}
                    <div className="flex gap-2 text-[#D7DEFE]  items-center">
                        <button>
                            <LuMessageCircle size={17} />
                        </button>

                        <p className="text-[12px]">Comments</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px] text-foreground">45</p>
                        </span>
                    </div>

                    {/* share a post */}
                    <div className="flex gap-2 text-[#D7DEFE]  items-center">
                        <button>
                            <PiShare size={17} />
                        </button>

                        <p className="text-[12px]">Share</p>

                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px] text-foreground">12</p>
                        </span>
                    </div>
                </div>

                {/* line */}
                <div className="border-lineGrey border-t-[1px]"></div>

                {/* post comment */}
                <div className="flex gap-2 items-center py-[10px] px-[15px]">
                    <span className="">
                        <Avatar
                            sx={{ width: 28, height: 28 }}
                            alt="Remy Sharp"
                            src={avatar.src}
                        />
                    </span>
                    <div className="w-full justify-between py-[10px] px-[15px] flex rounded-3xl bg-[#25272D] ">
                        <input
                            className="outline-none bg-transparent w-full"
                            type="text"
                            placeholder="What's on your mind"
                        />

                        {/* camera and files actions */}
                        <div className="flex gap-3 text-[#D7DEFE] items-center">
                            <button>
                                <SlCamera size={18} />
                            </button>
                            <button>
                                <IoImageOutline size={18} />
                            </button>
                            <button>
                                <GrAttachment size={18} />
                            </button>
                            <button>
                                <BsEmojiSmile size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* comment */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-medium ">All comments</p>

                        {/* sort */}
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <div className="flex text-[rgb(215,222,254)] items-center  gap-3">
                                <p className=" text-[12px]">Sort by:</p>
                                <Select
                                    labelId="sort-by-label"
                                    id="sort-by-label-id"
                                    value={sort}
                                    onChange={handleChange}
                                    label="Sort"
                                    className="text-[12px] text-[rgb(215,222,254)]  "
                                >
                                    {sortItems.map((item) => (
                                        <MenuItem
                                            className="text-[12px] "
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </FormControl>
                    </div>

                    {/* comments and replies */}
                    <div className="px-[2rem] flex flex-col gap-2">
                        {/* comments */}
                        <div className=" flex items-center gap-4 justify-between">
                            <div className="flex gap-3 items-start">
                                <Avatar
                                    sx={{ width: 28, height: 28 }}
                                    alt="Remy Sharp"
                                    src={avatar.src}
                                />

                                <p className=" text-secondary text-[14px] ">
                                    {' '}
                                    <span className="font-medium text-foreground">
                                        Official Brad Pitt:
                                    </span>{' '}
                                    People getting this type of rejection
                                    thining its Ai have nothing to do with us
                                    but their sense of reasoning
                                </p>
                            </div>

                            <button>
                                <IoIosHeartEmpty />
                            </button>
                        </div>

                        {/* replies */}
                        <div className="flex px-[1.5rem] justify-between items-center">
                            <div className="flex cursor-pointer gap-2 items-center">
                                <PiArrowBendDownRightBold size={16} />
                                <p className="text-[13px]">Reply Comments</p>
                                <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                                    <p className="text-[12px] text-foreground">
                                        2
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* line */}
                <div className="border-lineGrey border-t-[1px]"></div>

                <button className="text-primary font-medium text-[13px] text-center">
                    View all comments
                </button>
            </div>
        </>
    )
}

export default PostsContainer
