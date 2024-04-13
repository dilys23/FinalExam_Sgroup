var modal = document.getElementById("myModal");
var btn = document.querySelector("#editTask");
var btnSave = document.getElementById("save");
var span = document.getElementsByClassName("close")[0];
// let isEditing = false;
let editingIndex = -1;


function openModal(i) {
  overlayer.classList.add("pop");
  isEditing = true;
  editingIndex = i;
  console.log("Modal clicked");
  modal.style.display = "block";
  const categoryText = tasksArray[i].category;
  const titleText = tasksArray[i].title;
  const contentText = tasksArray[i].content;
  const statusText = tasksArray[i].status;
  const categoryInput = document.getElementById("titleTaskModal");
  const titleInput = document.getElementById("detailTaskModal");
  const contentInput = document.getElementById("contentModal");
  const statusRadios = document.querySelectorAll(`.task-type input[type=radio]`);
  categoryInput.value = categoryText;
  titleInput.value = titleText;
  contentInput.value = contentText;
  statusRadios.forEach(function (radio) {
    if (radio.id === statusText) {
      radio.checked = true;

    }
  });
  console.log("1. take data from form: ", categoryInput.value, titleInput.value, contentInput.value);
  statusRadios.forEach(function (radio) {
    radio.addEventListener("click", function () {
      statusRadios.forEach(function (r) {
        r.checked = false;
      });
      this.checked = true;
    });
  });
}

function closeModal() {
  modal.style.display = "none";
  overlayer.classList.remove("pop");
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    overlayer.classList.remove("pop");
  }
};

function saveModal() {
  event.preventDefault();
  var categoryInput = document.getElementById("titleTaskModal").value;
  var titleInput = document.getElementById("detailTaskModal").value;
  var contentInput = document.getElementById("contentModal").value;
  var now = new Date();
  var datetime = now.toLocaleString();

  var statusInput = document.querySelector(".task-type input[type=radio]:checked");
  var status = statusInput ? statusInput.id : "todo"; // Mặc định là "todo" nếu không có radio được chọn

  console.log("2. take data from modal: ", categoryInput, titleInput, contentInput, status, datetime);

  if (!categoryInput || !titleInput || !contentInput || !status) {
    alert("Please select information");
    setTimeout(() => {
      errors.style.display = "block";
    }, 200);
  } else {
    updateTask(categoryInput, titleInput, contentInput, status, datetime, editingIndex);
    isEditing = false;
    editingIndex = -1;
    displayTasks();
  }
  overlayer.classList.remove("pop");
  modal.style.display = "none";
  location.reload();
}

function updateTask(category, title, content, status, datetime, i) {
  tasksArray[i].category = category;
  tasksArray[i].title = title;
  tasksArray[i].content = content;
  tasksArray[i].status = status;
  tasksArray[i].datetime = datetime;
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  displayTasks();
}