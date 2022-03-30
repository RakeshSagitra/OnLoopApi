import {
  addDoc, collection,
  getDocs, getDoc, doc, updateDoc, deleteDoc,
  serverTimestamp
} from 'firebase/firestore'
import { firebaseDb } from './firebase'
import { getLinkPreviewResult } from './linkPreview'

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

export const userLearnContent = async ({ url, user_id, tags }) => {
  const linkPreviewResult = await getLinkPreviewResult({ url })

  try {
    if (linkPreviewResult) {
      // Add learn_content doc to userDoc
      const linkPreviewDoc = addDoc(
        collection(firebaseDb, `users/${user_id}/learn_content`),
        {
          ...linkPreviewResult,
          created_at: serverTimestamp(),
          status: 'unread'
        }
      )
      console.log((await linkPreviewDoc).id)
    }
  } catch (e) {
    console.log('ERROR==', e)
  }

  return true
}
