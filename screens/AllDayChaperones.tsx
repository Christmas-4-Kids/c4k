import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import styles from "../styles"
import firestore from "firebase/firestore"
import MemberList from "./MemberList"

function AllDayChaperones(props: any) {
  const [memberList, setMemberList] = useState(null)
  useEffect(() => {
    let members: any[] = []
    // const unsubscribe = firestore()
    //   .collection("allDayChaperones")
    //   .orderBy("lastNameLower")
    //   .onSnapshot({
    //     error: (e) => console.error(e),
    //     next: (querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         let d = doc.data();
    //         d.firestoreId = doc.id;
    //         members.push(d);
    //       });
    //       setMemberList(members);
    //     },
    //   });
    // return () => {
    //   unsubscribe();
    // };
  }, [])

  return <MemberList memberList={memberList} {...props} />
}

export default AllDayChaperones
