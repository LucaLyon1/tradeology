'use client'

import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import { Blocks } from '@/types';
import UiBlock from '../components/ui-block';

function Canvas() {
    const [blocks, setBlocks] = useState<Array<Blocks>>([]);
    const addBlock = (newBlock: Blocks) => {
        setBlocks([...blocks, newBlock]);
    }
    return (
        <div className='flex'>
            <div className='basis-1/4'>
                <Sidebar addBlock={addBlock} />
            </div>
            {blocks.map((block, id) => (
                <div className='
                border-4
                border-transparent
                hover:border-green-500
                rounded-md
                bg-blue-400
                cursor-pointer
                mx-4
                text-white
                w-1/4
                h-64
                text-xl' key={id}>
                    <UiBlock id={block} />
                </div>
            ))}
        </div>
    )
}

export default Canvas