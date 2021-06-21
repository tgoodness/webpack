import React from 'react'
import img from "./img.svg";
function App () {
    return (
        <div>
            { process.env.DB_HOST }
            <img src={ img} width="100" />
        </div>
    )
}

export default App
