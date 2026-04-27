import "./style.css";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  userId?: number;
  dueDate: Date|null;
  lables: string[];
};

const inputTypes = [
  "checkbox",
  "submit",
  "color",
  "date",
  "number",
  "search",
  "text"
] as const;
type InputType = (typeof inputTypes)[number];

type Priority = "important" | "default" | "low";

// Grundlagen Übung TODO Liste
// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <h1>Hello Todo-List!</h1>
//   <ul id="list"></ul>

//   <form action="">
//     <label>Aufgabe</label>
//     <input type="text" id="task">
//     <label>Fälligkeit</label>
//     <input type="date" id="due">
//     <label>Keywords</label>
//     <input type="text" id="labels" placeholder "Komma separierte Liste">
//     <label>Priorität</label>
//     <input type="number" min="0" max="2" value="1" id ="prio">
//     <br/>
//     <button id="submit">Neue Aufgabe</button>
//   </form>
// `;

const appRoot = document.querySelector<HTMLDivElement>("#app");
if(!appRoot)
  throw new Error("Root element not found");

createElement(appRoot, "h1", "Hello Todo-List!");
const todoList = createElement(appRoot, "ul");
const form = createElement(appRoot, "form") as HTMLFormElement;

createElement(form, "label", "Aufgabe");
const taskInput = createElement(form, "text", "Aufgabe eingeben");

createElement(form, "label", "Fälligkeit");
const dueInput = createElement(form, "date", "Fälligkeit eingeben");

createElement(form, "label", "Keywords");
const labelInput = createElement(form, "text", "Komma separierte Liste");

createElement(form, "label", "Priorität");
const prioNumber = createElement(form, "number", "Priorität eingeben");

createElement(form, "br");
const submitButton = createElement(form, "button", "Neue Aufgabe") as HTMLButtonElement;
submitButton.disabled = true;

const taskList: Task[] = [];
const prioMapper : {[key: number]: Priority} = ["low", "default", "important"];


taskInput.addEventListener("input", function (e) {
  submitButton.disabled = !taskInput.value;
})

submitButton!.addEventListener("click", function (e) {
  // Default submit action des Forms verhindern
  // was einen Server Request ausloest
  e.preventDefault();

  const task: Task = {
    id: taskList.length+1,
    userId: 0,
    title: taskInput.value,
    dueDate: dueInput.valueAsDate,
    lables: labelInput.value.split(","),
    completed: false,
    priority: prioMapper[prioNumber.valueAsNumber]
  };
  taskList.push(task);
  console.log(task)

  const listItem = createElement(todoList, "li");
  const checkbox =createElement(listItem, "checkbox");
 
  const text = createElement(listItem, "span", task.title);
 checkbox.addEventListener("click", function() {
    task.completed = checkbox.checked;
    // text.classList.toggle("completed");
    if (task.completed) text.style.color = "green";
    else text.style.color = "red"
  })
  form.reset();
  submitButton.disabled = true;
});



function createElement(
  parent: HTMLElement, 
  type: InputType, 
  placeholder?: string): HTMLInputElement;
function createElement(
  parent: HTMLElement, 
  tagName: keyof HTMLElementTagNameMap, 
  text?: string): HTMLElement;
function createElement(
  parent: HTMLElement, 
  typeOrTag: InputType | keyof HTMLElementTagNameMap, 
  textOrPlaceholder?: string): HTMLElement | HTMLInputElement {
    function isInputType(typeOrTag: string): typeOrTag is InputType {
      return inputTypes.includes(typeOrTag as InputType);
    }
    let element: HTMLElement|HTMLInputElement;
    if(isInputType(typeOrTag)) {
      element = document.createElement("input");
      (element as HTMLInputElement).type = typeOrTag;
      if(textOrPlaceholder) {
        (element as HTMLInputElement).placeholder = textOrPlaceholder;
      }
    } else {
      element = document.createElement(typeOrTag);
      if(textOrPlaceholder) {
        element.innerText = textOrPlaceholder;
      }
      
    }
     parent.appendChild(element);
     return element;
  }
