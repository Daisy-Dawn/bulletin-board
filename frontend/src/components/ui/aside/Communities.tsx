'use client'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import avatar from '../../../app/dashboard/_lib/images/avatar.jpg'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

interface CommunitiesProps {
    image: StaticImageData
}
const Communities = ({ image }: CommunitiesProps) => {
    return (
        <div className="w-full border-[1px] flex flex-col gap-4 border-lineGrey rounded-lg  bg-background">
            {/* py-4 px-3 */}
            {/* community logo image */}
            <div className="w-full h-[200px] rounded-t-lg overflow-hidden">
                <Image
                    className="w-full h-full object-cover"
                    src={image}
                    alt="community profile image"
                />
            </div>

            <div className=" px-3 flex flex-col gap-2">
                <h3 className="font-medium">Figma Designers</h3>
                <div className="flex justify-between items-center">
                    <p className="text-[12px] text-[#D7DEFE]">12,975 members</p>
                    <AvatarGroup
                        className="avatar-group"
                        renderSurplus={(surplus) => (
                            <span>+{surplus.toString()[0]}k</span>
                        )}
                        total={4251}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={avatar.src}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Avatar
                            alt="Travis Howard"
                            src={avatar.src}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Avatar
                            alt="Agnes Walker"
                            src={avatar.src}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Avatar
                            alt="Trevor Henderson"
                            src={avatar.src}
                            sx={{ width: 24, height: 24 }}
                        />
                    </AvatarGroup>
                </div>

                <button className="text-primary my-[1rem] w-full  border-[1px] border-primary rounded-lg py-2 px-4 font-medium text-[12px] flex justify-center items-center text-center">
                    <p className="font-medium text-[14px] ">Join Community</p>
                </button>
            </div>
        </div>
    )
}

export default Communities
