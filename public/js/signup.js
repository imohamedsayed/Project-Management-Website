let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  emptyError();

  const name = form.name.value,
    email = form.email.value,
    password = form.password.value,
    password_confirm = form.confirm_password.value;

  if (password_confirm != password) {
    form.confirm_password.classList.add("is-invalid");
    form.querySelector(".confirm_password-error").innerHTML +=
      "Password Confirm doesn't match with password";
  } else {
    try {
      const res = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
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
          "<div class='alert alert-success'>Your account is created Successfully</div>";
        setTimeout(() => {
          location.assign("/home");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

function emptyError() {
  let arr = ["name", "email", "confirm_password", "password"];

  arr.forEach((x) => (form.querySelector(`.${x}-error`).innerHTML = ""));
  arr.forEach((x) => {
    if (form[x].classList.contains("is-invalid")) {
      form[x].classList.remove("is-invalid");
    }
  });
}
