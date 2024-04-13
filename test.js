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

const tasksArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
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
    status: "to do",
    datetime: datetime,
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
  tasksArray[i].status = "to do";
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
  let tasksHTML = "";
  for (let i = 0; i < tasksArray.length; i++) {
    const task = tasksArray[i];
    tasksHTML += `
  <div class="child-task todo" draggable="true"  id="${i}"  ondragstart="drag(event)" >
    <div class="task-group">
      <div class="task-top">
        <div class="content">
          <p>${task.category}</p>
          <h4>${task.title}</h4>
        </div>
        <div class="btn-group">
        <button type="button" class="btn-edit">
          <i class='bx bx-edit-alt'></i>
          </button>
          <button type= "button" class = "btn-delete">
          <i class='bx bx-trash-alt'></i></button>
        </div>
      </div>
      <div class="task-bottom">
        <div class="line"></div>
        <p class="describe">${task.content}</p>
        <div class="time">
          <i class='bx bx-time'></i>
          <span id= "datetime">${task.datetime}</span>
        </div>
      </div>
    </div>
  </div>`;
  }
  document.querySelector(".box-task").innerHTML = tasksHTML;
  activateDeleteListeners();
  activateEditListeners() ;
  popremove();
}
window.onload = function () {
  // displayDate()
  displayTasks();
};

//drag & drop 
function allowDrop(ev)
{
  ev.preventDefault();
}
function drag(ev)
{
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev, status)
{
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  tasksArray[data].status = status;
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
  ev.target.appendChild(document.getElementById(data));
}

function activateDeleteListeners()
{
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
  // location.reload()
  displayTasks();
 
}
function activateEditListeners() {
  const editBtns = document.querySelectorAll(".btn-edit");
  console.log("nhấn btn edit");
  pop();
  editBtns.forEach((editBtn, i) => {
    editBtn.addEventListener("click", () => {
      // Lấy nội dung của task tương ứng
      const categoryText = tasksArray[i].category;
      const titleText = tasksArray[i].title;
      const contentText = tasksArray[i].content;
     
      const categoryInput = document.querySelector(".category"); // hoặc "#categoryInput" nếu sử dụng id
      const titleInput = document.querySelector(".title"); // hoặc "#titleInput" nếu sử dụng id
      const contentInput = document.querySelector(".contentTask"); // hoặc "#contentInput" nếu sử dụng id
      
      categoryInput.value = categoryText;
      titleInput.value = titleText;
      contentInput.value = contentText;

      isEditing = true;

      const  category = categoryInput.value.trim();
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      
      // const editBtn = document.querySelector('.btn-edit');

      const editTaskHandler = function () {
        const errors = document.querySelector("#error");
        errors.style.display = "none";
        if (!category  || !title || !content) {
          setTimeout(() => {
            errors.style.display = "block";
          }, 200);
        } else {
          updateTask(categoryInput.value,titleInput.value, contentInput.value, i);
          categoryInput.value = "";
          titleInput.value = "";
          contentInput.value = "";
          // enterBtn.textContent = "Enter";
          // enterBtn.id = "enter";
          isEditing = false;
          editBtn.removeEventListener("click", editTaskHandler);
        }
      };

      editBtn.addEventListener("click", editTaskHandler);
    });
  });
}


function updateTask(category, title, content, i) {
  console.log("category: " + category);
  tasksArray[i].category = category;
  console.log("title: " + title);
  tasksArray[i].title = title;
  console.log("content: " + content);
  tasksArray[i].content = content;
  console.log("i" + i);
  console.log(tasksArray);
  console.log("tasksArray[i].category: " + tasksArray[i].category + " " + "tasksArray[i].title: " + tasksArray[i].title + " " + "tasksArray[i].content: " + tasksArray[i].content + " " + i);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();

  // const enterBtn = document.querySelector(".btn-edit");
  // if (enterBtn) {
  //   enterBtn.textContent = "Enter";
  //   enterBtn.id = "enter";
  // }
}