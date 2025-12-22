let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const storedData = localStorage.getItem("tasks");

  if (storedData !== null) {
      return JSON.parse(storedData);
  } else {
      return items;
    }
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
	textElement.textContent = item;

	deleteButton.addEventListener("click", function() {
    clone.remove();                 
    items = getTasksFromDOM();    
    saveTasks(items);                 
	});

	duplicateButton.addEventListener("click", function() {
    const taskContent = textElement.textContent;           
    const newTask = createItem(taskContent);               
    listElement.prepend(newTask);                       
    items = getTasksFromDOM();                         
    saveTasks(items);                                  
});

	editButton.addEventListener("click", function() {
    textElement.contentEditable = true;
    textElement.focus();
  });

  textElement.addEventListener("blur", function() {
    textElement.contentEditable = false;
    items = getTasksFromDOM();
    saveTasks(items);
  });

	return clone;
}

function getTasksFromDOM() {
	const taskElements = document.querySelectorAll(".to-do__item-text");
	const taskList = [];
	taskElements.forEach(function(element) {
    taskList.push(element.textContent);
});
	return taskList;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(function(item) {
	const taskElement = createItem(item);
	listElement.append(taskElement);
});

formElement.addEventListener("submit", function(evt) {
    evt.preventDefault();
    const taskText = inputElement.value.trim();
    
    if (taskText === "") {
        return;
    }
    
    const taskElement = createItem(taskText);
    listElement.prepend(taskElement);
    items = getTasksFromDOM(); 
    saveTasks(items);
    formElement.reset();
});
