import React, { useState } from "react"

export interface User {
  type: string
  firstName: string
  lastName: string
  email: string
  phone: string
  code?: string
}

type UserContext = {
  user: User
  userIsVerified: boolean
  userIsSigningOut: boolean
  setUser: (user: User) => void
  setUserIsVerified: (isVerified: boolean) => void
  signOut: () => void
}

const initUser = {
  type: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
}

const UserContext = React.createContext<UserContext>({
  user: initUser,
  userIsVerified: false,
  userIsSigningOut: false,
  setUser: (user: User) => {},
  setUserIsVerified: (isVerified: boolean) => {},
  signOut: () => {},
})

export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User>(initUser)
  const [userIsVerified, setUserIsVerified] = useState(false)
  const [userIsSigningOut, setUserIsSigningOut] = useState(false)
  const signOut = () => {
    setUserIsSigningOut(true)
    setUserIsVerified(false)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userIsVerified,
        setUserIsVerified,
        userIsSigningOut,
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
