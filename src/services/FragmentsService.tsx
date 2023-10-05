import axios, { AxiosResponse } from 'axios';
import { Fragment } from '../models/fragments';

export async function getFragSample(): Promise<Array<Fragment>> {


    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;
    const url = process.env.REACT_APP_API_URL
    console.log(url)

    const response: AxiosResponse<Array<Fragment>> = await axios.get(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/fragment/sample`)
    const datas = response.data

    return datas;
}

export async function listFrags(): Promise<Array<Fragment>> {

    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<Array<Fragment>> = await axios.get(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/fragment`)
    const datas = response.data

    return datas;
}

export async function getFragByID(id: string): Promise<Fragment> {

    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;
    console.log(id)
    const response: AxiosResponse<Fragment> = await axios.get(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/fragment/meta/${id}`)
    const datas = response.data

    return datas;
}

export async function createMeta(meta: any, token: string): Promise<number> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const body = {
        "fragment" : meta
    }

    const response: AxiosResponse<Fragment> = await axios.post(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/fragment`, body, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
        withCredentials: true
    })
    const datas = response.data

    return datas.id;
}

export async function createContent(content: any, id: number, type: string, token: string): Promise<string> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const body = {
        "content" : content,
        "id": id,
        "type": type
    }

    const response: AxiosResponse<string> = await axios.post(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/content`, body, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    },
        withCredentials: true
    })

    return response.data
}

export async function createMini(mini: any, id: number, token: string): Promise<string> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;
    // axios.defaults.withCredentials = true

    const body = {
        "miniature" : mini,
        "id": id
    }

    const response: AxiosResponse<string> = await axios.post(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/miniature`, body, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    },
        withCredentials: true
    })

    return response.data
}