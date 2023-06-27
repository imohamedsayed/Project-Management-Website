let circularProgress = document.querySelector(".circular-progress"),
  progressValue = document.querySelector(".progress-value");

async function getUserPerformance() {
  try {
    let res = await fetch("/performance", { method: "GET" });
    let data = await res.json();
    return Math.floor(data.performance);
  } catch (err) {
    console.log(err);
  }
}

getUserPerformance().then((data) => {
  let progressStartValue = 0,
    progressEndValue = data,
    speed = 100;
  let progress = setInterval(() => {
    if (progressEndValue == 0) {
      clearInterval(progress);
    } else {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#00ffc8 ${
        progressStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }
  }, speed);
});

async function getStats() {
  try {
    const res = await fetch("/projects/stats", { method: "GET" });
    const data = await res.json();

    return data.stats;
  } catch (err) {
    console.log(err);
  }
}

getStats().then((stats) => {
  document.querySelector("p.ctr.total").dataset.ctr = stats.total_projects;
  document.querySelector("p.ctr.inprogress").dataset.ctr =
    stats.inprogress_projects;
  document.querySelector("p.ctr.notCompleted").dataset.ctr =
    stats.not_completed;
  document.querySelector("p.ctr.completed").dataset.ctr =
    stats.completed_projects;

  const pCtr = document.querySelectorAll("p.ctr");
  pCtr.forEach((c) => {
    increaseCounter(c);
  });
});

function increaseCounter(c) {
  let v = c.dataset.ctr;
  let counter = 0;
  var interval = setInterval(() => {
    c.innerHTML = counter;
    if (counter == v) {
      clearInterval(interval);
    }
    counter++;
  }, 200);
}
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

/* 
  ->>>> Tasks 
*/

const taskContainer = document.querySelector(".tasks-container");

async function getTasks() {
  try {
    const res = await fetch("/projects/runningTasks", { method: "GET" });
    const data = await res.json();
    return data.tasks;
  } catch (err) {
    console.log(err);
  }
}

getTasks()
  .then((tasks) => {
    if (tasks.length) {
      tasks.forEach((task) => {
        taskContainer.innerHTML += ` <div class="task mb-3">
      <input type="checkbox" ${task.completed ? "checked" : ""} data-id='${
          task._id
        }'/>
      <span>${task.name}</span>
    </div>`;
      });
    } else {
      taskContainer.innerHTML +=
        '<div class="alert alert-info">You have no tasks yet click on the <i class="fa-regular fa-square-plus"></i> on the top right to to add a new tasks</div>';
    }
  })
  .then((_) => {
    let completeStatus = document.querySelectorAll("input[type='checkbox']");
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
  });

async function todaySchedules() {
  try {
    let res = await fetch("/todaySchedules", { method: "GET" });

    const data = await res.json();

    return data.schedules;
  } catch (err) {
    console.log(err);
  }
}

todaySchedules().then((schedules) => {
  let schedulesContainer = document.querySelector(".schedule-list-container");
  if (schedules.length) {
    schedules.forEach((schedule) => {
      const li = document.createElement("li");
      li.classList.add("d-flex");
      li.classList.add("justify-content-between");
      li.innerHTML = `<span>${schedule.name}</span><span><i class="fa-regular fa-clock me-1"></i>${schedule.from} : ${schedule.to}</span>`;
      schedulesContainer.appendChild(li);
    });
  } else {
    schedulesContainer.innerHTML =
      '<div class="alert alert-info">you have no schedules today</div>';
  }
});
