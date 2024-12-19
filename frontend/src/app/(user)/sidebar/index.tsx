'use client'
import React from 'react'
import logo from '../_lib/images/logo.png'
import Image from 'next/image'
import { IoSearch } from 'react-icons/io5'
import { useActivePage } from '@/components/context/ActivePageContext'
import { IoHome } from 'react-icons/io5'
import { HiUserGroup } from 'react-icons/hi'
import { ImNewspaper } from 'react-icons/im'
import { FaUsers } from 'react-icons/fa6'
import { FaUserLarge } from 'react-icons/fa6'
import { FaRegUser } from 'react-icons/fa6'
import MyCommunity from '@/components/ui/MyCommunity'
import UpcomingEvent from '@/components/ui/UpcomingEvent'

const SideBar = () => {
    const { activePage, setActivePage } = useActivePage()

    const sidebarLinks = [
        { title: 'Home', key: 'explore', icon: <IoHome size={18} /> },
        {
            title: 'Community',
            key: 'community',
            icon: <HiUserGroup size={18} />,
        },
        {
            title: 'News feed',
            key: 'newsFeed',
            icon: <ImNewspaper size={18} />,
        },
        { title: 'People', key: 'people', icon: <FaUsers size={18} /> },
        { title: 'Profile', key: 'profile', icon: <FaRegUser size={18} /> },
    ]
    return (
        <div className="py-[3rem] px-[1rem] flex flex-col gap-[2rem]">
            {/* LOGO */}
            <div className="flex items-center gap-4">
                <div className="w-[45px] h-[45px] flex justify-center items-center bg-primary rounded-full">
                    <Image
                        className="w-[35px] h-[35px] object-contain"
                        src={logo}
                        alt="app logo image"
                    />
                </div>
                <h2 className="text-primary text-[22px] font-semibold">
                    Kaloka
                </h2>
            </div>

            {/* SEARCH BAR */}
            <div className="flex gap-2 items-center border-[1px] rounded-lg border-lineGrey py-[10px] px-[15px] ">
                <span className="">
                    <IoSearch size={19} />
                </span>
                <input
                    className="outline-none bg-transparent "
                    type="text"
                    placeholder="Search Kaloka"
                />
            </div>

            {/* SIDE BAR PAGE NAVIGATIONS */}
            <div className="flex flex-col gap-1 justify-center">
                {sidebarLinks.map((link) => (
                    <button
                        key={link.key}
                        onClick={() => setActivePage(link.key)}
                        className={`px-[20px] flex gap-3 hover:bg-[#25272D] items-center rounded-md capitalize py-[12px] ${
                            activePage === link.key
                                ? 'bg-[#25272D] text-primary font-medium' // Active link style
                                : '' // Default style
                        }`}
                    >
                        <span> {link.icon}</span>
                        <p>{link.title}</p>
                    </button>
                ))}
            </div>

            <div className="border-lineGrey border-t-[1px]"></div>

            {/* MY COMMUNITY */}
            <MyCommunity />

            <div className="border-lineGrey border-t-[1px]"></div>

            {/* UPCOMING EVENTS*/}
            <UpcomingEvent />
        </div>
    )
}

export default SideBar
