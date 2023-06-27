const nameForm = document.querySelector("form.change-name"),
  emailForm = document.querySelector("form.change-email"),
  passwordForm = document.querySelector("form.change-password");

nameForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelector(".name-error").innerHTML = "";
  if (nameForm.name.classList.contains("is-invalid")) {
    nameForm.name.classList.remove("is-invalid");
  }

  try {
    if (nameForm.name.value == "") {
      document.querySelector(".name-error").innerHTML = "Name is required";
      nameForm.name.classList.add("is-invalid");
    } else {
      let res = await fetch("/settings/update_name", {
        method: "POST",
        body: JSON.stringify({ name: nameForm.name.value }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      console.log(data);

      if (!data.err) {
        nameForm.querySelector(".field").innerHTML +=
          '<div class="alert alert-primary">Name updated Successfully</div>';
        location.reload();
      } else {
        nameForm.querySelector(".field").innerHTML +=
          '<div class="alert alert-danger">Something is wrong</div>';
      }
    }
  } catch (err) {
    console.log(err);
  }
});

emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelector(".email-error").innerHTML = "";
  if (emailForm.email.classList.contains("is-invalid")) {
    emailForm.email.classList.remove("is-invalid");
  }

  try {
    let res = await fetch("/settings/update_email", {
      method: "POST",
      body: JSON.stringify({ email: emailForm.email.value }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.err) {
      emailForm.querySelector(".field").innerHTML +=
        '<div class="alert alert-primary">Email updated Successfully</div>';
      location.reload();
    } else {
      document.querySelector(".email-error").innerHTML = "Email is not valid";
    }
  } catch (err) {
    console.log(err);
  }
});

passwordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  document.querySelector(".password-error").innerHTML = "";
  if (passwordForm.newPassword.classList.contains("is-invalid")) {
    passwordForm.newPassword.classList.remove("is-invalid");
  }
  const oldPassword = passwordForm.oldPassword.value,
    newPassword = passwordForm.newPassword.value;

  if (newPassword.length < 6) {
    document.querySelector(".password-error").innerHTML =
      "Password must be at least 6 characters";
    passwordForm.newPassword.classList.add("is-invalid");
  } else {
    try {
      const res = await fetch("/settings/update_password", {
        method: "POST",
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data);

      if (!data.errors) {
        passwordForm.querySelector(".field").innerHTML +=
          '<div class="alert alert-primary">Email updated Successfully</div>';
        location.reload();
      } else {
        passwordForm.querySelector(".field").innerHTML +=
          '<div class="alert alert-danger">Old Password is not correct</div>';
      }
    } catch (err) {
      console.log(err);
    }
  }
});
