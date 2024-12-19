import React from 'react'

const Trending = () => {
    return (
        <div className="w-full border-[1px] flex flex-col gap-4 border-lineGrey rounded-lg py-4 px-3 bg-background">
            <h2 className="text-[14px]">Today Trending</h2>

            {/* trend topics */}
            <div className="flex flex-col ">
                {/* #1 */}
                <div className="flex py-2 px-2 hover:bg-[#25272D] rounded-md cursor-pointer justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-[13.5px] font-medium">
                            Santa Wizzy
                        </h3>
                        <p className="text-[12px] text-[#D7DEFE]">
                            Trending in Nigeria
                        </p>
                    </div>

                    <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                        <p className="text-[12px] text-[#D7DEFE]">
                            5,583 posts
                        </p>
                    </span>
                </div>

                <div className="flex py-2 px-2 hover:bg-[#25272D] rounded-md cursor-pointer justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-[13.5px] font-medium">
                            Speed darlington
                        </h3>
                        <p className="text-[12px] text-[#D7DEFE]">
                            Trending in Entertainment
                        </p>
                    </div>

                    <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                        <p className="text-[12px] text-[#D7DEFE]">
                            5,583 posts
                        </p>
                    </span>
                </div>

                <div className="flex py-2 px-2 hover:bg-[#25272D] rounded-md cursor-pointer justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-[13.5px] font-medium">Burna Boy</h3>
                        <p className="text-[12px] text-[#D7DEFE]">
                            Trending in Sports
                        </p>
                    </div>

                    <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                        <p className="text-[12px] text-[#D7DEFE]">
                            5,583 posts
                        </p>
                    </span>
                </div>

                <div className="flex py-2 px-2 hover:bg-[#25272D] rounded-md cursor-pointer justify-between items-center">
                    <div className="flex flex-col">
                        <h3 className="text-[13.5px] font-medium">Davido</h3>
                        <p className="text-[12px] text-[#D7DEFE]">
                            Trending in music
                        </p>
                    </div>

                    <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                        <p className="text-[12px] text-[#D7DEFE]">
                            5,583 posts
                        </p>
                    </span>
                </div>
            </div>

            <button className="text-primary font-medium text-[12px] text-center">
                See all
            </button>
        </div>
    )
}

export default Trending
