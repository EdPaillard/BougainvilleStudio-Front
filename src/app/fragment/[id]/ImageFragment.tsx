import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Content, Fragment } from '@/app/models/fragments'

type Props = {
    id: number,
    contentID: number
}

const ImageFragment = ({id, contentID}: Props) => {

    const [fragMeta, setFragMeta] = useState<Fragment>()

    useEffect(() => {
        const fetchData = async () => {
            const response: AxiosResponse<Fragment> = await axios.get(`${process.env.API_URL}/fragment/meta/${id}`)
            const datas = response.data
            setFragMeta(datas)
        }
        fetchData()
    }, [id])

  return (
    <div>ImageFragment</div>
  )
}

export default ImageFragment