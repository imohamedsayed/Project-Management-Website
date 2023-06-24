let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  emptyError();

  try {
    let res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();
    if (data.errors) {
      for (var prop in data.errors) {
        if (data.errors[prop]) {
          form[prop].classList.add("is-invalid");
          form.querySelector(
            `.${prop}-error`
          ).innerHTML += `${data.errors[prop]}`;
        }
      }
    } else {
      form.innerHTML +=
        "<div class='alert alert-success'>login successfully</div>";
      setTimeout(() => {
        location.assign("/home");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
});

function emptyError() {
  let arr = ["email", "password"];

  arr.forEach((x) => (form.querySelector(`.${x}-error`).innerHTML = ""));
  arr.forEach((x) => {
    if (form[x].classList.contains("is-invalid")) {
      form[x].classList.remove("is-invalid");
    }
  });
}
