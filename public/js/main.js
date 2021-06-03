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
