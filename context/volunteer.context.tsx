import React, { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../services/firestore.service"

export interface Address {
  addr1: string
  addr2: string
  city: string
  country: string
  state: string
  zip: string
}

export interface Volunteer {
  checkedIn: boolean
  driversLicense: string
  email: string
  emailLower: string
  firstName: string
  lastName: string
  lastNameLower: string
  fullName: string
  lastUpdated: string
  mailchimpMemberId: string
  medical: string
  phoneNumber: string
  spanish: string
  verified: boolean
  volunteerType: string
  address: Address
  comments: string
  driver: string
}

type UserContext = {
  volunteers: Volunteer[]
}

const VolunteerContext = React.createContext<UserContext>({
  volunteers: [],
})

const createVolunteer = (firestoreVolunteer: any) => {
  const volunteer: Volunteer = {
    checkedIn: firestoreVolunteer.checkedIn,
    driversLicense: firestoreVolunteer.driversLicense,
    email: firestoreVolunteer.email,
    emailLower: firestoreVolunteer.emailLower,
    firstName: firestoreVolunteer.firstName.trim(),
    lastName: firestoreVolunteer.lastName.trim(),
    lastNameLower: firestoreVolunteer.lastNameLower.trim(),
    fullName: firestoreVolunteer.firstName.toLowerCase().trim() + " " + firestoreVolunteer.lastNameLower.trim(),
    lastUpdated: firestoreVolunteer.lastUpdated,
    mailchimpMemberId: firestoreVolunteer.mailchimpMemberId,
    medical: firestoreVolunteer.medical,
    phoneNumber: firestoreVolunteer.phoneNumber,
    spanish: firestoreVolunteer.spanish,
    verified: firestoreVolunteer.verified,
    volunteerType: firestoreVolunteer.volunteerType,
    address: {
      addr1: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.ADDRESS?.addr1,
      addr2: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.ADDRESS?.addr2,
      city: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.ADDRESS?.city,
      country: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.ADDRESS?.country,
      state: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.ADDRESS?.state,
      zip: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.ADDRESS?.zip,
    },
    comments: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.COMMENTS,
    driver: firestoreVolunteer.mailchimpMemberInfo?.merge_fields?.DRIVER,
  }
  return volunteer
}

export default function VolunteerProvider({ children }: { children: any }) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "volunteers"), where("volunteerYear", "==", "2023"), orderBy("lastNameLower")), (querySnapshot) => {
      const tempVolunteers = []
      querySnapshot.forEach((doc) => {
        tempVolunteers.push(createVolunteer(doc.data()))
      })
      setVolunteers(tempVolunteers)
    })
    return () => {
      unsub()
    }
  }, [])

  return (
    <VolunteerContext.Provider
      value={{
        volunteers,
      }}
    >
      {children}
    </VolunteerContext.Provider>
  )
}

export const useVolunteers = () => {
  const context = React.useContext(VolunteerContext)
  if (context === undefined) {
    throw new Error("useVolunteers must be used inside a VolunteerProvider")
  }
  return context
}
