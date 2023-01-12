import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBfPNCafR-_F7TwgHK9cnUSilFgpx5Q3MY",
  authDomain: "capstone-project-atlp.firebaseapp.com",
  projectId: "capstone-project-atlp",
  storageBucket: "capstone-project-atlp.appspot.com",
  messagingSenderId: "1001315819339",
  appId: "1:1001315819339:web:124c64acd9a6799d3ed2ce",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const localArticles = document.querySelector("#localArticles");
const localClientMessages = JSON.parse(localStorage.getItem("messageData"));

const UpdatedArticles = JSON.parse(localStorage.getItem("articles"));
const errors = document.getElementsByClassName("error");
const newad = JSON.parse(window.localStorage.getItem("users"));
const newArticleForm = document.getElementById("newArticleForm");
const newTitle = document.querySelector("#newTitle");
const errTitle = document.getElementById("errTitle");
const newImage = document.getElementById("fileUploader");
const errFile = document.getElementById("errFile");
const newCategory = document.getElementById("category");
const errCategory = document.getElementById("errCategory");
const newAuthor = document.getElementById("author");
const errAuthor = document.getElementById("errAuthor");
const newTime = document.getElementById("time");
const errTime = document.getElementById("errTime");
const newContents = document.getElementById("contents");
const errContents = document.getElementById("errContents");
const modalCloseBtn = document.getElementById("modalClose");
const addNewArticle = document.getElementById("addNewBtn");
const articleOutput = document.getElementById("singleArticleCard");
const signedIn = JSON.parse(localStorage.getItem("signedInAccounts"));
const logOutBtn = document.querySelector("#logOutBtn");
const usersContainer = document.querySelector("#ourUsers");
const messagesContainer = document.querySelector("#messageField");
const firebaseArticles = [];
const firebaseMessages = [];
let uploadedImageUrl;
console.log(messagesContainer);
newImage.addEventListener("change", async function (e) {
  const selectedImage = e.target.files[0];

  const imageRef = ref(storage, `images/${selectedImage.name}`);
  const uploadTask = await uploadBytesResumable(imageRef, selectedImage);
  const imageUrl = await getDownloadURL(uploadTask.ref);
  uploadedImageUrl = imageUrl;
  console.log(uploadedImageUrl);
});
window.addEventListener("DOMContentLoaded", (e) => {
  if (signedIn.length === null || signedIn.length === 0 || signedIn === []) {
    console.log("you must sign in");
    location.href = "index.html";
  }
});
modalCloseBtn.addEventListener("click", (e) => {
  newArticleForm.style.visibility = "hidden";
});
addNewArticle.addEventListener("click", (e) => {
  newArticleForm.style.visibility = "visible";
});

document.addEventListener("DOMContentLoaded", async (e) => {
  const docSnap = await getDocs(collection(db, "articles"));

  docSnap.forEach((doc) => {
    firebaseArticles.push({ ...doc.data(), id: doc.id });
  });
  console.log("all articles from firebase:", firebaseArticles);

  for (let i = 0; i < firebaseArticles.length; i++) {
    localArticles.innerHTML += `
      <ul class="dashHeader">
        <li >${i + 1}</li>
        <li>${firebaseArticles[i].editor}</li>
        <li>${firebaseArticles[i].title}</li>
        <li class="forId">${firebaseArticles[i].articleDetails}</li>
        <li>${firebaseArticles[i].date}</li>
        <li>Edit</li>
        <li>Delete</li>
        </ul>
        `;
  }
});
// for (let i = 0; i < newad.length; i++) {
//   usersContainer.appendChild(
//     (document.createElement("ul").classList.add("dashHeader").innerHTML += `
//   <li id="ide">${i}</li>
//   <li>${newad[i].name}</li>
//   <li>${newad[i].username}</li>
//   <li>${newad[i].password}</li>
//   <li>Edit</li>
//   <li>Delete</li>

//   `)
//   );
// }

logOutBtn.addEventListener("click", (e) => {
  signedIn.pop(signedIn[signedIn.length - 1]);
  alert(signedIn.length);
  localStorage.setItem("signedInAccounts", JSON.stringify(signedIn));
  location.href = "index.html";
});
//listening to new article form contents
newTitle.addEventListener("blur", function (e) {
  console.log(newTitle.value);
  if (newTitle.value === "" || newTitle.value === null) {
    errTitle.innerText = "Title field can't be empty";
    errTitle.style.color = "red";
  } else {
    errTitle.innerText = "";
  }
});
newImage.addEventListener("load", function (e) {
  if (newImage.value === "" || newImage.value === null) {
    errFile.innerText = "File field can't be empty";
  } else {
    errFile.innerText = "";
  }
});
newCategory.addEventListener("blur", function (e) {
  if (newCategory.value === "" || newCategory.value === null) {
    errCategory.innerText = "Category field can't be empty";
  } else {
    errCategory.innerText = "";
  }
});
newContents.addEventListener("blur", function (e) {
  if (newContents.value === "" || newContents.value === null) {
    newContents.value = "Contents field can't be empty";
  } else if (newContents.value.length < 100) {
    newContents.value +=
      "Article contents may be atleast more than 100 characters";
  } else {
    newContents.value;
  }
});
newTime.addEventListener("blur", function (e) {
  if (newTime.value === "" || newTime.value === null) {
    errTime.innerText = "Date field can't be empty";
  } else {
    errTime.innerText = "";
  }
});
newAuthor.addEventListener("blur", function (e) {
  console.log(newAuthor.value);
  if (newAuthor.value === "" || newAuthor.value === null) {
    errAuthor.innerText = "Author field can't be empty";
  } else {
    errAuthor.innerText = "";
  }
});
newArticleForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newArticleData = new FormData(newArticleForm);
  const newArticleObj = {};
  for (let fields of newArticleData) {
    newArticleObj[fields[0]] = fields[1];
  }
  newArticleObj.File = uploadedImageUrl;
  console.log(newArticleObj.File);
  console.log(newArticleObj);

  addDoc(collection(db, "articles"), newArticleObj);
  const newData = document.createElement("ul");
  newData.classList.add("dashHeader");
  newData.innerHTML = `
    <li id="ide">${firebaseArticles.length + 1}</li>
    <li>${newArticleObj.title}</li>
    <li>${newArticleObj.writter}</li>
    <li class="forId">${newArticleObj.articleDetails}</li>
    <li>${newArticleObj.date}</li>
    <li>Edit</li>
    <li>Delete</li>

    `;

  //   // const displaySection = document.querySelector(".displaySection");
  //   localArticles.appendChild(newData);

  console.log("Article created ");
  newArticleForm.reset();
});

//  message Dom
document.addEventListener("DOMContentLoaded", async function (e) {
  e.preventDefault();
  const docSnap = await getDocs(collection(db, "messages"));

  docSnap.forEach((doc) => {
    firebaseMessages.push({ ...doc.data(), id: doc.id });
  });
  console.log("all messages from firebase:", firebaseMessages);
  for (let i = 0; i < firebaseMessages.length; i++) {
    console.log(firebaseMessages.length);
    messagesContainer.innerHTML += `<ul class="dashHeader">
    <li >${i + 1}</li>
    <li>${firebaseMessages[i].name}</li>
    <li>${firebaseMessages[i].email}</li>
    <li>${firebaseMessages[i].adress}</li>
    <li>${firebaseMessages[i].message}</li>
  
    </ul>
  
    `;
  }
});

for (let i = 0; i < newad.length; i++) {
  usersContainer.innerHTML += `<ul class="dashHeader"><li >${i + 1}</li>
    <li>${newad[i].name}</li>
    <li>${newad[i].username}</li>
    <li>${newad[i].password}</li>
    </ul>
    
    `;
}
