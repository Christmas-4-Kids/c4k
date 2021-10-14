import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"

export interface User {
  checkedIn: boolean
  driversLicense: string
  email: string
  emailLower: string
  firstName: string
  lastName: string
  lastNameLower: string
  lastUpdated: string
  mailchimpMemberId: string
  medical: string
  phoneNumber: string
  spanish: string
  verified: boolean
}

type UserContext = {
  user: User
  userIsSigningOut: boolean
  userIsSignedIn: boolean
  saveUser: (user: User) => void
  signOut: () => void
}

const initUser = {
  checkedIn: false,
  driversLicense: "",
  email: "",
  emailLower: "",
  firstName: "",
  lastName: "",
  lastNameLower: "",
  lastUpdated: "",
  mailchimpMemberId: "",
  medical: "",
  phoneNumber: "",
  spanish: "",
  verified: false,
}

const saveUserToDevice = async (user: User) => {
  try {
    await AsyncStorage.setItem("@store:user", JSON.stringify(user))
  } catch (error) {
    console.log(`error saving to local storage: `, error)
  }
}

const UserContext = React.createContext<UserContext>({
  user: initUser,
  userIsSigningOut: false,
  userIsSignedIn: false,
  saveUser: (user: User) => {},
  signOut: () => {},
})

export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User>(initUser)
  const [userIsSigningOut, setUserIsSigningOut] = useState(false)
  const [userIsSignedIn, setUserIsSignedIn] = useState(false)

  const getLocalUser = async () => {
    const localUserString = await AsyncStorage.getItem("@store:user")
    const localUser: User = JSON.parse(localUserString)
    if (localUser && localUser.verified) {
      setUser(user)
      setUserIsSignedIn(true)
    }
  }
  const signOut = () => {
    setUserIsSigningOut(true)
    setUser(initUser)
    setUserIsSignedIn(false)
  }
  const saveUser = (user: User) => {
    setUser(user)
    saveUserToDevice(user)
  }

  useEffect(() => {
    getLocalUser()
  }, [])

  useEffect(() => {
    setUserIsSignedIn(user.verified)
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        saveUser,
        userIsSigningOut,
        userIsSignedIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used inside a UserProvider")
  }
  return context
}
