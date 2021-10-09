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
  setUser: (user: User) => void
  setUserIsVerified: (isVerified: boolean) => void
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
  setUser: (user: User) => {},
  setUserIsVerified: (isVerified: boolean) => {},
})

export default function UserProvider({ children }) {
  const [user, setUser] = useState<User>(initUser)
  const [userIsVerified, setUserIsVerified] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userIsVerified,
        setUserIsVerified,
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
