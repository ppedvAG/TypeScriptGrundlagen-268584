import "./style.css";


// // Grundlagen Übung TODO Liste
// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

// <h1>Hello Todo-List!</h1>
//   <ul id="list"></ul>

//   <form action="">
//     <label>Aufgabe</label>
//     <input type="text" id="task"><br/>
//     <button id="submit">Neue Aufgabe</button>
//   </form>
// `;

// const todoList = document.getElementById("list") as HTMLUListElement;
// const taskInput = document.getElementById("task") as HTMLInputElement;
// const submitButton = document.getElementById("submit") as HTMLButtonElement;

// submitButton!.addEventListener("click", function (e) {
//   // Default submit action des Forms verhindern
//   // was einen Server Request ausloest
//   e.preventDefault();

//   const listItem = document.createElement("li");
//   listItem.innerText = taskInput.value;
//   todoList.appendChild(listItem);
// });


// Typsicherheit
// Unterschied Interface und Type

type User =  {
  name: string;
  age: number;
  email: string;
}

interface IUser {
  name: string;
  age: number;
  email: string;
}
// interfaces kann man vererben typen nicht
interface AdminUser extends IUser {
  phone: number;
}

const AdminErwin: AdminUser = {
  name: "Erwin",
  age: 40,
  email: "asdf",
  phone: 1234
}

const Dominik : User = {
  name: "Dominik",
  age: 40,
  email: "asdf"
}



