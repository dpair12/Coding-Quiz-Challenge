//Variables declared in global scope
var nav = document.querySelector('#nav');
var navhigh = document.querySelector('#nav-highscore');
var timerEl = document.querySelector('#timer');
var landing = document.querySelector ('#landing');
var start = document.querySelector ('#start');
var container = document.querySelector('#question-container');
var qs = document.querySelector('#questions');
var option1 = document.querySelector('#option-1');
var option2 = document.querySelector('#option-2');
var option3 = document.querySelector('#option-3');
var option4 = document.querySelector('#option-4');
var verdict = document.querySelector('#verdict');
var resultsscreen = document.querySelector('#results');
var h1 = document.querySelector('h1');
var a = document.querySelector ('a');
var p = document.querySelector ('p');
var form = document.getElementById('myForm');
var currentQuestion = 0;
var score = 0;
var secondsLeft;
var timeInterval;
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//Questions for Quiz
var questions = [
  'Question 1: The Root Element is also known as the _____.',
  'Question 2: What does the command appendChild do in JavaScript?',
  'Question 3: How would you log the children of a document into the console?',
  'Question 4: How do you output the first child of the body into the console log?'
];
//Answer Choices for Quiz
var answers = [
  ['parent', 'child', 'top node', 'sibling'],
  ['adds new child to existing parent node', 'removes child from existing parent node', 'replaces existing child with a new child', 'hides child from being displayed'],
  ['console.log(document.body.children)', 'consolelog(document.body.children)', 'console.log(body.children)', 'consolelog(body.children)'],
  ['console.log(document.body.children[1])', 'consolelog(document.body.children[0])', 'console.log(documentbody.children[1])', 'console.log(document.body.children[0])']
];
//Correct Answer Choices for Quiz
var correctAnswers = ['top node', 'adds new child to existing parent node', 'console.log(document.body.children)', 'console.log(document.body.children[0])'];

//CSS for Project 
start.style = 'padding: 10px; background-color: green; color: white; font-size: 14px;';
form.style = 'data-state: hidden; display: none'; 
nav.style = 'display: flex; flex-wrap: wrap; justify-content: space-between; margin: 20px;'
a.style = 'text-decoration: none';
h1.style = 'font-size: 45px';
p.style = 'font-size: 20px';
landing.style = 'margin-left: 20px; margin-right: 20px; margin-top: 125px; text-align: center;';
container.style = 'display: none; margin: 20px;';

//Event Listener for when start quiz button is clicked it triggers the starQuiz function to start
start.addEventListener ('click', function () {
//triggers displayQuestion function to start
displayQuestion ();
//Defines secondsLeft variable with a number value of 90 to stand for 90 seconds
secondsLeft = 90;
//triggers timer function to start
timer ();
//removes content from landing page 
landing.innerHTML = '';
container.style.display = 'block';
});


//Function that allows questions and answerchoices to be displayed
function displayQuestion() {
  qs.textContent = questions[currentQuestion];
  option1.textContent = answers[currentQuestion][0];
  option2.textContent = answers[currentQuestion][1];
  option3.textContent = answers[currentQuestion][2];
  option4.textContent = answers[currentQuestion][3];

// Event Listener that validates user choice once it is clicked to determine if its correct or not in the checkAnswer function
  option1.addEventListener('click', checkAnswer);
  option2.addEventListener('click', checkAnswer);
  option3.addEventListener('click', checkAnswer);
  option4.addEventListener('click', checkAnswer);
}
// Function to validate user answers of quiz
function checkAnswer(event) {
  var selectedOption = event.target;
  var selectedAnswer = selectedOption.textContent;
  var correctAnswer = correctAnswers[currentQuestion];
// If selected answer is right, add 13 to score and display the message Correct!
  if (selectedAnswer === correctAnswer) {
    score += 13;
    verdict.textContent = 'Correct!';
    verdict.style.display = 'block';
// If selected answer is wrong, do not make any changes to score, substract 10 from the number value of the secondsLeft variable,  and display the Message Incorrect!
  } else {
    secondsLeft -= 10;
    verdict.textContent = 'Incorrect!';
    verdict.style.display = 'block';
  }
// Makes verdict messages disappear after a short time period
  setTimeout (() => {
    hideMessage ();
  }, 700);
// Calls nextQuestion function to be triggered
  nextQuestion();
}

// Function that helps hide verdict message so it can only be displayed when a conditional statement criteria is met
function hideMessage () {
  verdict.style.display = 'none';
}

//Sets timer countdown for Quiz
function timer () {
 timeInterval = setInterval(function () {
  // Subtracts timer number value by 1 
  secondsLeft--; 
  // Updates the text content of the time element
  timerEl.textContent = "Timer: " + secondsLeft ;

    // Checks if the countdown has reached 0
    if (secondsLeft === 0) {
      // Stops the execution of the interval
      clearInterval(timeInterval);

      // Calls the function to create and append the image
      results();
}}, 1000);

}

// Function that helps move things along to the next question
function nextQuestion() {
  currentQuestion++;
// Conditional Statement for when questions start to exceed Quiz length
  if (currentQuestion >= questions.length) {
    // Quiz is over, display the score
    setTimeout (() => {
      results ();
    }, 1000);
  } else {
    displayQuestion();
  }
}

// Function that shows final score and allows user to input information for their name to be shown on highscore list
function results() {
//Shows the form to users for them to insert their name to be shown on highscore list
  form.style = 'data-state: visible'; 
  container.textContent = '';
  resultsscreen.innerHTML = "<h1>All done!</h1><p>Your final score is: " + score + "</p>";

// Event Listener for when information from form is published
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    form.style.display = 'none';
    resultsscreen.innerHTML = '';
    // Get the input values
    var name = document.getElementById('name').value;

    // Do something with the input values
    console.log('Name:', name, ' - ', score);

    // Save the score to localStorage
    highScores.push({ name: name, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Display the high scores
    displayHighScores();
  });
}
// Function to display high scores using high-scores id 
function displayHighScores() {
  var highScoresList = document.getElementById('high-scores');
  highScoresList.innerHTML = '';

  highScores.forEach(function(entry) {
    var listItem = document.createElement('p');
    listItem.textContent = entry.name + ' - ' + entry.score;
    highScoresList.appendChild(listItem);
  });
//goBack and clear buttons
var goBack = document.createElement('button');
var clear = document.createElement('button');

goBack.id = 'goBackButton'
goBack.innerText = 'Go Back';

clear.id = 'clearButton'
clear.innerText = 'Clear HighScores';
// Event Listener for when Clear HighScores button is clicked
clear.addEventListener('click', function (){
  //Clears Names for HighScores List
  localStorage.clear();
  highScoresList.innerHTML = '';
  //Ensures goBack and clear buttons are still being displayed once highScoreList and Local Storage is cleared.
  highScoresList.appendChild(goBack);
  highScoresList.appendChild(clear);
});
//Adds goBack and clear as children to the highScoresList variable
highScoresList.appendChild(goBack);
highScoresList.appendChild(clear);

//Event Listener for when go Back button is clicked
goBack.addEventListener('click', function() {
// Redirect to beginning of index.html document
window.location.href = 'index.html';
});

}

//Event Listener for when someone clicks on 'View Highscores' in nav
navhigh.addEventListener('click', function (event){
  event.preventDefault();
  landing.innerHTML = '';
  container.innerHTML = '';
  displayHighScores ();
  timerEl.style.display = 'none';
  });

// Calls startQuiz function
startQuiz ();