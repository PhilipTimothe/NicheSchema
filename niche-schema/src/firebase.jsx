import { initializeApp } from 'firebase/app';
import { doc, getDocs, getDoc, updateDoc, getFirestore, setDoc, deleteDoc, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMARTUKi1rpuJDu-YXPpGuhHoF663xK0E",
  authDomain: "niche-schema.firebaseapp.com",
  projectId: "niche-schema",
  storageBucket: "niche-schema.appspot.com",
  messagingSenderId: "698874403286",
  appId: "1:698874403286:web:1e82392821dc1953bbac77",
  measurementId: "G-E3ST329TCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const getAllSpecs = async (path) => {
  const querySnapshot = await getDocs(collection(db, path));
  // querySnapshot.forEach((doc) => {
  //   console.log(JSON.stringify(doc.data()));
  // });
  return querySnapshot
  // const docRef = collection(db, path);
  // const res = await getDocs(docRef);
  // return console.log(res.docs());
}

export const getSpec = async (path) => {
  const docRef = doc(db, path);
  const res = await getDoc(docRef);
  return res.data();
}

export const createSpec = async (path, values) => {
  const docRef = doc(db, path);
  await setDoc(docRef, values);
  const res = await getDoc(docRef);
  return res.data();
};

export const updateSpec = async (path, values) => {
  const docRef = doc(db, path);
  await updateDoc(docRef, values);
  const res = await getDoc(docRef);
  return res.data();
};

export const deleteSpec = async (path) => {
  const docRef = doc(db, path);
  await deleteDoc(docRef);
};