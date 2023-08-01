"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import './Cartouche.css'

type Props = {
    image: string,
    color: string,
    id: number,
    content: [
        {
            id: number,
            type: string
        }
    ],
    number: number,
    title: string
}

const FragCartouche = ({image, content, color, id, number, title}: Props) => {

    const [contentID, setContentID] = useState<Array<number>>()
    const [contentType, setContentType] = useState<Array<string>>()

    useEffect(() => {
        let contentID: Array<number> = []
        let contentType: Array<string> = []
        content.forEach(element => {
        contentID.push(element.id)
        contentType.push(element.type)
        });
        setContentID(contentID)
        setContentType(contentType)
    }, [content])

  return (
    contentID !== undefined ? <Link href="/fragment/[id]?content_id=[content_id]&content_type=[content_type]" as={`/fragment/${id}?content_id=${JSON.stringify(contentID)}&content_type=${JSON.stringify(contentType)}`} className='cart-full overflow-hidden h-full w-full frag' style={{ backgroundImage: `url(${process.env.API_URL}/miniature/${image})`}}>
        <div className='flex-1 flex justify-center items-center res-cartouche-body'>
            <p className='text-4xl font-extrabold mt-20'>#{number}</p>
        </div>
        <div className='h-20 relative'>
            <div className='cartouche-footer bg-green-500 flex justify-evenly items-center p-2 overflow-hidden'>
                <p className='h-full w-full flex justify-center items-center text-white text-4xl font-black italic text-center overflow-scroll'>
                    {title.toUpperCase()}
                </p>
            </div>
        </div>
    </Link> : null
  )
}

//  className="cartouche-link-frag cartouche frag" style={{ backgroundImage: `url(${process.env.API_URL}/miniature/${props.image})`}} 

export default FragCartouche