import firestore from "@react-native-firebase/firestore";

const collections = [
  "lebanonChaperones",
  "allDayChaperones",
  "eveningChaperones",
  "drivers",
];

async function setMembersByValue(value, where, setState, setFetch) {
  let members = [];
  for (let collection of collections) {
    members = [];
    const querySnapshot = await firestore()
      .collection(collection)
      .where(where, "==", value)
      .get();
    querySnapshot.forEach((doc) => {
      let d = doc.data();
      d.firestoreId = doc.id;
      d.collection = collection;
      members.push(d);
    });
    console.log(`adding ${members.length} members`);
    setState((state) => [...state, ...members]);
  }
  setFetch({ complete: true });
}

async function addCollectionToFirestoreMembers(collection, setState) {
  let members = [];
  const querySnapshot = await firestore()
    .collection(collection)
    .orderBy("lastNameLower")
    .get();
  querySnapshot.forEach((doc) => {
    let d = doc.data();
    d.firestoreId = doc.id;
    d.collection = collection;
    members.push(d);
  });
  console.log(`adding ${members.length} members`);
  setState((state) => [...state, ...members]);
}

async function addCollectionsToFirestoreMembers(setFirestoreMembers, setFetch) {
  for (let collection of collections) {
    await addCollectionToFirestoreMembers(collection, setFirestoreMembers);
  }
  setFetch({ complete: true });
}

function getCollections() {
  return collections;
}

export {
  addCollectionToFirestoreMembers,
  addCollectionsToFirestoreMembers,
  setMembersByValue,
  getCollections,
};
