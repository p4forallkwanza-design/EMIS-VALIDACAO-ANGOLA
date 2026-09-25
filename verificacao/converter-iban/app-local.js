(function () {
  "use strict";

  document.querySelectorAll(".copy-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy");
      var done = function () {
        var original = button.textContent;
        button.textContent = "Copiado";
        setTimeout(function () { button.textContent = original; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(done);
      } else {
        done();
      }
    });
  });

  var countdown = document.getElementById("countdown");
  var remaining = 120;
  setInterval(function () {
    if (remaining > 0) remaining -= 1;
    var minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
    var seconds = String(remaining % 60).padStart(2, "0");
    countdown.textContent = minutes + ":" + seconds;
  }, 1000);
}());
