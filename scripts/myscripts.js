//
// TODO:
//
// for phase 4, i could use a graphical bar 1-100% of how fast they guessed the right number. not like...in seconds, but num of guesses
// https://css-tricks.com/css3-progress-bars/
// https://codepen.io/rkchauhan/pen/LGgaeK
// https://www.codecourse.com/lessons/simple-pure-css-progress-bar
// https://codepen.io/rgg/pen/QbRyOq
// https://codepen.io/trishasalas/pen/mfKDx
// https://codepen.io/wesbos/pen/adQjoY
// http://dev.gojko.net/web/2015/09/19/material-design-progress-pure-css.html
// 1 bar could be range difficulty (how big the range is)
// 1 bar could be player skill (like just number of guesses?)
// 1 bar could be how close they are to the number (percentage?)

// Global Variables

var minRange;
var maxRange;
var currRandomNumber;

var btnClear = document.querySelector("#btnClear");
var btnReset = document.querySelector("#btnReset");
var btnGuess = document.querySelector("#btnGuess");
var btnSetRange = document.querySelector("#btnSetRange");
var txtGuess = document.querySelector("#txtGuess");
var txtMin = document.querySelector("#txtMin");
var txtMax = document.querySelector("#txtMax");
var dbgRandom = document.querySelector("#dbgRandom");
var lblGuessValidator = document.querySelector("#lblGuessValidator");
var lblRangeValidator = document.querySelector("#lblRangeValidator");
var lblLastGuessPre = document.querySelector("#lblLastGuessPre");
var lblLastGuess = document.querySelector("#lblLastGuess");
var lblLastGuessPost = document.querySelector("#lblLastGuessPost");
var lblRangeStatement = document.querySelector("#lblRangeStatement");

// Initialize

currRandomNumber = genRandomNumber(1, 100);
btnClear.disabled = true;
btnReset.disabled = true;
//FOR DEBUGGING
dbgRandom.innerText = "| curr answer: " + currRandomNumber.toString();


// Declaring Event Listeners

btnClear.addEventListener("click", clearForm);
btnGuess.addEventListener("click", guessNumber);
btnReset.addEventListener("click", resetForm);
btnSetRange.addEventListener("click", setRange);
txtGuess.addEventListener("input", guessFieldChanged);
txtMin.addEventListener("input", rangeFieldChanged);
txtMax.addEventListener("input", rangeFieldChanged);


// Functions

// Clears out all input boxes and validators
function clearForm() {
  txtMin.value = "";
  txtMax.value = "";
  txtGuess.value = "";
  lblGuessValidator.innerHTML = "&nbsp;";
  lblRangeValidator.innerHTML = "&nbsp;";
  btnClear.disabled = true;
}

// Resets the game back to initial state (1-100)
function resetForm() {
  clearForm();
  lblLastGuessPre.innerText = "Guess a number between";
  lblLastGuess.innerText = "1 to 100";
  lblLastGuessPost.innerText = "Are you feeling lucky?";
  lblRangeStatement.innerText = "Current Range: 1 to 100"
  btnReset.disabled = true;
  currRandomNumber = genRandomNumber(1, 100);
  //FOR DEBUGGING
  dbgRandom.innerText = "| curr answer: " + currRandomNumber.toString();
}

// generate a random number based on min and max parameters
function genRandomNumber(min, max) {
  // syntax for random number: return Math.floor(Math.random()*(max-min+1)+min);
  minRange = min;
  maxRange = max;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// set a custom range for min/max
function setRange(wonNewMin, wonNewMax) {

  var newMinRange;
  var newMaxRange;

  // if parameters are undefined, we know we're using the basic set range feature
  // else we know the range was updated via a win
  if (typeof wonNewMin === 'undefined' || typeof wonNewMax === 'undefined') {
    newMinRange = txtMin.value;
    newMaxRange = txtMax.value;
  } else {
    newMinRange = wonNewMin - 10;
    newMaxRange = wonNewMax + 10;
  }

  //since isNaN(null) returns false, we check vanilla isNaN but also after trying to parse to int.
  //Just parsing to int doesn't work because 123abc parses to an integer
  if (isNaN(parseInt(newMinRange)) || isNaN(parseInt(newMaxRange)) || isNaN(newMinRange) || isNaN(newMaxRange)) {
    lblRangeValidator.innerHTML = "Please enter a valid number";
  } else if (parseInt(newMinRange) >= parseInt(newMaxRange)) {
    lblRangeValidator.innerHTML = "Min Range must be less than Max Range";
  } else {
    lblRangeValidator.innerHTML = "&nbsp;"

    // setting the range essentially resets the game, but then we need to set the range to custom values
    resetForm();
    lblLastGuess.innerText = newMinRange + " to " + newMaxRange;
    lblRangeStatement.innerText = "Current Range: " + newMinRange + " to " + newMaxRange
    currRandomNumber = genRandomNumber(parseInt(newMinRange), parseInt(newMaxRange));

    // resetting the form would normally disable the reset button. we want it enabled as the new range could be reset
    btnReset.disabled = false;
    //FOR DEBUGGING
    dbgRandom.innerText = "| curr answer: " + currRandomNumber.toString();
  }
}

// Listener[input]: for txtMin and txtMax
function rangeFieldChanged() {
  var newMinRange = txtMin.value;
  var newMaxRange = txtMax.value;

  if (newMinRange.length > 0 || newMaxRange.length > 0) {
    btnClear.disabled = false;
  } else {
    btnClear.disabled = true;
    lblRangeValidator.innerHTML = "&nbsp;"
  }
}

// Listener[input]: for txtGuess
function guessFieldChanged() {
  var theGuess = txtGuess.value;

  if (theGuess.length > 0) {
    btnClear.disabled = false;
  } else {
    btnClear.disabled = true;
    lblGuessValidator.innerHTML = "&nbsp;";
  }
}

// Listener[click]: for btnGuess
function guessNumber() {
  var lastGuess = txtGuess.value;

  if (isNaN(lastGuess) || isNaN(parseInt(lastGuess))) { // is it a valid number
    lblGuessValidator.innerText = "Please enter a valid number";
  } else if (lastGuess < minRange || lastGuess > maxRange) { // is it within the current range
    lblGuessValidator.innerText = "Please enter a number between " + minRange + " to " + maxRange + ".";
  } else { // the guess was valid
    lblGuessValidator.innerHTML = "&nbsp;";
    lblLastGuessPre.innerText = "Your last guess was";
    lblLastGuess.innerText = lastGuess.toString();
    lastGuess = parseInt(lastGuess);
    var txtResult;
    var didYouWin = false;

    if (lastGuess > currRandomNumber) {
      txtResult = "That is too high";
    } else if (lastGuess < currRandomNumber) {
      txtResult = "That is too low";
    } else if (lastGuess === currRandomNumber) {
      txtResult = "BOOM! YOU WON! The range has been increased by 10 in each direction</br>still feeling lucky?";
      didYouWin = true;
    } else {
      txtResult = "There was an error, please reset";
    }

    // if they won, set new range
    if (didYouWin) {
      setRange(minRange, maxRange);
    }

    // because the setRange function resets some of the labels, we want to manually set the lblLastGuessPost after we set the range
    lblLastGuessPost.innerHTML = txtResult;
    btnReset.disabled = false;
  }
}
