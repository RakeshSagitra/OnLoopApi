import { addDoc, collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { firebaseDb } from './firebase'

export const addUser = async ({
  name, email, phone
}) => {
  // Upload User Data to Firestore
  return addDoc(collection(firebaseDb, 'users'), { name, email, phone })
}

export const getAllUsers = async () => {
  const userRefs = await getDocs(collection(firebaseDb, 'users'))
  const allUsers = []

  userRefs.forEach(user => {
    allUsers.push({
      id: user.id,
      ...user.data()
    })
  })

  return allUsers
}

export const getUserById = async ({ id }) => {
  const userData = await getDoc(doc(firebaseDb, 'users', id))
  if (userData.exists()) {
    return {
      id,
      ...userData.data()
    }
  } return null
}
