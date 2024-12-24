import { Avatar } from '@mui/material'
import React from 'react'
import avatar from '../../../app/dashboard/_lib/images/avatar.jpg'

const MyCommunity = () => {
    return (
        <div className="flex flex-col gap-[1rem]">
            {/* title */}
            <div className="flex justify-between">
                <h2>My Community</h2>

                <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                    <p className="text-[13px]">4</p>
                </span>
            </div>

            {/* communities */}
            <div className="flex flex-col">
                {/* #1 */}
                <div className="flex cursor-pointer  py-2 px-1 hover:bg-[#25272D] rounded-md gap-4 items-center">
                    <Avatar alt="Remy Sharp" src={avatar.src} />

                    <div className="flex flex-col">
                        <h3 className="font-medium capitalize text-[15px]">
                            {' '}
                            Interior Designers UK{' '}
                        </h3>
                        <p className="text-[11px] text-[#D7DEFE]">
                            {' '}
                            774 members{' '}
                        </p>
                    </div>
                </div>

                <div className="flex py-2 px-1 hover:bg-[#25272D] rounded-md cursor-pointer gap-4 items-center">
                    <Avatar alt="Remy Sharp" src={avatar.src} />

                    <div className="flex flex-col">
                        <h3 className="font-medium capitalize text-[15px]">
                            {' '}
                            Interior Designers UK{' '}
                        </h3>
                        <p className="text-[11px] text-[#D7DEFE]">
                            {' '}
                            774 members{' '}
                        </p>
                    </div>
                </div>

                <div className="flex py-2 px-1 hover:bg-[#25272D] rounded-md cursor-pointer gap-4 items-center">
                    <Avatar alt="Remy Sharp" src={avatar.src} />

                    <div className="flex flex-col">
                        <h3 className="font-medium capitalize text-[15px]">
                            {' '}
                            Interior Designers UK{' '}
                        </h3>
                        <p className="text-[11px] text-[#D7DEFE]">
                            {' '}
                            774 members{' '}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCommunity
