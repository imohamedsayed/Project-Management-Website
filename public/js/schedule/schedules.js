const tasksContainer = document.querySelector(".schedules-page .container");

async function bringSchedules() {
  try {
    let res = await fetch("/schedules/allSchedules", { method: "GET" });
    const data = await res.json();

    for (var month in data.schedules) {
      tasksContainer.innerHTML += `
      <div class="Tasks-container mt-5">
            <h2 class="ps-2 mb-4 text-muted">${month}</h2>
            <div class="schedules" id="${month}-schedules" data-month="${month}">
            </div>
      </div>
      `;
    }

    const allSchedulesContainers = document.querySelectorAll(
      ".Tasks-container .schedules"
    );

    allSchedulesContainers.forEach((container) => {
      let schedules = data.schedules[container.dataset.month];

      for (schedule of schedules) {
        const scheduleDate = new Date(schedule.date);
        const today = new Date();
        container.innerHTML += `
        <div class="schedule-box">
          <div class="date ${
            scheduleDate.getDate() == today.getDate() &&
            scheduleDate.getMonth() == today.getMonth() &&
            scheduleDate.getFullYear() == today.getFullYear()
              ? "active"
              : ""
          }" >

            <p class="week-day">${scheduleDate.toString().split(" ")[0]}</p>
            <p class="number-day">${scheduleDate.getDate()}</p>
          </div>
          <div class="time-location">
            <p class="time-schedule">
              <i class="fa-solid fa-clock me-1"></i>
                <span class="from ms-1"> ${schedule.from}</span> 
                -
                <span class="to">${schedule.to}</span>
            </p>
            <p class="location">
              <i class="fa-solid fa-location-dot me-3"></i>
              <span class="where">${schedule.location}</span>
            </p>
          </div>
          <div class="schedule">
            <h3>${schedule.name}</h3>
          </div>
          <div class="edit">
            <a href='/schedules/${
              schedule._id
            }' ><button class="btn btn-outline-dark">Edit</button></a>
            <button class="btn btn-outline-danger delete-schedule"data-doc="${
              schedule._id
            }">Cancel</button>
          </div>
    </div>
        `;
      }
    });
  } catch (err) {
    console.log(err);
  }
}


bringSchedules().then((_) => {
  const deleteBtn = document.querySelectorAll(".edit button.delete-schedule");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const docId = btn.dataset.doc;

      try {
        await fetch("/schedules/" + docId, {
          method: "DELETE",
        });

        e.target.parentNode.parentNode.remove();
      } catch (err) {
        console.log(err);
      }
    });
  });
});
