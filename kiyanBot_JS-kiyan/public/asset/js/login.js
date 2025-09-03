document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");
  const signupForm = document.getElementById("signup");

  // Switch between forms
  window.loginform = () => {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  };
  window.signupform = () => {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  };

  // Signup logic
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const pass = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (pass !== confirm) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("user_" + email, JSON.stringify({ email, pass }));
    alert("Registration successful! Please login.");
    loginform();
  });

  // Login logic
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    const userData = localStorage.getItem("user_" + email);
    if (!userData) {
      alert("User not found!");
      return;
    }

    const user = JSON.parse(userData);
    if (user.pass !== pass) {
      alert("Incorrect password!");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", email);
    // window.location.href = "../index.html";
    window.location.href = "../pages/about.html";
    // window.location.href = "../layout.html";

  });
});
