// Day 3 - Dynamic list with event delegation

var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var taskCount = document.getElementById("taskCount");

var count = 0;   // a real number, not a string

function updateCounter() {
  taskCount.textContent = count;
}

// Task 1: add a task
function addTask() {
  var text = taskInput.value.trim();
  if (text === "") {
    return;   // ignore empty input
  }

  var item = document.createElement("li");
  var label = document.createElement("span");
  label.textContent = text;

  // Task 2: every task gets a Delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  item.appendChild(label);
  item.appendChild(deleteBtn);
  taskList.appendChild(item);

  taskInput.value = "";
  count = count + 1;   // Fix 1: adds numbers (count += "1" would join text like "01")
  updateCounter();
}
addBtn.addEventListener("click", addTask);

// Task 2: event delegation - ONE listener on the parent list handles every Delete button
// Fix 3: the listener is on taskList, which already exists, so it also works for
// tasks that are created later (listeners on each button would have to wait for the items).
taskList.addEventListener("click", function (event) {
  if (event.target.className === "delete-btn") {
    event.target.parentElement.remove();
    count = count - 1;
    updateCounter();   // Fix 2: the counter is updated after every delete
  }
});
