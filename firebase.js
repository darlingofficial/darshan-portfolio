
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadBtn = document.getElementById("upload-btn");

if(uploadBtn){

uploadBtn.addEventListener("click", async()=>{

const title = document.getElementById("project-title").value;

await addDoc(collection(db, "projects"), {
  title,
  createdAt: new Date()
});

alert("Project Uploaded");

});

}

async function loadVisitors(){

const querySnapshot = await getDocs(collection(db, "visitors"));

document.getElementById("visitor-count").textContent = querySnapshot.size;

}

loadVisitors();
