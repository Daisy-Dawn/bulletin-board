'use client'
import React from 'react'
import { IoHome } from 'react-icons/io5'
import { useActivePage } from '@/components/context/ActivePageContext'
import { FaBell } from 'react-icons/fa6'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import avatar from '../images/avatar.jpg'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))

const Header = () => {
    const { activePage, setActivePage } = useActivePage()

    const navLinks = [
        { title: 'Explore', key: 'explore' },
        { title: 'Community feed', key: 'communityFeed' },
        { title: 'Mutual feed', key: 'mutualFeed' },
    ]
    return (
        <div className="min-h-[70px] px-[15px] border-y-[1px] border-lineGrey text-[14px] items-center flex w-full justify-between">
            {/* HOME NAV */}
            <div className="gap-[3rem] flex items-center">
                <div className="flex items-center gap-2">
                    <span>
                        <IoHome size={18} />
                    </span>
                    <h2 className="text-[16px]  font-medium">Home</h2>
                </div>

                {/* NAVS */}
                <div className="rounded-md p-[2px] border-[#2e2e2e] border-[1px] flex gap-2 bg-[#28292e]">
                    {navLinks.map((link) => (
                        <button
                            key={link.key}
                            onClick={() => setActivePage(link.key)}
                            className={`px-[20px] hover:bg-[#32353c] rounded-md capitalize text-center py-[8px] ${
                                activePage === link.key
                                    ? 'bg-[#32353c]' // Active link style
                                    : '' // Default style
                            }`}
                        >
                            {link.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* LOGGED IN USER PROFILE */}
            <div className="flex gap-4 items-center">
                {/* NOTIFICATIONS */}
                <div
                    onClick={() => setActivePage('notifications')}
                    className="flex cursor-pointer gap-1 items-center"
                >
                    <div className="relative">
                        <Avatar
                            sx={{
                                width: 27,
                                height: 27,
                                bgcolor: 'transparent',
                                border: '1px solid #565758',
                            }}
                        >
                            <FaBell size={16} />
                        </Avatar>
                        <span className="absolute z-10 top-0 left-4 h-2 w-2 rounded-full bg-red"></span>
                    </div>

                    <p
                        className={`${
                            activePage === 'notifications' ? 'text-primary' : ''
                        }`}
                    >
                        Notifications
                    </p>
                </div>

                {/* MESSAGES */}
                <div
                    onClick={() => setActivePage('messages')}
                    className="flex cursor-pointer gap-1 items-center"
                >
                    <div className="relative">
                        <Avatar
                            sx={{
                                width: 27,
                                height: 27,
                                bgcolor: 'transparent',
                                border: '1px solid #565758',
                            }}
                        >
                            <IoChatbubblesSharp size={16} />
                        </Avatar>
                        <span className="absolute z-10 top-0 left-4 h-2 w-2 rounded-full bg-yellow"></span>
                    </div>

                    <p
                        className={`${
                            activePage === 'messages' ? 'text-primary' : ''
                        }`}
                    >
                        Messages
                    </p>
                </div>

                {/* AVATAR */}
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar
                        className="cursor-pointer"
                        alt="Remy Sharp"
                        src={avatar.src}
                    />
                </StyledBadge>
            </div>
        </div>
    )
}

export default Header
