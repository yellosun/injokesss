import React from 'react'

const Timer = ({timer}) => {
    return (
        <div>Time Left: {timer / 1000}</div>
    )
}

export default Timer
