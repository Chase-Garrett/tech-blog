// logic to edit a post when the edit post button is clicked

const updateFormHandler = async (event) => {
  event.preventDefault();

  // get the post title and post text from the form
  const post_id = window.location.pathname.replace("/edit/", "");

  const title = document.querySelector("#title-input").value.trim();
  const post_text = document.querySelector("#post-input").value.trim();

  if (title && post_text) {
    // send a put request to the api endpoint
    const response = await fetch(`/api/posts/edit/${post_id}`, {
      method: "PUT",
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

// add an event listener for the edit post button
document
  .querySelector(".update-post-form")
  .addEventListener("submit", updateFormHandler);
