'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import { Blocks } from '@/types';
import UiBlock from '../components/ui-block';

interface BlockCoordinate {
    id: number,
    coordinate: [number, number]
}

function Canvas() {
    const [blocks, setBlocks] = useState<Array<BlockCoordinate>>([]);
    const [endTop, setEndTop] = useState<number>(276);
    const addBlock = (newBlock: Blocks) => {
        const newCoord: [number, number] = [50, 230];
        blocks.forEach((b) => {
            b.coordinate[1] += 128
        })
        setBlocks([...blocks, { id: newBlock, coordinate: newCoord }]);
        setEndTop(endTop + 128);
    }
    useEffect(() => {
        console.log(blocks);
    }, [endTop])

    return (
        <div className='grid grid-cols-4 gap-4 grid-rows-1 w-screen'>
            <Sidebar addBlock={addBlock} />
            <div className='col-span-3'>
                <div className='absolute top-14 left-1/2 bg-green-300 w-48 h-16 text-white text-lg rounded-md flex justify-center items-center'>
                    Beginning
                </div>
                <div className='absolute left-1/2 bg-green-300 w-48 h-16 text-white text-lg rounded-md flex justify-center items-center transition-all'
                    style={{ top: endTop + 'px' }}>
                    End
                </div>
                {blocks.map((block, id) => (
                    <div className='absolute
                        border-4
                        border-transparent
                        hover:border-black
                        rounded-md
                        bg-blue-400
                        cursor-pointer
                        text-white
                        w-64
                        transition-all'
                        key={id}
                        style={{ top: block.coordinate[1], left: block.coordinate[0] + '%' }}>
                        <div className='flex flex-col gap-1'>
                            <UiBlock id={block.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Canvas