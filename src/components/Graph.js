import React, { useEffect, useState } from 'react'
import './Graph.css'
export default function Graph() {
    const [change, set_change] = useState(false)
    function func1() {
        console.log("function 1 running")
        func2()
    }
    function func2() {
        console.log("Function 2 running ")
    }
    return (
        <button onClick={func1}>Run</button>
    )
}
