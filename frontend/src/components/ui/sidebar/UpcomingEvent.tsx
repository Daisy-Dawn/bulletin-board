import React from 'react'

const UpcomingEvent = () => {
    return (
        <div>
            <div className="flex flex-col gap-[1rem]">
                {/* title */}
                <div className="flex justify-between">
                    <h2>Upcoming Event</h2>

                    <span className=" rounded-full flex px-2 py-[2px] justify-center bg-[#32353c]">
                        <p className="text-[13px]">24</p>
                    </span>
                </div>

                {/* upcoming events */}
                <div className="flex flex-col ">
                    {/* #1 */}
                    <div className="flex py-2 px-1 hover:bg-[#25272D] rounded-md cursor-pointer gap-4 items-center">
                        <div className="rounded-md flex justify-center items-center bg-[#32353c] px-2 py-2 h-11 w-11">
                            <p className="text-[12px] text-center text-[#D7DEFE]  uppercase">
                                {' '}
                                <span className="font-semibold text-[13px] text-foreground ">
                                    11
                                </span>{' '}
                                Dec
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="font-medium capitalize text-[15px]">
                                Frontend Developers
                            </h3>
                            <p className="text-[11px] text-[#D7DEFE]">
                                {' '}
                                78k interested • 7.7k going
                            </p>
                        </div>
                    </div>

                    <div className="flex py-2 px-1 hover:bg-[#25272D] rounded-md cursor-pointer gap-4 items-center">
                        <div className="rounded-md flex justify-center items-center bg-[#32353c] px-2 py-2 h-11 w-11">
                            <p className="text-[12px] text-center text-[#D7DEFE]  uppercase">
                                {' '}
                                <span className="font-semibold text-[13px] text-foreground ">
                                    11
                                </span>{' '}
                                Dec
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="font-medium capitalize text-[15px]">
                                Frontend Developers
                            </h3>
                            <p className="text-[11px] text-[#D7DEFE]">
                                {' '}
                                78k interested • 7.7k going
                            </p>
                        </div>
                    </div>

                    <div className="flex py-2 px-1 hover:bg-[#25272D] rounded-md cursor-pointer gap-4 items-center">
                        <div className="rounded-md flex justify-center items-center bg-[#32353c] px-2 py-2 h-11 w-11">
                            <p className="text-[12px] text-center text-[#D7DEFE]  uppercase">
                                {' '}
                                <span className="font-semibold text-[13px] text-foreground ">
                                    11
                                </span>{' '}
                                Dec
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="font-medium capitalize text-[15px]">
                                Frontend Developers
                            </h3>
                            <p className="text-[11px] text-[#D7DEFE]">
                                {' '}
                                78k interested • 7.7k going
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingEvent
