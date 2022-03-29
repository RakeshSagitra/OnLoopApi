import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
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

export const deleteUserById = async ({ id }) => {
  return deleteDoc(doc(firebaseDb, 'users', id))
}

export const updateUserById = async ({
  id, name, email, phone
}) => {
  let updatingFields = {}
  if (name) { updatingFields = { ...updatingFields, name } }
  if (email) { updatingFields = { ...updatingFields, email } }
  if (phone) { updatingFields = { ...updatingFields, phone } }

  const userData = await updateDoc(doc(firebaseDb, 'users', id), updatingFields)
  return userData
}
