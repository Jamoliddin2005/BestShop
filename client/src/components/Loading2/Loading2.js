import React from 'react'
import "./Loading2.css"

function Loading2({ style }) {
    return (
        <div className="loading2" >
            <h4 style={style}>Loading<span>.</span><span>.</span><span>.</span></h4>
        </div>
    )
}

export default Loading2