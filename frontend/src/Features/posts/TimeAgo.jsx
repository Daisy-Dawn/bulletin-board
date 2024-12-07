import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ( {timeStamp} ) => {
    let timeAgo = ""
    if (timeStamp) {
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
  return (
    <div className='text-xs sm:text-base' title={timeStamp}> &nbsp;
        <i >{timeAgo} </i>
    </div>
  )
}

export default TimeAgo