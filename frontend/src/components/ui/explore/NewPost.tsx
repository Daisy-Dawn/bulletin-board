import { Avatar } from '@mui/material'
import React from 'react'
import avatar from '../../../app/dashboard/_lib/images/avatar.jpg'
import { SlCamera } from 'react-icons/sl'
import { IoImageOutline } from 'react-icons/io5'
import { GrAttachment } from 'react-icons/gr'
import { SlLocationPin } from 'react-icons/sl'
import { BsEmojiSmile } from 'react-icons/bs'
import { FiEdit3 } from 'react-icons/fi'

const NewPost = () => {
    return (
        <div className="w-full py-4 px-3 border-[1px] flex flex-col gap-[1.5rem] border-lineGrey rounded-lg  bg-background">
            <div className="flex items-center gap-3">
                <Avatar alt="Remy Sharp" src={avatar.src} />

                <input
                    className="outline-none w-full bg-[#25272D]  rounded-3xl  py-[10px] px-[15px] "
                    type="text"
                    placeholder="What's on your mind"
                />
            </div>

            {/* other actions */}
            <div className="flex text-[#D7DEFE] justify-between items-center">
                {/* camera and files actions */}
                <div className="flex gap-4 items-center">
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
                        <SlLocationPin size={18} />
                    </button>
                    <button>
                        <BsEmojiSmile size={18} />
                    </button>
                </div>

                {/* post and draft */}
                <div className="flex gap-4 items-center">
                    <button className="flex gap-2 items-center">
                        <FiEdit3 />
                        <p className="text-[13px]">Draft</p>
                    </button>

                    <button className="border-lineGrey border-[1px] bg-[#1E1F24] px-[20px] rounded-md capitalize text-[13px] text-center py-[6px]">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewPost
