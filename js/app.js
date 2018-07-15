/*
 * Create a list that holds all of your cards
 * Resets moves and star counter
 */
var openCards = [];
var remainingMoves = 12;
var cardPairs = [];
var timer;

function resetGame() {
  var stars = document.getElementById("stars");
  var moves = document.getElementById("moves");
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
    card.classList.add("open", "show");
    openCards.push(card);
    clearTimeout(timer);
    timer = setTimeout(matchCard, 1500);
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
      firstCard.classList.remove("open", "show");
      secondCard.classList.remove("open", "show");
      removeStar();
    }
    openCards = [];
  }
}

function scoreKeeper() {
  if (cardPairs.length === 16) {
    alert("Congratulations, you won bingo!");
    resetGame();
  }
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
