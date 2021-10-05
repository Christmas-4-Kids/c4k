import React, { useState } from "react";

export interface User {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; //may need to be number
}

export const UserStateContext = React.createContext<User | null>(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  return (
    <UserStateContext.Provider value={user}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return context;
}
