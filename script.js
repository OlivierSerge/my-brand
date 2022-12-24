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

const errDiv = document.createElement("div");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("login button is clicked");
  console.log(userName.value);
  console.log(userPassword.value);
  // location.replace("dashboard.html");
  for (let i = 0; i < localAdmins.length; i++) {
    //   userName.onchange = function () {};
    if (
      userName.value === localAdmins[i].username &&
      userPassword.value === localAdmins[i].password
    ) {
      console.log("nahageze----");
      location.replace("dashboard.html");
      return;
      //     window.open = ("dashboard.html", "_blank");
      //     alert(userName.value);
    }
  }
  alert("Invalid credentials uuuuuu");
});

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("hellooo e");
  const formContents = new FormData(formData);
  const messageData = {};
  for (let fields of formContents) {
    console.log(fields, "yuuuuuu");
    messageData[fields[0]] = fields[1];
  }
  console.log(messageData);
  localStorage.setItem("messageData", JSON.stringify(messageData));
  alert("Message submitted ");
  formData.reset();
});
// FormData.addEventListener("submit", function (e) {});
names.addEventListener("blur", function (e) {
  console.log("changes are made");
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
