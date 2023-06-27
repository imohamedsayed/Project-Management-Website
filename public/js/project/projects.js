const todayTasksContainer = document.querySelector(".today-tasks"),
  InProgressTasksContainer = document.querySelector(".inprogress-tasks"),
  completedTasksContainer = document.querySelector(".completed_tasks"),
  notCompletedTasksContainer = document.querySelector(".notcompleted-tasks");

var todayTasks = [],
  inProgressTasks = [],
  completedTasks = [],
  notCompletedTasks = [];

// Display tasks
async function displayAllTasks() {
  await getToadyTasks();
  showTodayTasks();

  await getInProgressTasks();
  showInProgressTasks();

  await getCompletedTasks();
  showCompletedTasks();

  await getNotCompletedTasks();
  showNotCompletedTasks();
}

// Get tasks
async function getToadyTasks() {
  try {
    let res = await fetch("/projects/today");
    const data = await res.json();
    if (data.projects.length) {
      todayTasks = data.projects;
    }
  } catch (err) {
    console.log(err);
  }
}
async function getCompletedTasks() {
  try {
    let res = await fetch("/projects/completed");
    const data = await res.json();
    if (data.projects.length) {
      completedTasks = data.projects;
    }
  } catch (err) {
    console.log(err);
  }
}
async function getNotCompletedTasks() {
  try {
    let res = await fetch("/projects/notCompleted");
    const data = await res.json();
    if (data.projects.length) {
      notCompletedTasks = data.projects;
    }
  } catch (err) {
    console.log(err);
  }
}
async function getInProgressTasks() {
  try {
    let res = await fetch("/projects/inprogress");
    const data = await res.json();
    if (data.projects.length) {
      inProgressTasks = data.projects;
    }
  } catch (err) {
    console.log(err);
  }
}
// Display functions
function showTodayTasks() {
  if (todayTasks.length) {
    todayTasks.forEach((task) => {
      todayTasksContainer.innerHTML += `
    <div class="today-task task-box mb-2">
      <div class="info d-flex justify-content-between p-2">
        <span class="date">Today</span>
        <a href="/projects/edit/${task._id}" class="browse"
          ><i class="fa-solid fa-up-right-from-square"></i
        ></a>
      </div>
      <div class="task-name mt-3 mb-2">
        <p>${task.name}</p>
      </div>
      <div class="time px-4">
        <span class="time-hours text-muted">
        <i class="me-1 fa-regular fa-clock"></i>
        ${new Date(task.date).getHours() % 12}:${new Date(
        task.date
      ).getMinutes()}${
        new Date(task.date).getHours() > 12 ? "pm" : "am"
      } </span>
      </div>
      <div class="status d-flex align-items-center g-2">
        <input type="checkbox" title="mark as completed" class="me-3" name="completed" data-id='${
          task._id
        }' ${task.completed ? "checked" : " "} />

        <a  class="text-danger delete-project" data-doc="${
          task._id
        }"   style="font-size:1.3rem"><i class="fa-solid fa-trash"></i></a>
      </div>
    </div>
    `;
    });
  } else {
    todayTasksContainer.innerHTML =
      "<div class='alert alert-info'>There are no projects for today</div>";
  }
}
function showInProgressTasks() {
  if (inProgressTasks.length) {
    inProgressTasks.forEach((task) => {
      InProgressTasksContainer.innerHTML += `
    <div class="inProgress-task task-box mb-2">
      <div class="info d-flex justify-content-between p-2">
        <span class="date">${task.date.substring(
          0,
          task.date.indexOf("T")
        )}</span>
        <a href="/projects/edit/${task._id}" class="browse"
          ><i class="fa-solid fa-up-right-from-square"></i
        ></a>
      </div>
      <div class="task-name mt-3 mb-2">
        <p>${task.name}</p>
      </div>
      <div class="time px-4">
        <span class="time-hours text-muted">
        <i class="me-1 fa-regular fa-clock"></i>
        ${new Date(task.date).getHours() % 12}:${new Date(
        task.date
      ).getMinutes()}${
        new Date(task.date).getHours() > 12 ? "pm" : "am"
      } </span>
      </div>
  
      <div class="status d-flex align-items-center g-2">
       <input type="checkbox" class="me-2" title="mark as completed" name="completed" data-id='${
         task._id
       }' ${task.completed ? "checked" : " "} />

        <a  class="text-danger delete-project" data-doc="${
          task._id
        }" style="font-size:1.3rem"><i class="fa-solid fa-trash"></i></a>
      </div>
    </div>
    `;
    });
  } else {
    InProgressTasksContainer.innerHTML =
      "<div class='alert alert-info'>There are no projects inprogress</div>";
  }
}
function showCompletedTasks() {
  if (completedTasks.length) {
    completedTasks.forEach((task) => {
      completedTasksContainer.innerHTML += `
    <div class="Completed-task task-box mb-2">
      <div class="info d-flex justify-content-between p-2">
        <span class="date">${task.date.substring(
          0,
          task.date.indexOf("T")
        )}</span>
       
      </div>
      <div class="task-name mt-3 mb-2">
        <p>${task.name}</p>
      </div>
      <div class="time px-4">
        <span class="time-hours text-muted">
        <i class="me-1 fa-regular fa-clock"></i>
        ${new Date(task.date).getHours() % 12}:${new Date(
        task.date
      ).getMinutes()}${
        new Date(task.date).getHours() > 12 ? "pm" : "am"
      } </span>
      </div>
      <div class="status d-flex align-items-center g-2">
        <input type="checkbox" class="me-2" title="mark as completed" name="completed" checked disabled/>

        <a  class="text-danger delete-project" data-doc="${
          task._id
        }" style="font-size:1.3rem"><i class="fa-solid fa-trash"></i></a>
      </div>
    </div>
    `;
    });
  } else {
    completedTasksContainer.innerHTML =
      "<div class='alert alert-info'>There is no completed projects</div>";
  }
}
function showNotCompletedTasks() {
  if (notCompletedTasks.length) {
    notCompletedTasks.forEach((task) => {
      notCompletedTasksContainer.innerHTML += `
    <div class="notCompleted-task task-box mb-2">
      <div class="info d-flex justify-content-between p-2">
        <span class="date">${task.date.substring(
          0,
          task.date.indexOf("T")
        )}</span>
        
      </div>
      <div class="task-name mt-3 mb-2">
        <p>${task.name}</p>
      </div>
      <div class="time px-4">
        <span class="time-hours text-muted">
        <i class="me-1 fa-regular fa-clock"></i>
        ${new Date(task.date).getHours() % 12}:${new Date(
        task.date
      ).getMinutes()}${
        new Date(task.date).getHours() > 12 ? "pm" : "am"
      } </span>
      </div>
      <div class="status d-flex align-items-center g-2">
        <i class="fa-solid fa-xmark text-danger me-2 fs-4" title='not completed'></i>

        <a  class="text-danger delete-project" data-doc="${
          task._id
        }" style="font-size:1.3rem"><i class="fa-solid fa-trash"></i></a>
      </div>
    </div>
    `;
    });
  } else {
    notCompletedTasksContainer.innerHTML =
      "<div class='alert alert-success'>Good, you haven't yet any incomplete projects</div>";
  }
}

displayAllTasks()
  .then(() => {
    let completeStatus = document.querySelectorAll(".status input");
    completeStatus.forEach((input) => {
      input.addEventListener("change", async (e) => {
        try {
          await fetch(`/project/${input.dataset.id}`, {
            method: "PUT",
            body: JSON.stringify({
              status: input.checked,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
  })
  .then((_) => {
    let allDeleteLinks = document.querySelectorAll("a.delete-project");

    allDeleteLinks.forEach((link) => {
      link.addEventListener("click", async (e) => {
        try {
          let res = await fetch(`/project/${link.dataset.doc}`, {
            method: "DELETE",
          });

          e.target.parentNode.parentNode.parentNode.remove();
        } catch (err) {
          console.log(err);
        }
      });
    });

    let deleteAllBtn = document.querySelector(".btn.delete-all"),
      allTasks = document.querySelectorAll(".task-box");
    deleteAllBtn.addEventListener("click", async () => {
      await fetch("/projects", { method: "DELETE" });
      allTasks.forEach((task) => {
        task.remove();
      });
    });
  });
