import React from 'react'
import Sidebar from '../components/sidebar'

function Canvas() {
    return (
        <div className='flex'>
            <div className='basis-1/4'>
                <Sidebar />
            </div>
            <div className='w-52 h-52
        bg-blue-400 
        cursor-pointer 
        flex 
        justify-center 
        items-center
        rounded-lg
        basis-3/4'>
                You are on the canvas !!
            </div>
        </div>
    )
}

export default Canvas