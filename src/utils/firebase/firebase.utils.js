import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDx5obuOFlIDxQ3R5g354NrKi4zSPJ0RNc",
  authDomain: "to-do-app-36089.firebaseapp.com",
  projectId: "to-do-app-36089",
  storageBucket: "to-do-app-36089.appspot.com",
  messagingSenderId: "628258970432",
  appId: "1:628258970432:web:ac52d70d639e943f89f8a5",
  measurementId: "G-0LBWWTHRJT",
};

// Initialize Firebase - will allow CRUD actions
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// can choose from different providers ---- can import FacebookProvider etc
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const singInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  // first want to see if there is an existing doc reference
  //   obj that firebase uses
  //   userAuth.uid ---> get it from the response when google sign in
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef, "userDocRef ");

  // on this object are different ways we can check the doc exists already
  //   to check ---> userSnapshot.exists()

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //check if user data exists - return reference
  //if it does not yet exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUser = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
