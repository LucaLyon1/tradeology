'use client'

import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import { Blocks } from '@/types';

const haveKey = () => {
    return
}

function Canvas() {
    const [blocks, setBlocks] = useState<Array<Blocks>>([]);
    const addBlock = (newBlock: Blocks) => {
        setBlocks([...blocks, newBlock]);
        console.log(blocks);
    }
    return (
        <div className='flex'>
            <div className='basis-1/4'>
                <Sidebar addBlock={addBlock} />
            </div>
            {blocks.map((block, id) => (
                <div className='rounded-md
                text-white
                flex
                w-48 
                h-48 
                bg-blue-400
                items-center
                justify-center'
                    key={id}>
                    Block {Blocks[block]}
                </div>
            ))}
        </div>
    )
}

export default Canvas