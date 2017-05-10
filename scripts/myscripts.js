//
// TODO:
//
// Ask around and see whos good with css. need some help on styling
// need to create readme
// upload to git
// refactor...add some more styling
// put in some aria tags and generally make sure all elements of css/html that they've been teaching are there.
// for phase 4, i could use a graphical bar 1-100% of how fast they guessed the right number. not like...in seconds, but num of guesses
// https://css-tricks.com/css3-progress-bars/
// https://codepen.io/rkchauhan/pen/LGgaeK
// https://www.codecourse.com/lessons/simple-pure-css-progress-bar
// https://codepen.io/rgg/pen/QbRyOq
// http://dev.gojko.net/web/2015/09/19/material-design-progress-pure-css.html


// Global Variables

var minRange;
var maxRange;
var lastRandom;

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

lastRandom = genRandomNumber(1, 100);
btnClear.disabled = true;
btnReset.disabled = true;
//FOR DEBUGGING
dbgRandom.innerText = "| curr answer: " + lastRandom.toString();


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

  // txtMin.value = "";
  // txtMax.value = "";
  //
  // txtGuess.value = "";
  // lblGuessValidator.innerHTML = "&nbsp;";
  // lblRangeValidator.innerHTML = "&nbsp;";
  // btnClear.disabled = true;

  clearForm();

  lblLastGuessPre.innerText = "Guess a number between";
  lblLastGuess.innerText = "1 to 100";
  lblLastGuessPost.innerText = "Are you feeling lucky?";
  lblRangeStatement.innerText = "Current Range: 1 to 100"
  btnReset.disabled = true;
  lastRandom = genRandomNumber(1, 100);
  //FOR DEBUGGING
  dbgRandom.innerText = "| curr answer: " + lastRandom.toString();
}

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

    resetForm();

    lblLastGuess.innerText = newMinRange + " to " + newMaxRange;
    lblRangeStatement.innerText = "Current Range: " + newMinRange + " to " + newMaxRange

    lastRandom = genRandomNumber(parseInt(newMinRange), parseInt(newMaxRange));
    btnReset.disabled = false;
    //FOR DEBUGGING
    dbgRandom.innerText = "| curr answer: " + lastRandom.toString();
  }

}

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

function guessFieldChanged() {
  var theGuess = txtGuess.value;

  if (theGuess.length > 0) {
    btnClear.disabled = false;
  } else {
    btnClear.disabled = true;
    lblGuessValidator.innerHTML = "&nbsp;";
  }
}


function guessNumber() {

  var lastGuess = txtGuess.value;


  if (isNaN(lastGuess) || isNaN(parseInt(lastGuess))) {
    lblGuessValidator.innerText = "Please enter a valid number";
  } else if (lastGuess < minRange || lastGuess > maxRange) {
    lblGuessValidator.innerText = "Please enter a number between " + minRange + " to " + maxRange + ".";
  } else {
    lblGuessValidator.innerHTML = "&nbsp;";
    lblLastGuessPre.innerText = "Your last guess was";
    lblLastGuess.innerText = lastGuess.toString();

    lastGuess = parseInt(lastGuess);

    var txtResult;
    var didYouWin = false;
    if (lastGuess > lastRandom) {
      txtResult = "That is too high";
    } else if (lastGuess < lastRandom) {
      txtResult = "That is too low";
    } else if (lastGuess === lastRandom) {
      txtResult = "BOOM!";
      didYouWin = true;
    } else {
      txtResult = "There was an error, please reset";
    }


    if (didYouWin) {
      setRange(minRange, maxRange);
      lblLastGuessPost.innerHTML = "BOOM! YOU WON! The range has been increased by 10 in each direction</br>still feeling lucky?";
    } else {
      lblLastGuessPost.innerText = txtResult;
    }

    btnReset.disabled = false;

  }
}

function genRandomNumber(min, max) {
  // syntax for random number: return Math.floor(Math.random()*(max-min+1)+min);
  minRange = min;
  maxRange = max;
  return Math.floor(Math.random() * (max - min + 1) + min);

  //return Math.floor((Math.random() * 100) + 1);
}
