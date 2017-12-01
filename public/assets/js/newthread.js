$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newThreadInput = $("input.new-thread");
  // Our new todos will go inside the todoContainer
  var $todoContainer = $(".thread-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteThread);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".thread-item", editThread);
  $(document).on("keyup", ".thread-item", finishEdit);
  $(document).on("blur", ".thread-item", cancelEdit);
  $(document).on("submit", "#thread-form", insertThread);
//initial thread array
  var threads =[];

//getting threads from db upon load
  getThreads();

//resets threads displayed with new thread from thread_db
  function initializeRows() {
     $todoContainer.empty();
     var rowsToAdd = [];
      for (var i = 0; i < threads.length; i++) {
       rowsToAdd.push(createNewRow(threads[i]));
      }
      $threadContainer.prepend(rowsToAdd);
   }
// this function grabs threads from the db and updates the view
  function getThreads() {
     $.get("/api/threads", function(data) {
       todos = data;
        initializeRows();
      });
    }
// function handle he hsowing the unput box for  auser to edit a thread
   function editThread() {
    var currentThread = $(this).data("thread");
    $(this).children().hide();
    $(this).children("input.edit").val(currentThread.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }
// toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var todo = $(this).parent().data("thread");
    todo.complete = !todo.complete;
    updateThread(thread);
  }

  //functnion starts updateing thread in db if a user hits enter
  //while editing
  function finishEdit() {
    var updatedThread = $(this).data("thread");
    if (event.keycode === 13) {
      updatedThread.text = $(this).children("input").val().trim();
      $(this).blur();
        updatedThread(updatedThread);
        
    }
  }

  //this function will update the db
  function updateThread(thread){
     $.ajax({
      method: "PUT",
      url: "/api/threads",
      data: thread
    }).done(getThreads);
  }
  // this function is called whn a thread is in edit, loses focus, and is concelled
  function cancelEdit(){
    var currentThread = $(this).data("thread");
    if (currentThread) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentThread.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
    }
//this functionconstructs a thread row

  function createNewRow(thread) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span>",
        thread.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", thread.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("thread", thread);
    if (thread.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

    // This function inserts a new thread into our database and then updates the view
  function insertThread(event) {
    event.preventDefault();
    var thread = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/threads", thread, getThreads);
    $newItemInput.val("");
  }
});
