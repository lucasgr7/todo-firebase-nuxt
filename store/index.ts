import { initializeApp } from "firebase/app";
import { doc, getDocs, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { FireBaseTodoType, TodoType } from "~/types";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export const addTodoItem = (value: string) => {
  // add a todo item
  addDoc(collection(db, "todo"), {
    value,
    done: false
  } as TodoType);
}

// read the todos onSnapshot
export const subscribeTodosRead = (callback: (todos: FireBaseTodoType[]) => void) => {
  onSnapshot(collection(db, "todo"), (snapshot) => {
    const todos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        value: doc.data() as TodoType
      } as FireBaseTodoType
    });
    callback(todos);
  });
}

// update the todo item
export const updateTodoItem = (id: string, value: TodoType) => {
  const todoRef = doc(db, "todo", id);
  setDoc(todoRef, value);
}
