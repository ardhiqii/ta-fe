import { firestore } from "config/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const useMatch = () => {
  const matchHistoryCollectionRef = collection(firestore, "match-histories");

  const createMatchFB = async (idMatchHistory) => {
    try {
      await setDoc(doc(firestore, "match-histories", idMatchHistory), {
        teamA: {
          name: "Team A",
          score: 0,
        },
        teamB: {
          name: "Team B",
          score: 0,
        },
        changeScoreValue: 1,
      });
    } catch (error) {
      console.log("ERROR createMatchFB", error);
    }
  };

  const subscribeToMatch = (idMatchHistory, callback) => {
    const docRef = doc(matchHistoryCollectionRef, idMatchHistory);

    const unsubcribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    });

    return unsubcribe;
  };

  const fetchMatchOnce = async (idMatchHistory, callback) => {
    const docRef = doc(matchHistoryCollectionRef, idMatchHistory);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  };

  const updateMatchFB = async (idMatchHistory, newData) => {
    const docRef = doc(matchHistoryCollectionRef, idMatchHistory);
    await updateDoc(docRef, newData);
  };

  const deleteMatchFB = async (idMatchHistory) => {
    try {
      const docRef = doc(matchHistoryCollectionRef, idMatchHistory);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createMatchFB,
    subscribeToMatch,
    fetchMatchOnce,
    updateMatchFB,
    deleteMatchFB,
  };
};
