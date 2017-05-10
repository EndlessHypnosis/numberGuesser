# Number Guesser by Nick Svetnicka for Turing

![ScreenShot of App](_ss.png?raw=true "ScreenShot of App")

## Introduction

> A game in which the user tries to guess a random number between a certain range. This range is defaulted to 1 - 100, but can be manually set. The most recent guess is displayed along with hints as to whether the guess was too high or too low. If the user guesses the number exactly, the lower and upper bound on the range is automatically increased by 10.

## Features

* Initializes by generating a random number between 1 and 100
* Min and Max Range inputs for re-defining the range between which the random number is generated
* A Clear and Reset button is available (enabled when applicable) to clear the inputs or reset back to initial state
* Both the range and guess inputs have full validation (valid number and within range)
* Upon successfully guessing the random number, the range will automatically be expanded by 10 in each direction

## Tips/Tricks

* While playing the game, the current answer is displayed in the footer (to help with testing)
* Try breaking the game (invalid inputs, guesses outside the range, min range > max range)

## Built With

* HTML
* CSS
* JavaScript

## Team

> Nick Svetnicka
