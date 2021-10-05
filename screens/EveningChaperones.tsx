import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import MemberList from "./MemberList";

const EveningChaperones = (props) => {
  const [memberList, setMemberList] = useState(null);
  useEffect(() => {
    let members: any[] = [];
    const unsubscribe = firestore()
      .collection("eveningChaperones")
      .orderBy("lastNameLower")
      .onSnapshot({
        error: (e) => console.error(e),
        next: (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let d = doc.data();
            d.firestoreId = doc.id;
            members.push(d);
          });
          setMemberList(members);
        },
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return <MemberList memberList={memberList} {...props} />;
};

export default EveningChaperones;
