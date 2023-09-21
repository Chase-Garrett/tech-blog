// logic to delete a post when the delete post button is clicked

const deleteFormHandler = async (event) => {
  event.preventDefault();

  // get the post id from the url
  const post_id = window.location.pathname.replace("/edit/", "");

  // send a delete request to the api endpoint
  const response = await fetch(`/api/posts/dashboard/${post_id}`, {
    method: "DELETE"
  });

  // if the response is ok, redirect to the homepage, otherwise display the error
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

// add an event listener for the delete post button
document
  .querySelector("#delete-post")
  .addEventListener("click", deleteFormHandler);
