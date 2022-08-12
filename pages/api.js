import firebase from "../firebase/index";
const db = firebase.firestore();

export const addCenter = async (center) => {
  console.log(center);
  await db
    .collection("centers")
    .doc(center.name)
    .set(center)
    
};

export const allCenters = async () => {
  await db
    .collection("centers")
    .onSnapshot((snapshot) => {
      const hist = snapshot.docs.map((r) => {
        return r.data();
      });
      return hist;
    })
    .catch((err) => {
      return 0;
    });
};

export const deleteCenter = async (center) => {
  return await db
    .collection("centers")
    .doc(`${center}`)
    .delete()
};
