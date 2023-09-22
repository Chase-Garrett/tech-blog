// logic to add a new post when the new post button is clicked
const newFormHandler = async (event) => {
  event.preventDefault();

  // get the post title and post text from the form
  const title = document.querySelector("#title-input").value.trim();
  const post_text = document.querySelector("#post-input").value.trim();

  if (title && post_text) {
    // send a post request to the api endpoint
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // if the response is ok, redirect to the homepage, otherwise display the error
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// add an event listener for the new post button
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
