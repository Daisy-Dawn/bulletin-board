import { Avatar } from '@mui/material'
import React from 'react'
import avatar from '../../../app/dashboard/_lib/images/avatar.jpg'

const MyFriends = () => {
    const friends = [
        {
            name: 'Brad Pitt',
            recentActivity: 'recent activity 1:03am',
            notificationNumber: 22,
        },
        {
            name: 'Rege Jean Page',
            recentActivity: 'recent activity yesterday 07:03am',
            notificationNumber: 12,
        },
        {
            name: 'Elizabeth Benneth',
            recentActivity: 'recent activity yesterday 12:09pm',
            notificationNumber: 3,
        },
        {
            name: 'Christian Grey',
            recentActivity: 'recent activity last week',
            notificationNumber: 7,
        },
    ]

    return (
        <div className="w-full py-4 px-3 border-[1px] flex flex-col my-[1rem] gap-4 border-lineGrey rounded-lg  bg-background">
            <h2 className="font-medium text-[15px] ">Friends</h2>

            {/* friends */}
            <div className="flex flex-col gap-4">
                {/* each friend */}
                {friends.map((friend, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        {/* avatar and name */}
                        <div className="flex items-center gap-2">
                            <Avatar
                                alt="Remy Sharp"
                                src={avatar.src}
                                // sx={{ width: 24, height: 24 }}
                            />

                            <div className="flex flex-col">
                                <h3 className="capitalize text-[13.5px] font-medium">
                                    {friend.name}
                                </h3>
                                <p className="text-[12px] text-[#D7DEFE]">
                                    {friend.recentActivity}
                                </p>
                            </div>
                        </div>

                        {/* notification number */}
                        <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                            <p className="text-[13px]">
                                {friend.notificationNumber}
                            </p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyFriends
