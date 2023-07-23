import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Content, Fragment } from '@/app/models/fragments'

type Props = {
    id: number,
    contentID: number
}

const ImageFragment = ({id, contentID}: Props) => {

    const [content, setContent] = useState<Content>()
    const [fragMeta, setFragMeta] = useState<Fragment>()

    useEffect(() => {
        const fetchData = async () => {
            const response: AxiosResponse<Fragment> = await axios.get(`http://localhost:4000/fragment/meta/${id}`)
            const datas = response.data
            console.log(datas)
            setFragMeta(datas)

            const responseContent: AxiosResponse<Content> = await axios.get(`http://localhost:4000/content/${contentID}`)
            const datasContent = responseContent.data
            console.log(datasContent)
            setContent(datasContent)
        }
        fetchData()
    }, [])

  return (
    <div>ImageFragment</div>
  )
}

export default ImageFragment