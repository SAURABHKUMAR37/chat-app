
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCGZfzUBClZ2xDuYtDySJEURWp6TCQqetU",
  authDomain: "chat-app-ea7b2.firebaseapp.com",
  projectId: "chat-app-ea7b2",
  storageBucket: "chat-app-ea7b2.firebasestorage.app",
  messagingSenderId: "246639329233",
  appId: "1:246639329233:web:04e48ac677a8d380912af0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastSeen: Date.now()
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    });

    toast.success("Account created successfully!");

  } catch (error) {
toast.error(error.code.split('/')[1].split('-').join(" "))    
console.error(error);
  }
};
const login=async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
    toast.success("run")
    
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
    
  }

}
const logout=async()=>{
  try {
    await signOut(auth)
    
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
  
}

export { signup ,login,logout};
