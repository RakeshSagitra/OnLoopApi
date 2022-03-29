import { addDoc, collection } from 'firebase/firestore'
import { firebaseDb } from './firebase'

export const addUser = async ({
  name, email, phone
}) => {
  // Upload User Data to Firestore
  return addDoc(collection(firebaseDb, 'users'), { name, email, phone })
}
