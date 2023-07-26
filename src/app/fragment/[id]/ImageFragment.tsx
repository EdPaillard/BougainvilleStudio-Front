import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Fragment } from '@/app/models/fragments'
import fs from 'fs';
import https from 'https';

type Props = {
    id: number,
    contentID: number
}

const ImageFragment = ({id, contentID}: Props) => {

    const [fragMeta, setFragMeta] = useState<Fragment>()

    const certificate = fs.readFileSync('@/cert.pem')
    const agent = new https.Agent({
        cert: certificate, rejectUnauthorized: false
    })
    axios.defaults.httpsAgent = agent;

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