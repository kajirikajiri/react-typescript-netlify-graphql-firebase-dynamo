import React, {useState, useEffect} from 'react'
import { getUsers } from '../scripts/firebase/getUsers'

export default function ShowUsers () {
  const [users, setUsers] = useState<{name: string, createdAt: Date }[]>([])

  useEffect(()=>{
    getUsers().then((value) =>{
      const result = value.map((user)=>{
        return {name: user.name, createdAt: user.createdAt.toDate()}
      })
      setUsers(result)
    })
  }, [])
  return (
    <>
    <div>show Users for firebase</div>
      {users.map(user=>{
        return <div>{user.name}:{String(user.createdAt)}</div>
      })}
    </>
  )
}