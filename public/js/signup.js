const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const user_name = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (user_name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
