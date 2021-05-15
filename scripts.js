/* 
Mastermind Game JS
*/

let difficulty = 8;
let try_position = 0;
let row_position = 0;
let lock_difficulty = false;
let end = false;
let max = 6;
let pattern = [
  Math.floor(Math.random() * max) + 1,
  Math.floor(Math.random() * max) + 1,
  Math.floor(Math.random() * max) + 1,
  Math.floor(Math.random() * max) + 1,
];
let colors = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'brown',
  5: 'white',
  6: 'black',
};
let current_try = [-1, -1, -1, -1];

console.log('patron: ', pattern);
render();

/* KEY BOARD */

document.addEventListener('keydown', function (event) {
  /* p -> Raise the difficulty */
  if (event.key === 'p' && lock_difficulty === false) {
    clean();
    if (difficulty < 8) {
      difficulty++;
    }
    render();
  }
  /* o -> Reduce the difficulty */
  if (event.key === 'o' && lock_difficulty === false) {
    clean();
    if (difficulty > 2) {
      difficulty--;
    }
    render();
  }
  /* Up Arrow -> Move up */
  if (event.key === 'ArrowUp' && !end) {
    if (row_position > 0) {
      document
        .querySelectorAll('.tries > li')
        [try_position].querySelectorAll('li')[
        row_position
      ].style.backgroundColor = 'transparent';
      row_position--;
      document
        .querySelectorAll('.tries > li')
        [try_position].querySelectorAll('li')[
        row_position
      ].style.backgroundColor = 'lightgrey';
    }
  }
  /* Up Down-> Move down */
  if (event.key === 'ArrowDown' && !end) {
    if (row_position < 3) {
      document
        .querySelectorAll('.tries > li')
        [try_position].querySelectorAll('li')[
        row_position
      ].style.backgroundColor = 'transparent';
      row_position++;
      document
        .querySelectorAll('.tries > li')
        [try_position].querySelectorAll('li')[
        row_position
      ].style.backgroundColor = 'lightgrey';
    }
  }
  /* Enter -> Submit Try */
  if (event.key === 'Enter' && !current_try.includes(-1)) {
    lock_difficulty = true;

    console.log('patron', pattern);
    console.log('try', current_try);

    document.querySelectorAll('.tries ul')[try_position].style.backgroundColor =
      'transparent';
    document
      .querySelectorAll('.tries > li')
      [try_position].querySelectorAll('li')[
      row_position
    ].style.backgroundColor = 'transparent';

    if (current_try == pattern) {
      document.querySelector('h1').textContent = 'You Win :)';
    }

    /* check if win */
    for (let i = 0; i < 4; i++) {
      if (current_try[i] == pattern[i]) end = true;
      else {
        end = false;
        break;
      }
    }

    /* Feedback */
    feedback_func();

    if (end) {
      reveal();
      document.querySelector('h1').textContent = 'You Win :)';
    } else if (try_position < difficulty) {
      try_position++;
    } else {
      reveal();
      document.querySelector('h1').textContent = 'You lost :/';
      end = true;
    }

    current_try = [-1, -1, -1, -1];
    row_position = 0;

    document.querySelectorAll('.tries ul')[try_position].style.backgroundColor =
      'lightblue';
    document
      .querySelectorAll('.tries > li')
      [try_position].querySelectorAll('li')[
      row_position
    ].style.backgroundColor = 'lightgrey';
  }
  /* Escape -> Restart game */
  if (event.key === 'Escape') {
    pattern = [
      Math.floor(Math.random() * max) + 1,
      Math.floor(Math.random() * max) + 1,
      Math.floor(Math.random() * max) + 1,
      Math.floor(Math.random() * max) + 1,
    ];
    document.querySelector('h1').textContent = 'Mastermind';

    clean();
    try_position = 0;
    row_position = 0;
    lock_difficulty = false;
    end = false;
    render();

    document.querySelectorAll('.tries ul')[try_position].style.backgroundColor =
      'lightblue';
    document
      .querySelectorAll('.tries > li')
      [try_position].querySelectorAll('li')[
      row_position
    ].style.backgroundColor = 'lightgrey';
  }
  /* 1 - 6 -> Color selection */
  if (['1', '2', '3', '4', '5', '6'].includes(event.key)) {
    document
      .querySelectorAll('.tries > li')
      [try_position].querySelectorAll('li')
      [row_position].querySelector('div').style.backgroundColor =
      colors[event.key];
    current_try[row_position] = parseInt(event.key);
  }
});

/* Clear DOM, Restart CSS properties */
function clean() {
  let feedback = document.querySelector('.tries-feedback');
  let tries = document.querySelector('.tries');
  let feedback_li = document.querySelectorAll('.tries-feedback > li');
  let tries_li = document.querySelectorAll('.tries > li');
  document.querySelectorAll('.tries ul')[0].style.backgroundColor =
    'transparent';
  document.querySelectorAll('.tries > li')[0].querySelectorAll('li')[
    row_position
  ].style.backgroundColor = 'transparent';

  for (const row_try of document.querySelectorAll('.tries > li div'))
    row_try.style.backgroundColor = 'transparent';

  for (const row_feedback of document
    .querySelectorAll('.tries-feedback > li')[0]
    .querySelectorAll('li'))
    row_feedback.style.backgroundColor = 'transparent';

  for (let i = 1; i <= difficulty; i++) {
    feedback.removeChild(feedback_li[i]);
    tries.removeChild(tries_li[i]);
  }
}

/* Render DOM */
function render() {
  let feedback = document.querySelector('.tries-feedback');
  let feedback_li = document.querySelector('.tries-feedback > li');
  let tries = document.querySelector('.tries');
  let tries_li = document.querySelector('.tries > li');

  for (let i = 0; i < difficulty; i++) {
    feedback.appendChild(feedback_li.cloneNode(true));
    tries.appendChild(tries_li.cloneNode(true));
  }
  for (const elem of document.querySelectorAll('.board__patron li')) {
    elem.style.backgroundColor = 'lightblue';
  }
  document.querySelectorAll('.tries ul')[0].style.backgroundColor = 'lightblue';
  document.querySelectorAll('.tries > li')[0].querySelectorAll('li')[
    row_position
  ].style.backgroundColor = 'lightgrey';
}

/* Show right answer */
function reveal() {
  patron_li = document.querySelectorAll('.board__patron li');
  for (let i = 0; i < 4; i++) {
    patron_li[i].style.backgroundColor = colors[pattern[i]];
  }
}

/* Show feedback */
function feedback_func() {
  let row_feedback = 0;
  let pattern_copy = [...pattern];
  for (let i = 0; i < 4; i++) {
    if (current_try[i] === pattern_copy[i]) {
      document
        .querySelectorAll('.tries-feedback > li')
        [try_position].querySelectorAll('li')[
        row_feedback
      ].style.backgroundColor = 'red';
      row_feedback++;
      current_try[i] = 0;
      pattern_copy[i] = -1;
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (pattern_copy[i] === current_try[j]) {
        document
          .querySelectorAll('.tries-feedback > li')
          [try_position].querySelectorAll('li')[
          row_feedback
        ].style.backgroundColor = 'white';
        row_feedback++;
        current_try[j] = 0;
        pattern_copy[i] = -1;
      }
    }
  }
}
