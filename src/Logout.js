import React from 'react'
import './logout.css'
export default function Logout(props) {
    return (
        <div className='logout'>
            <button onClick={()=>props.logOut()}>Logout</button>
        </div>
    )
}
