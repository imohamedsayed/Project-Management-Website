let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  emptyError();

  const name = form.name.value,
    location = form.location.value,
    date = form.date.value,
    from = form.from.value,
    to = form.to.value,
    id = form.id.value;

  if (from > to) {
    document.querySelector(".to-error").innerHTML =
      "it's should be after the from time";
    form.to.classList.add("is-invalid");
  } else if (new Date(date) < new Date()) {
    document.querySelector(".date-error").innerHTML =
      "How is that possible to schedule a date in the past !";
    form.date.classList.add("is-invalid");
  } else {
    try {
      const res = await fetch("/schedules/" + id, {
        method: "PUT",
        body: JSON.stringify({
          name,
          location,
          date,
          from,
          to,
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
          "<div class='alert alert-success mt-3'>Schedule Updated Successfully</div>";

        setTimeout(() => {
          form.lastChild.remove();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

function emptyError() {
  let arr = ["name", "date", "location", "from", "to"];
  arr.forEach((x) => (form.querySelector(`.${x}-error`).innerHTML = ""));
  arr.forEach((x) => {
    if (form[x].classList.contains("is-invalid")) {
      form[x].classList.remove("is-invalid");
    }
  });
}
