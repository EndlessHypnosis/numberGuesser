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


// Declaring Event Listeners

document.querySelector("#btnClear").addEventListener("click", clearForm);
document.querySelector("#btnGuess").addEventListener("click", guessNumber);
document.querySelector("#btnReset").addEventListener("click", resetForm);
document.querySelector("#btnSetRange").addEventListener("click", setRange);
document.querySelector("#txtGuess").addEventListener("input", guessFieldChanged);
document.querySelector("#txtMin").addEventListener("input", rangeFieldChanged);
document.querySelector("#txtMax").addEventListener("input", rangeFieldChanged);



// Global Variables & Initializers

var minRange;
var maxRange;
var lastRandom = genRandomNumber(1, 100);

var btnClear = document.querySelector("#btnClear");
btnClear.disabled = true;

document.querySelector("#btnReset").disabled = true;

//FOR DEBUGGING
document.querySelector("#dbgRandom").innerText = "| curr answer: " + lastRandom.toString();



// Functions
function clearForm() {

  document.querySelector("#txtMin").value = "";
  document.querySelector("#txtMax").value = "";

  document.querySelector("#txtGuess").value = "";
  document.querySelector("#lblGuessValidator").innerHTML = "&nbsp;";
  document.querySelector("#lblRangeValidator").innerHTML = "&nbsp;";
  document.querySelector("#btnClear").disabled = true;
}

function resetForm() {

  document.querySelector("#txtMin").value = "";
  document.querySelector("#txtMax").value = "";

  document.querySelector("#txtGuess").value = "";
  document.querySelector("#lblGuessValidator").innerHTML = "&nbsp;";
  document.querySelector("#lblRangeValidator").innerHTML = "&nbsp;";
  document.querySelector("#lblLastGuessPre").innerText = "Guess a number between";
  document.querySelector("#lblLastGuess").innerText = "1 to 100";
  document.querySelector("#lblLastGuessPost").innerText = "Are you feeling lucky?";
  document.querySelector("#lblRangeStatement").innerText = "Current Range: 1 to 100"
  document.querySelector("#btnReset").disabled = true;
  document.querySelector("#btnClear").disabled = true;
  lastRandom = genRandomNumber(1, 100);
  //FOR DEBUGGING
  document.querySelector("#dbgRandom").innerText = "| curr answer: " + lastRandom.toString();
}

function setRange(wonNewMin, wonNewMax) {

  var newMinRange;
  var newMaxRange;

  // if parameters are undefined, we know we're using the basic set range feature
  // else we know the range was updated via a win
  if (typeof wonNewMin === 'undefined' || typeof wonNewMax === 'undefined') {
    newMinRange = document.querySelector("#txtMin").value;
    newMaxRange = document.querySelector("#txtMax").value;
  } else {
    newMinRange = wonNewMin - 10;
    newMaxRange = wonNewMax + 10;
  }
  //since isNaN(null) returns false, we check vanilla isNaN but also after trying to parse to int.
  //Just parsing to int doesn't work because 123abc parses to an integer
  if (isNaN(parseInt(newMinRange)) || isNaN(parseInt(newMaxRange)) || isNaN(newMinRange) || isNaN(newMaxRange)) {
    document.querySelector("#lblRangeValidator").innerHTML = "Please enter a valid number";
  } else if (parseInt(newMinRange) >= parseInt(newMaxRange)) {
    document.querySelector("#lblRangeValidator").innerHTML = "Min Range must be less than Max Range";
  } else {
    document.querySelector("#lblRangeValidator").innerHTML = "&nbsp;"

    resetForm();

    document.querySelector("#lblLastGuess").innerText = newMinRange + " to " + newMaxRange;
    document.querySelector("#lblRangeStatement").innerText = "Current Range: " + newMinRange + " to " + newMaxRange

    lastRandom = genRandomNumber(parseInt(newMinRange), parseInt(newMaxRange));
    document.querySelector("#btnReset").disabled = false;
    //FOR DEBUGGING
    document.querySelector("#dbgRandom").innerText = "| curr answer: " + lastRandom.toString();
  }

}

function rangeFieldChanged() {
  var newMinRange = document.querySelector("#txtMin").value;
  var newMaxRange = document.querySelector("#txtMax").value;

  if (newMinRange.length > 0 || newMaxRange.length > 0) {
    document.querySelector("#btnClear").disabled = false;
  } else {
    document.querySelector("#btnClear").disabled = true;
    document.querySelector("#lblRangeValidator").innerHTML = "&nbsp;"
  }

}

function guessFieldChanged() {
  var theGuess = document.querySelector("#txtGuess").value;

  if (theGuess.length > 0) {
    document.querySelector("#btnClear").disabled = false;
  } else {
    document.querySelector("#btnClear").disabled = true;
    document.querySelector("#lblGuessValidator").innerHTML = "&nbsp;";
  }
}


function guessNumber() {

  var lastGuess = document.querySelector("#txtGuess").value;


  if (isNaN(lastGuess) || isNaN(parseInt(lastGuess))) {
    document.querySelector("#lblGuessValidator").innerText = "Please enter a valid number";
  } else if (lastGuess < minRange || lastGuess > maxRange) {
    document.querySelector("#lblGuessValidator").innerText = "Please enter a number between " + minRange + " to " + maxRange + ".";
  } else {
    document.querySelector("#lblGuessValidator").innerHTML = "&nbsp;";
    document.querySelector("#lblLastGuessPre").innerText = "Your last guess was";
    document.querySelector("#lblLastGuess").innerText = lastGuess.toString();

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

    document.querySelector("#lblLastGuessPost").innerText = txtResult;
    document.querySelector("#btnReset").disabled = false;

    if (didYouWin) {
      setRange(minRange, maxRange);
      document.querySelector("#lblLastGuessPost").innerHTML = "BOOM! YOU WON! The range has been increased by 10 in each direction</br>still feeling lucky?";
    }

  }
}

function genRandomNumber(min, max) {
  // syntax for random number: return Math.floor(Math.random()*(max-min+1)+min);
  minRange = min;
  maxRange = max;
  return Math.floor(Math.random() * (max - min + 1) + min);

  //return Math.floor((Math.random() * 100) + 1);
}
