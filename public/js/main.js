function dropdownElementHandler() {
  var events = document.querySelectorAll(".dropdown-event");

  if (Object.keys(events).length > 0) {
    for (let i = 0; i < events.length; i++) {
      events[i].addEventListener("click", function () {
        var element = document.querySelector(".dropdown");

        element.classList.toggle("hidden");
      });
    }
  }
}

dropdownElementHandler();

function userHasLikes(reactions, userId, postId) {
  let hasLike = false;

  reactions.forEach((element) => {
    if (element.userId !== userId && element.postId === postId) {
      hasLike = true;
    }
  });

  return hasLike;
}
