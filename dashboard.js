// newarticle Doms

const errors = document.getElementsByClassName("error");
const newad = JSON.parse(window.localStorage.getItem("users"));
const newArticleForm = document.getElementById("one");
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
  console.log(newArticleObj);
  const allArticles = localStorage.getItem("articles");
  if (allArticles === null) {
    localStorage.setItem("articles", JSON.stringify([newArticleObj]));
  } else {
    const savedArticles = JSON.parse(localStorage.getItem("articles"));
    savedArticles.push(newArticleObj);
    localStorage.setItem("articles", JSON.stringify(savedArticles));
  }
  const UpdatedArticles = JSON.parse(localStorage.getItem("articles"));
  const newData = document.createElement("ul");
  newData.classList.add("dashHeader");
  newData.innerHTML = `
  <li id="ide">${UpdatedArticles.length + 1}</li>
  <li>${UpdatedArticles[UpdatedArticles.length - 1].editor}</li>
  <li>${UpdatedArticles[UpdatedArticles.length - 1].title}</li>
  <li class="descripti">${
    UpdatedArticles[UpdatedArticles.length - 1].articleDetails
  }</li>
  <li>${UpdatedArticles[UpdatedArticles.length - 1].date}</li>
  <li>Edit</li>
  <li>Delete</li>
  
  `;
  const displaySection = document.querySelector(".displaySection");
  displaySection.appendChild(newData);

  alert("Message submitted ");
  newArticleForm.reset();
});
