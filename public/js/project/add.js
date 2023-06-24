let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  emptyError();

  let project_name = form.name.value,
    deadline_date = form.date.value;

  try {
    const res = await fetch("/projects/create", {
      method: "POST",
      body: JSON.stringify({
        name: project_name,
        date: deadline_date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();

    if (data.errors) {
      for (prop in data.errors) {
        if (data.errors[prop]) {
          form[prop].classList.add("is-invalid");
          form.querySelector(
            `.${prop}-error`
          ).innerHTML += `${data.errors[prop]}`;
        }
      }
    } else {
      form.innerHTML +=
        "<div class='alert alert-success mt-3'>Project created Successfully</div>";
      form.reset();
    }
  } catch (err) {
    console.log(err);
  }
});

function emptyError() {
  let arr = ["name", "date"];

  arr.forEach((x) => (form.querySelector(`.${x}-error`).innerHTML = ""));
  arr.forEach((x) => {
    if (form[x].classList.contains("is-invalid")) {
      form[x].classList.remove("is-invalid");
    }
  });
}
