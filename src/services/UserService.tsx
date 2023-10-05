import axios, { AxiosError, AxiosResponse } from 'axios';
import { User } from '../models/user';

export async function listUsers(): Promise<Array<User>> {

    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<Array<User>> = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user`)
    const datas = response.data

    return datas;
}

export async function getUserByID(id: string, token: string): Promise<User> {

    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<User> = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/${id}`, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    const datas = response.data

    return datas;
}

export async function signUser(user: any): Promise<User> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<User> = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/login`, JSON.stringify({"user" : user}), {headers: {
        'Content-Type': 'application/json'
    }, withCredentials: true})

    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

export async function signOut(token: string): Promise<User> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<User> = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/logout`, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }, withCredentials: true})

    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

export async function registerUser(user: any): Promise<User> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<User> = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/register`, JSON.stringify({"user" : user}), {headers: {
        'Content-Type': 'application/json'
    }, withCredentials: true})

    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

export async function modifyUser(id: string, body: any, token: string): Promise<User> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;

    const response: AxiosResponse<User> = await axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/${id}`, body, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }, withCredentials: true})

    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

export async function getNewerToken(token: string): Promise<number> {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // })
    // axios.defaults.httpsAgent = agent;
    try {
        const response: AxiosResponse<User> = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/refresh_session`, {headers: {
            'Authorization': `Bearer ${token}`
        }, withCredentials: true})

        localStorage.setItem('user', JSON.stringify(response.data))

        return response.status

    } catch (error) {
        const err = error as AxiosError
        localStorage.clear()
        return err.status!
    }
}

export async function getCurrentUser(token: string): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/user/current`, {headers: {
            'Authorization': `Bearer ${token}`
        }, withCredentials: true})

        return response.data
    } catch (error) {
        const err = error as AxiosError
        throw err
    }
}