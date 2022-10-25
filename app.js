const body = document.body;
const header = document.createElement("div");
header.setAttribute("id", "header");
const main = document.createElement("div");
main.setAttribute("id", "main");
body.appendChild(header);
body.appendChild(main);

buildHeader();

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => createTable(json));

function buildHeader() {
  let header = document.getElementById("header");
  let homeButton = document.createElement("button");
  homeButton.textContent = "Home";
  homeButton.type = "button";
  homeButton.onclick = returnHome;
  homeButton.onClick = header.appendChild(homeButton);
}

function getPosts(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.json())
    .then((json) => createPosts(json));
}

function returnHome() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => createTable(json));
}

function createTable(json) {
  const main = document.getElementById("main");
  main.textContent = "";
  const table = document.createElement("div");
  for (let i = 0; i < json.length; i++) {
    let element = createNewTableElement(json[i]);
    table.appendChild(element);
  }
  main.append(table);
}

function createPosts(json) {
  const main = document.getElementById("main");
  main.textContent = "";
  const table = document.createElement("div");
  for (let i = 0; i < json.length; i++) {
    let element = createNewPostElement(json[i]);
    table.appendChild(element);
  }
  main.append(table);
}

function createNewTableElement(obj) {
  let row = document.createElement("div");
  const name = document.createTextNode(obj.name);
  row.addEventListener("click", function () {
    getPosts(obj.id);
  });
  row.appendChild(name);
  return row;
}

function createNewPostElement(obj) {
  let row = document.createElement("div");
  const name = document.createTextNode(obj.title);
  row.appendChild(name);
  return row;
}
