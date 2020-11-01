import firebase, { db } from '../firebase';

export const addUser=(name:string)=>{
  const docId = db.collection('users').doc().id
  db.collection('users').doc(docId).set({
    docId,
    name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}
