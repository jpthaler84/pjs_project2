$(document).ready(function() {
  /* global moment */
  // thread-container holds all of our threads
  var threadContainer = $(".thread-container");
  var threadCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleThreadDelete);
  $(document).on("click", "button.edit", handleThreadEdit);
  threadCategorySelect.on("change", handleCategoryChange);
  var threads;

  // This function grabs posts from the database and updates the view
  function getThreads(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/threads" + categoryString, function(data) {
      console.log("Threads", data);
      threads = data;
      if (!threads || !threads.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteThread(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/threads/" + id
    })
    .done(function() {
      getThreads(threadCategorySelect.val());
    });
  }

  // Getting the initial list of posts
  getThreads();
  // InitializeRows handles appending all of our constructed thread HTML inside
  // blogContainer
  function initializeRows() {
    thread-container.empty();
    var threadsToAdd = [];
    for (var i = 0; i < threads.length; i++) {
      threadsToAdd.push(createNewRow(threads[i]));
    }
    threadContainer.append(threadsToAdd);
  }

  // This function constructs a thread's HTML
  function createNewRow(thread) {
    var newThreadPanel = $("<div>");
    newThreadPanel.addClass("panel panel-default");
    var newThreadPanelHeading = $("<div>");
    newThreadPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newThreadTitle = $("<h2>");
    var newThreadDate = $("<small>");
    var newThreadCategory = $("<h5>");
    newThreadCategory.text(thread.category);
    newThreadCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newThreadPanelBody = $("<div>");
    newThreadPanelBody.aThreadass("panel-body");
    var newThreadBody = $("<p>");
    newThreadTitle.text(thread.title + " ");
    newThreadBody.text(thread.body);
    var formattedDate = new Date(thread.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newThreadDate.text(formattedDate);
    newThreadTitle.append(newPostDate);
    newThreadPanelHeading.append(deleteBtn);
    newThreadPanelHeading.append(editBtn);
    newThreadPanelHeading.append(newThreadTitle);
    newThreadPanelHeading.append(newThreadCategory);
    newThreadPanelBody.append(newThreadBody);
    newThreadPanel.append(newThreadPanelHeading);
    newThreadPanel.append(newThreadPanelBody);
    newThreadPanel.data("thread", thread);
    return newThreadPanel;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleThreadDelete() {
    var currentThread = $(this)
      .parent()
      .parent()
      .data("thread");
    deleteThread(currentThread.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleThreadEdit() {
    var currentThread = $(this)
      .parent()
      .parent()
      .data("thread");
    window.location.href = "/main?post_id=" + currentThread.id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No threads yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
    threadContainer.append(messageh2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newThreadCategory = $(this).val();
    getThreads(newThreadCategory);
  }

});
