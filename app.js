const body = document.body;
const header = document.createElement("div");
header.setAttribute("id", "header");

const main = document.createElement("div");
main.setAttribute("id", "main");

body.appendChild(header);
body.appendChild(main);
//creates button so that home (users) can always be accessed
buildHeader();

//intial call to API for users, calls function to render them
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => createTable(json));

function buildHeader() {
  //creates button and attaches it to the header div,
  let header = document.getElementById("header");
  let homeButton = document.createElement("button");
  homeButton.textContent = "Home";
  homeButton.type = "button";
  homeButton.setAttribute("id", "homeButton");
  homeButton.onclick = returnHome;
  homeButton.onClick = header.appendChild(homeButton);
}

function getPosts(id) {
  //gets all posts by user id and then calls the createPosts function to render them
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.json())
    .then((json) => createPosts(json));
}

function returnHome() {
  //pulls all users from the API and then calls the function to recreate the home page
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => createTable(json));
}

function createTable(json) {
  //first deletes main
  const main = document.getElementById("main");
  main.textContent = "";
  //then creates the table and calls the function to create a new element for every user
  const table = document.createElement("div");
  table.classList.add("table");
  for (let i = 0; i < json.length; i++) {
    let element = createNewTableElement(json[i]);

    table.appendChild(element);
  }
  main.append(table);
}

function createPosts(json) {
  //first deletes main
  const main = document.getElementById("main");
  main.textContent = "";
  //then creates the table and calls the function to create a new element for every post
  const table = document.createElement("div");
  for (let i = 0; i < json.length; i++) {
    let element = createNewPostElement(json[i]);
    table.appendChild(element);
  }
  main.append(table);
}

function createNewTableElement(obj) {
  //RETURNS a new row element, not appended to DOM
  let row = document.createElement("div");
  row.classList.add("row");
  const name = document.createTextNode(obj.name);
  row.addEventListener("click", function () {
    getPosts(obj.id);
  });
  row.appendChild(name);
  return row;
}

function createNewPostElement(obj) {
  //RETURNS a new post element, not appended to DOM
  let row = document.createElement("div");
  row.classList.add("text_row");
  const name = document.createTextNode(obj.title);
  row.appendChild(name);
  return row;
}
