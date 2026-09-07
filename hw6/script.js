import ToDoItem from "./ToDoItm.js"

const container = document.getElementById("containerOfPage");
const listGroup = document.getElementById("listGroup");
const inputField = document.getElementById("inputField");
const form = document.getElementById("form");
let toDoItems = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();
    addToDoItem();
});

function addToDoItem(){
    let title = inputField.value.trim();
    if (title.length === 0){
        return;
    }
    let toDoItem = createToDoItem(title);
    inputField.value = "";
    addListGroupItemToPage(toDoItem);
}

/**
 * @param {String} title
 */
function createToDoItem(title) {
    let toDoItem = new ToDoItem(title);
    toDoItems.push(toDoItem);
    return toDoItem;
}

/**
 * @param {ToDoItem} toDoItem
 */
function addListGroupItemToPage(toDoItem) {
    const htmlString = getToDoItemTemplate(toDoItem);
    listGroup.insertAdjacentHTML('beforeend', htmlString);
}

/**
 * @param {ToDoItem} item
 */
function getToDoItemTemplate(item) {
    return `
        <a href="#" class="list-group-item list-group-item-action p-3" id="${item.id}">
            <div class="d-flex w-100 justify-content-between align-items-start mb-2">
                <h5 class="mb-0">${item.title}</h5>
                <span class="badge text-bg-primary rounded-pill ms-3 mt-1">${item.status}</span>
            </div>
            <div class="d-flex w-100 justify-content-between text-secondary">
                <small class="mb-1">Start: ${item.startDate.toLocaleDateString()} ${item.startDate.toLocaleTimeString()}</small>
            </div>
        </a>
    `;
}

/**
 * @param {Node} element
 */
function markItemAsDone(element){
    let taskId = Number(element.id);
    let toDoItem = findItem(taskId);
    if(toDoItem.status === "Done"){
        return;
    }
    toDoItem.setDone();
    updateElementDesignToDone(element, toDoItem);
}

/**
 * @param {number} id
 */
function findItem(id){
    return toDoItems.find(element => element.id === id);
}

/**
 * @param {ToDoItem} toDoItem
 */
function updateElementDesignToDone(element, toDoItem){
    let badge = element.querySelector('.badge');
    badge.innerText = toDoItem.status;
    let badgeClasses = badge.classList;
    badgeClasses.replace("text-bg-primary", "text-bg-secondary");

    let taskText = element.querySelector('h5');
    let taskTextClasses = taskText.classList;
    taskTextClasses.add("text-decoration-line-through", "text-muted");

    const end = document.createElement("small");
    end.className = "mb-1";
    end.innerText = `End: ${toDoItem.endDate.toLocaleDateString()} ${toDoItem.endDate.toLocaleTimeString()}`;
    const secondRow = element.querySelector('.text-secondary');
    secondRow.appendChild(end);
}

listGroup.addEventListener("click", function(e){
    const clickedItem = e.target.closest('.list-group-item');
    if (!clickedItem) {
        return; 
    }
    markItemAsDone(clickedItem);
})