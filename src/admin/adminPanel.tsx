import { useEffect, useState } from 'react'
import * as jose from 'jose'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { User } from '../models/user';
import ContentCreation from './ContentCreation';

import 'react-tabs/style/react-tabs.css';
import './Admin.css'

export default function AdminPanel() {
  
  const [jsonUser, setJsonUser] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setJsonUser(localStorage.getItem('user'))
  }, [])
  
  useEffect(() => {
    const decodeToken = async () => {
      if (jsonUser !== null) {
        const textEncoder = new TextEncoder()
        const user: User = JSON.parse(jsonUser)
        console.log(user)
        console.log(jsonUser)
        console.log(user.token)
        setUser(user)
        const decodedToken = await jose.jwtVerify(user.token, textEncoder.encode(process.env.REACT_APP_SECRET_KEY!)) // jwt.verify(user.token, process.env.SECRET_KEY!)
        console.log(decodedToken)
        if (decodedToken.payload['typ'] === 'admin') {
          setIsAdmin(true)
        }
      }
    }

    decodeToken()
  }, [jsonUser])

  return (
    isAdmin ? (
      <Tabs className='adminheight bg-slate-900 text-white overflow-hidden'>
        <TabList>
          <Tab>Création de Contenu</Tab>
          <Tab>Gestion des Users</Tab>
        </TabList>
        <TabPanel>
          <ContentCreation admin={user!} />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>) : 
      (<div className='adminheight overflow-hidden text-white'>L&apos;espace infini s&apos;ouvre devant vous, froid et rayonnant de ténèbres.<br/>Un moment happé par le vide, la terreur guide des mouvements brusques dont vous êtes à peine conscient, et qui vous font faire demi-tour.</div>)
  )
}