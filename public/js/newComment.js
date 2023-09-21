// logic to add a new comment to a post when the new comment button is clicked
const commentFormHandler = async (event) => {
  event.preventDefault();

  // get the post id and comment text from the form
  const comment_text = document.querySelector("#comment-input").value.trim();

  const post_id = window.location.pathname.replace("/post/", "");

  console.log(comment_text);
  console.log(post_id);

  if (comment_text) {
    // send a post request to the api endpoint
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // if the response is ok, reload the page, otherwise display the error
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// add an event listener for the new comment button
document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
