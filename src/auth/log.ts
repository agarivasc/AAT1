document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")!;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    const username = (<HTMLInputElement>document.getElementById("username"))
      .value;
    const password = (<HTMLInputElement>document.getElementById("password"))
      .value;

    // Simulate authentication (you would use actual authentication logic here)
    if (username === "admin" && password === "123") {
      // Save username in localStorage
      localStorage.setItem("username", username);
      /// Redirect to products page
      window.location.href = "/productos.html";
    } else {
      alert("Invalid username or password.");
    }
  });
});
