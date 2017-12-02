$(document).ready(function() {
   // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var threadId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?thread_id=") !== -1) {
    threadId = url.split("=")[1];
    getThreadData(threadId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var newthreadForm = $("#newthread");
  var threadCategorySelect = $("#category");
  // Giving the postCategorySelect a default value
  threadCategorySelect.val("Video Games");
  // Adding an event listener for when the form is submitted
  $(newthreadForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newThread = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      category: threadCategorySelect.val()
    };

    console.log(newThread);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newThread.id = threadId;
      updateThread(newThread);
    }
    else {
      submitThread(newThread);
    }
  });

  // Submits a new post and brings user to main page upon completion
  function submitThread(Thread) {
    $.thread("/api/thread/", thread, function() {
      window.location.href = "/main";
    });
  }

  // Gets post data for a post if we're editing
  function getThreadData(id) {
    $.get("/api/thread/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        threadCategorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateThread(thread) {
    $.ajax({
      method: "PUT",
      url: "/api/threads",
      data: thread
    })
    .done(function() {
      window.location.href = "/main";
    });
  }
});
