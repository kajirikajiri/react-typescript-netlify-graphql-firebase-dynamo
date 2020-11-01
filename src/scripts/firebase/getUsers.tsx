import firebase, { db } from '../firebase';


export const getUsers=async():Promise<{name: string, createdAt: firebase.firestore.Timestamp }[]>=>{
  const docRef = db.collection('users')
  try{
    const doc = await docRef.get()
    if (20 > doc.size && doc.size > 0) {
      try{
        const result = await Promise.all(doc.docs.map(async(doc)=>{
          const user = await db.collection('users').doc(doc.id).get()
          const result = user.data()
          return result as {name:string, createdAt: firebase.firestore.Timestamp }
        }))
        return result
      }catch (e){
        console.log(e)
        return []
      }
    } else {
      console.log("No such document!")
      return []
    }
  } catch(e) {
    console.log(e)
    return []
  }
}



  // const result = docRef.get().then((doc)=>{
  //   if (doc.size > 0) {
  //     // console.log("TC: getUsers -> doc", doc)
  //     // console.log("TC: getUsers -> docs", doc.docs)
  //     return doc.docs.map((doc)=>{
  //       return db.collection('users').doc(doc.id).get().then((user)=>{
  //         // console.log("TC: getUsers -> user", user.data())
  //         return user.data()
  //       })
  //     })
  //   } else {
  //     console.log("No such document!")
  //   }
  // }).catch((e)=>{
  //   console.log("Error getting document: ", e)
  // })
  