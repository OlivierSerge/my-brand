import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

const admins = [
  { name: "peter Mugabo", username: "MugaboP", password: "1234" },
  { name: "Olivier Serge", username: "olivis", password: "12345" },
  { name: "Aline Mutesi", username: "AlineM", password: "123456" },
];

window.localStorage.setItem("users", JSON.stringify(admins));
const localAdmins = JSON.parse(window.localStorage.getItem("users"));

const names = document.getElementById("names");
const errNames = document.getElementById("errNames");
const email = document.getElementById("email");
const errEmail = document.getElementById("errEmail");
const formData = document.getElementById("contactMeForm");
const userMessage = document.getElementById("messageContents");
const errMessages = document.getElementById("errMessages");
const userAdress = document.getElementById("adress");
const errAdress = document.getElementById("errAdress");
const userName = document.getElementById("loginEmai");
const errUserName = document.getElementById("errUsername");
const userPassword = document.getElementById("loginPassword");
const errPassword = document.getElementById("errPassword");
const loginButton = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const cvButton = document.getElementById("cvBtn");
const signedIn = [];
const readMore = document.querySelector("#readMore");
const clientSideblogParagraph = document.querySelector("#articleTexts");
const hamburgerIcon = document.querySelector("#hamburg");
const mediaquery = window.matchMedia("(max-width: 425px)");
const firebaseMessages = [];

window.addEventListener("DOMContentLoaded", async function (e) {
  e.preventDefault();
  const docSnap = await getDocs(collection(db, "messages"));

  docSnap.forEach((doc) => {
    firebaseMessages.push({ ...doc.data(), id: doc.id });
  });
  console.log("all messages from firebase:", firebaseMessages);
});

readMore.addEventListener("click", (e) => {
  // console.log(UpdatedArticles);
  // for (let i = 0; i < UpdatedArticles.length; i++) {
  //   clientSideblogParagraph.innerText += UpdatedArticles[i];
  // }

  clientSideblogParagraph.innerText += UpdatedArticles[6].editor;
});

Toastify({
  text: "Welcome",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function () {}, // Callback after click
}).showToast();

hamburgerIcon.addEventListener("click", (e) => {
  e.preventDefault();

  const navMenu = document.getElementById("navMenu");
  if (navMenu.style.display === "none" && mediaquery.matches) {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});
cvButton.addEventListener("click", (e) => {
  window.open("http://olivierserge.github.io/OlivierCV/", "_blank");
});
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  for (let i = 0; i < localAdmins.length; i++) {
    if (
      userName.value === localAdmins[i].username &&
      userPassword.value === localAdmins[i].password
    ) {
      signedIn.push(localAdmins[i]);
      localStorage.setItem("signedInAccounts", JSON.stringify(signedIn));
      console.log("welcome" + localAdmins[i].username);
      location.replace("dashboard.html");
      return;
    }
  }
  location.replace("index.html");
  console.log("Invalid credentials no such data found");
});

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  const formContents = new FormData(formData);
  const messageData = {};
  for (let fields of formContents) {
    messageData[fields[0]] = fields[1];
  }
  addDoc(collection(db, "messages"), messageData);
  console.log("Message submitted ");
  formData.reset();
});
names.addEventListener("blur", function (e) {
  if (names.value.length > 20) {
    alert("hello");
    errNames.style.color = "red";
    errNames.innerText = "must be not longer than 20chters";
  } else if (names.value === "" || names.value === null) {
    errNames.style.color = "red";
    errNames.innerText = "must not be left blank";
  } else {
    names.innerText = names.value;
    errNames.innerText = "";
  }
});

email.addEventListener("blur", function (e) {
  if (!email.value.endsWith("@gmail.com")) {
    errEmail.style.color = "red";
    errEmail.innerText = "must contain @gmail.com!!!!";
  }
  if (
    (email.value === "" || userAdress.value === null) &&
    !email.value.endsWith("@gmail.com")
  ) {
    email.style.color = "red";
    errEmail.innerText =
      "must not be left blank and must contain @gmail.com!!!!";
  } else {
    errEmail.innerText = "";
  }
});
userAdress.addEventListener("blur", function (e) {
  if (userAdress.value === "" || userAdress.value === null) {
    userAdress.style.color = "red";
    errAdress.innerText = "must not be left blank";
  } else {
    errAdress.innerText = "";
  }
});
userMessage.addEventListener("blur", function (e) {
  if (userMessage.value.length < 50) {
    errMessages.style.color = "red";
    errMessages.innerText = "must not exceed 50 characters";
  } else if (userMessage.value === "" || userMessage.value === null) {
    alert("No");
    errMessages.innerText = "This field is mandaory, must not be left empty";
  } else {
    errMessages.innerText = "";
  }
});
userName.addEventListener("blur", function (e) {
  if (userName.value.length > 15) {
    errUserName.innerText = "characters length<15";
  } else if (userName.value === "" || userName.value === null) {
    errUserName.innerText = "This field can't be blank";
  } else {
    errUserName.innerText = "";
  }
});
userPassword.addEventListener("blur", function (e) {
  if (userPassword.length > 15) {
    errPassword.style.color = "red";
    errPassword.innerText = "characters length<15";
  } else if (userPassword.value === "" || userName.value === null) {
    errPassword.style.color = "red";
    errPassword.innerText = "This field can't be blank";
  } else {
    errPassword.innerText = "";
  }
});
