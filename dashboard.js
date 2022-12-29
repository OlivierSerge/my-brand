// newarticle Doms

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

document.addEventListener("DOMContentLoaded", (e) => {
  // alert("hello World");

  if (signedIn.length === null || signedIn.length === 0 || signedIn === []) {
    alert("you must sign in");
    location.href = "index.html";
  }
});
modalCloseBtn.addEventListener("click", (e) => {
  newArticleForm.style.visibility = "hidden";
});
addNewArticle.addEventListener("click", (e) => {
  newArticleForm.style.visibility = "visible";
});

// document.addEventListener("DOMContentLoaded", (e) => {
//   displayArticles();
// });
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
  alert("hellooo");
  const newArticleData = new FormData(newArticleForm);
  const newArticleObj = {};
  for (let fields of newArticleData) {
    newArticleObj[fields[0]] = fields[1];
  }
  console.log(newArticleObj);
  const allArticles = JSON.parse(localStorage.getItem("articles"));
  if (allArticles === null) {
    localStorage.setItem("articles", JSON.stringify([newArticleObj]));
  } else {
    const savedArticles = JSON.parse(localStorage.getItem("articles"));
    savedArticles.push(newArticleObj);
    localStorage.setItem("articles", JSON.stringify(savedArticles));
    // const allArticles = JSON.parse(localStorage.getItem("articles"));
  }
  const newData = document.createElement("ul");
  newData.classList.add("dashHeader");
  newData.innerHTML = `
  <li id="ide">${allArticles.length + 1}</li>
  <li>${newArticleObj.title}</li>
  <li>${newArticleObj.writter}</li>
  <li class="forId">${newArticleObj.articleDetails}</li>
  <li>${newArticleObj.date}</li>
  <li>Edit</li>
  <li>Delete</li>
  
  `;

  // const displaySection = document.querySelector(".displaySection");
  localArticles.appendChild(newData);

  alert("Message submitted ");
  newArticleForm.reset();
});

//  message Dom
// for (let i = 0; i < localClientMessages.length; i++) {
//   messagesContainer.innerHTML += `<ul class="dashHeader">
//   <li >${i + 1}</li>
//   <li>${localClientMessages[i].name}</li>
//   <li>${localClientMessages[i].email}</li>
//   <li>${localClientMessages[i].adress}</li>
//   <li>${localClientMessages[i].message}</li>

//   </ul>

//   `;
// }
//
for (let i = 0; i < newad.length; i++) {
  usersContainer.innerHTML += `<ul class="dashHeader"><li >${i + 1}</li>
    <li>${newad[i].name}</li>
    <li>${newad[i].username}</li>
    <li>${newad[i].password}</li>
    </ul>
    
    `;
}

for (let i = 0; i < UpdatedArticles.length; i++) {
  localArticles.innerHTML += `
    <ul class="dashHeader">
      <li >${i + 1}</li>
      <li>${UpdatedArticles[i].editor}</li>
      <li>${UpdatedArticles[i].title}</li>
      <li class="forId">${UpdatedArticles[i].articleDetails}</li>
      <li>${UpdatedArticles[i].date}</li>
      <li>Edit</li>
      <li>Delete</li>
      </ul>
      `;
}
