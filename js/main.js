const overlayer = document.querySelector(".overlayer");
const box = document.querySelector(".box");

function pop() {
  overlayer.classList.add("pop");
  box.classList.add("pop");
  console.log("hàm pop được thực thi");
}

function popremove() {
  overlayer.classList.remove("pop");
  box.classList.remove("pop");
}

const tasksArray = localStorage.getItem("tasks") ?
  JSON.parse(localStorage.getItem("tasks")) :
  [];
const count = document.querySelectorAll(".count-value");
let taskCount = 0;
let isEditing = false;

function createTask(category, title, content) {
  var now = new Date();
  var datetime = now.toLocaleString();

  // Insert date and time into HTML

  const newTask = {
    category: category,
    title: title,
    content: content,
    status: "todo",
    datetime: datetime,
    position: tasksArray.length,
  };
  tasksArray.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
}

function markAsDoing(i) {
  tasksArray[i].status = "doing";
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
}

function markAsComplete(i) {
  tasksArray[i].status = "completed";
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
}

function markAsTodo(i) {
  tasksArray[i].status = "todo";
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
}

function markAsBlock(i) {
  tasksArray[i].status = "blocked";
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
}

document.querySelector("#enter").addEventListener("click", (e) => {
  const categoryInput = document.querySelector(".category");
  const category = categoryInput.value.trim();
  const titleInput = document.querySelector(".title");
  const title = titleInput.value.trim();
  const contentInput = document.querySelector(".contentTask");
  const content = contentInput.value.trim();
  const error = document.querySelector(".error");
  if (!category || !title || !content || isEditing) {
    // Xử lý lỗi ở đây nếu cần
  } else {
    createTask(category, title, content);
    categoryInput.value = "";
    titleInput.value = "";
    contentInput.value = "";
  }
  e.preventDefault();
});

function displayTasks() {
  tasksArray.forEach((task, i) => {
    const taskHTML = `
      <div class="child-task ${task.status}" draggable="true" id="${i}" ondragstart="drag(event)">
        <div class="task-group">
          <div class="task-top">
            <div class="content">
              <p id="titleTask">${task.category}</p>
              <h4 id="detailTask">${task.title}</h4>
            </div>
            <div class="btn-group">
              <button type="button" class="btn-edit" onclick="openModal(${i})"> 
                <i class='bx bx-edit-alt' id="editTask"></i>
              </button>
              <button type="button" class="btn-delete">
                <i class='bx bx-trash-alt'></i>
              </button>
            </div>
          </div>
          <div class="task-bottom">
            <div class="line"></div>
            <p class="describe">${task.content}</p>
            <div class="time">
              <i class='bx bx-time'></i>
              <span id="datetime">${task.datetime}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.querySelector(`.box-task.${task.status}`).insertAdjacentHTML('beforeend', taskHTML);
  });

  activateDeleteListeners();
  popremove();
}



window.onload = function () {
  // displayDate()
  displayTasks();
};

//drag & drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, status) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  tasksArray[data].status = status;
  tasksArray[data].position = parseInt(ev.target.id);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
  ev.target.appendChild(document.getElementById(data));
  location.reload();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".btn-delete");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  tasksArray.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
 location.reload();
  displayTasks();
}