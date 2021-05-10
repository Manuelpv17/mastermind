let difficulty = 8;
let try_position = 0;
let row_position = 0;
let lock_difficulty = false;
let win = false;
let max = 6;
let patron = [
  Math.floor(Math.random() * max) + 1,
  Math.floor(Math.random() * max) + 1,
  Math.floor(Math.random() * max) + 1,
  Math.floor(Math.random() * max) + 1,
];
let colors = {
  1: "red",
  2: "blue",
  3: "green",
  4: "brown",
  5: "white",
  6: "black",
};
let current_try = [-1, -1, -1, -1];

console.log("patron: ", patron);
render();

document.addEventListener("keydown", function (event) {
  if (event.key === "p" && lock_difficulty === false) {
    clean();
    if (difficulty < 8) {
      difficulty++;
    }
    render();
  }
  if (event.key === "o" && lock_difficulty === false) {
    clean();
    if (difficulty > 2) {
      difficulty--;
    }
    render();
  }
  if (event.key === "ArrowUp" && !win) {
    if (row_position > 0) {
      document
        .querySelectorAll(".tries > li")
        [try_position].querySelectorAll("li")[
        row_position
      ].style.backgroundColor = "transparent";
      row_position--;
      document
        .querySelectorAll(".tries > li")
        [try_position].querySelectorAll("li")[
        row_position
      ].style.backgroundColor = "lightgrey";
    }
  }
  if (event.key === "ArrowDown" && !win) {
    if (row_position < 3) {
      document
        .querySelectorAll(".tries > li")
        [try_position].querySelectorAll("li")[
        row_position
      ].style.backgroundColor = "transparent";
      row_position++;
      document
        .querySelectorAll(".tries > li")
        [try_position].querySelectorAll("li")[
        row_position
      ].style.backgroundColor = "lightgrey";
    }
  }
  if (event.key === "Enter" && !current_try.includes(-1)) {
    lock_difficulty = true;

    document.querySelectorAll(".tries ul")[try_position].style.backgroundColor =
      "transparent";
    document
      .querySelectorAll(".tries > li")
      [try_position].querySelectorAll("li")[
      row_position
    ].style.backgroundColor = "transparent";

    if (current_try == patron) {
      document.querySelector("h1").textContent = "You Win :)";
    }

    for (let i = 0; i < 4; i++) {
      if (current_try[i] == patron[i]) win = true;
      else {
        win = false;
        break;
      }
    }

    let row_feedback = 0;
    let patron_copy = [...patron];
    for (let i = 0; i < 4; i++) {
      if (current_try[i] === patron_copy[i]) {
        document
          .querySelectorAll(".tries-feedback > li")
          [try_position].querySelectorAll("li")[
          row_feedback
        ].style.backgroundColor = "red";
        row_feedback++;
        current_try[i] = 0;
        patron_copy[i] = -1;
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (patron_copy[i] === current_try[j]) {
          document
            .querySelectorAll(".tries-feedback > li")
            [try_position].querySelectorAll("li")[
            row_feedback
          ].style.backgroundColor = "white";
          row_feedback++;
          current_try[j] = 0;
          patron_copy[i] = -1;
        }
      }
    }

    if (win) {
      reveal();
      document.querySelector("h1").textContent = "You Win :)";
    }

    current_try = [-1, -1, -1, -1];

    if (try_position < difficulty) try_position++;
    else {
      reveal();
      document.querySelector("h1").textContent = "You lost :/";
      win = true;
    }

    row_position = 0;

    document.querySelectorAll(".tries ul")[try_position].style.backgroundColor =
      "lightblue";
    document
      .querySelectorAll(".tries > li")
      [try_position].querySelectorAll("li")[
      row_position
    ].style.backgroundColor = "lightgrey";
  }
  if (event.key === "Escape") {
    patron = [
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
    ];
    document.querySelector("h1").textContent = "Mastermind";

    clean();
    try_position = 0;
    row_position = 0;
    lock_difficulty = false;
    win = false;
    render();

    document.querySelectorAll(".tries ul")[try_position].style.backgroundColor =
      "lightblue";
    document
      .querySelectorAll(".tries > li")
      [try_position].querySelectorAll("li")[
      row_position
    ].style.backgroundColor = "lightgrey";
  }
  if (["1", "2", "3", "4", "5", "6"].includes(event.key)) {
    document
      .querySelectorAll(".tries > li")
      [try_position].querySelectorAll("li")
      [row_position].querySelector("div").style.backgroundColor =
      colors[event.key];
    current_try[row_position] = parseInt(event.key);
  }
});

function clean() {
  let feedback = document.querySelector(".tries-feedback");
  let tries = document.querySelector(".tries");
  let feedback_li = document.querySelectorAll(".tries-feedback > li");
  let tries_li = document.querySelectorAll(".tries > li");
  document.querySelectorAll(".tries ul")[0].style.backgroundColor =
    "transparent";
  document.querySelectorAll(".tries > li")[0].querySelectorAll("li")[
    row_position
  ].style.backgroundColor = "transparent";

  for (const row_try of document.querySelectorAll(".tries > li div"))
    row_try.style.backgroundColor = "transparent";

  for (const row_feedback of document
    .querySelectorAll(".tries-feedback > li")[0]
    .querySelectorAll("li"))
    row_feedback.style.backgroundColor = "transparent";

  for (let i = 1; i <= difficulty; i++) {
    feedback.removeChild(feedback_li[i]);
    tries.removeChild(tries_li[i]);
  }
}

function render() {
  let feedback = document.querySelector(".tries-feedback");
  let feedback_li = document.querySelector(".tries-feedback > li");
  let tries = document.querySelector(".tries");
  let tries_li = document.querySelector(".tries > li");

  for (let i = 0; i < difficulty; i++) {
    feedback.appendChild(feedback_li.cloneNode(true));
    tries.appendChild(tries_li.cloneNode(true));
  }
  for (const elem of document.querySelectorAll(".board__patron li")) {
    elem.style.backgroundColor = "lightblue";
  }
  document.querySelectorAll(".tries ul")[0].style.backgroundColor = "lightblue";
  document.querySelectorAll(".tries > li")[0].querySelectorAll("li")[
    row_position
  ].style.backgroundColor = "lightgrey";
}

function reveal() {
  patron_li = document.querySelectorAll(".board__patron li");
  for (let i = 0; i < 4; i++) {
    patron_li[i].style.backgroundColor = colors[patron[i]];
  }
}
