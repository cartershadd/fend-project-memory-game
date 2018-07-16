/*
 * Create a list that holds all of your cards
 * Resets moves and star counter
 */
var openCards = [];
var remainingMoves = 12;
var cardPairs = [];
var timer;
var startTime;
var updateTimerInterval;
var modal = document.getElementById("winner-modal");
var span = document.getElementById("close-box");
span.onclick = function() {
  resetGame();
  modal.style.display = "none";
}

function resetGame() {
  var stars = document.getElementById("stars");
  var moves = document.getElementById("moves");
  var newDate = new Date();
  startTime = newDate.getTime();
  // removes previous timer
  clearTimeout(updateTimerInterval);
  // updates timer 40 times a second
  updateTimerInterval = setInterval(updateTimer, 25);
  var imageList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
    "fa-cube", "fa-anchor", "fa-leaf", "fa-bomb", "fa-diamond",
    "fa-paper-plane-o", "fa-bicycle", "fa-bolt",
    "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb"];
  imageList = shuffle(imageList);
  var deck = document.getElementById("deck");
  while (deck.children.length > 0) {
    var firstChild = deck.children[0];
    deck.removeChild(firstChild);
  }
  var deckFragment = document.createDocumentFragment();
  for (var i = 0; i < 16; i++) {
    var li = document.createElement('li');
    li.classList.add("card");
    var iElement = document.createElement('i');
    iElement.classList.add("fa");
    iElement.classList.add(imageList[i]);
    li.appendChild(iElement);
    li.addEventListener('click', addCard);
    deckFragment.appendChild(li);
  }
  deck.appendChild(deckFragment);
  remainingMoves = 12;
  moves.innerHTML = remainingMoves;
  while (stars.children.length > 0) {
    var firstStar = stars.children[0];
    stars.removeChild(firstStar);
  }
  for (var i = 0; i < 3; i++) {
    var li = document.createElement('li');
    var star = document.createElement('i');
    star.classList.add("fa", "fa-star");
    li.appendChild(star);
    stars.appendChild(li);
  }
  openCards = [];
  cardPairs = [];
}

/*removes stars upon getting an incorrect match*/

function removeStar() {
  var stars = document.getElementById("stars");
  var moves = document.getElementById("moves");
  remainingMoves = remainingMoves - 1;
  if (remainingMoves%4 === 0) {
    stars.removeChild(stars.children[0]);
  }
  // popup alert when no moves remain.
  moves.innerHTML = remainingMoves;
  if (remainingMoves === 0) {
    alert("Try again?");
    resetGame();
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addCard(card) {
  if (openCards.length !== 2) {
    var card = event.target;
    if (openCards.indexOf(card) === -1 && card.tagName === "LI") {
      card.classList.add("open", "show");
      openCards.push(card);
      // clears timer for matchCard function once second choice of card is made
      clearTimeout(timer);
      timer = setTimeout(matchCard, 1500);
    }
  }
}

function matchCard() {
  if (openCards.length === 2) {
    var firstCard = openCards[0];
    var secondCard = openCards[1];
    if (firstCard.firstChild.classList[1] == secondCard.firstChild.classList[1]) {
      firstCard.classList.add("match");
      secondCard.classList.add("match");
      cardPairs.push(firstCard);
      cardPairs.push(secondCard);
      scoreKeeper();
    } else {
      // flip non-matching cards facedown again.
      firstCard.classList.remove("open", "show");
      secondCard.classList.remove("open", "show");
      removeStar();
    }
    // reset openCard list to empty.
    openCards = [];
  }
}

/*creates a space for the time and star rating to be displayed on the Modal
that pops up when you get all matches correct and win.*/

function scoreKeeper() {
  if (cardPairs.length === 16) {
    modal.style.display = "block";
    var finalTime = document.getElementById("final-time");
    var finalStar = document.getElementById("final-star");
    var newDate = new Date();
    var currentTime = newDate.getTime();
    var milliseconds = currentTime - startTime;
    var seconds = Math.floor(milliseconds/1000);
    var minutes = Math.floor(seconds/60);
    milliseconds = milliseconds - (seconds*1000);
    seconds = seconds - (minutes*60);
    finalTime.innerHTML = "Your time was " + minutes + ":" + seconds + ":" + milliseconds;
    finalStar.innerHTML = "Your star rating was " + stars.children.length + " stars.";
  }
}

/*creates and udates a timer while game is in play*/

function updateTimer() {
  var newDate = new Date();
  var currentTime = newDate.getTime();
  var watch = document.getElementById('stopwatch');
  var milliseconds = currentTime - startTime;
  var seconds = Math.floor(milliseconds/1000);
  var minutes = Math.floor(seconds/60);
  milliseconds = milliseconds - (seconds*1000);
  seconds = seconds - (minutes*60);
  watch.innerHTML = minutes + ":" + seconds + ":" + milliseconds;
}

window.onload = resetGame;


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
