
let questions = [
    {
      id: 1,
      question: "Inside which HTML tag do we put the JavaScript?",
      answer: "script",
      options: [
        "js",
        "javascript",
        "script",
        "style"
      ]
    },
    {
      id: 2,
      question: "Where is the correct place to insert a JavaScript?",
      answer: "The body section",
      options: [
        "The head section",
        "The html section",
        "The div section",
        "The body section"
      ]
    },
    {
      id: 3,
      question: "What is the correct syntax for referring to an external script? ",
      answer: "script src = '...'",
      options: [
        "script src = '...'",
        "script href = '...'",
        "script name = '...'",
        "None of these"
      ]
    },
    {
        id: 4,
        question: "How do you write 'Hello World' in an alert box?",
        answer: "alert('Hello World')",
        options: [
          "alertBox('Hello World')",
          "alert('Hello World')",
          "msgBox('Hello World')",
          "msg('Hello World')"
        ]
    },
    {
        id: 5,
        question: "How do you call a function in JavaScript? ",
        answer: "myFunction ()",
        options: [
          "fuction:myFunction()",
          "function = myFunction()",
          "function myFunction()",
          "myFunction ()"
        ]
      }
  ];
  
  let question_count = 0;
  let points = 0;
  
  window.onload = function() {
    show(question_count);
    let oneMinute = 60 * 1,
    display = document.querySelector('span.time');
    startTimer(oneMinute, display);
  };
  
  function next() {
    
    if (question_count == questions.length - 1) {
      location.href = "scores.html";
    }
    console.log(question_count);
  
    let user_answer = document.querySelector("li.option.active").innerHTML;
    
    if (user_answer == questions[question_count].answer) {
      points += 10 ;
      sessionStorage.setItem("points", points);
    }
    console.log(points);
  
    question_count++;
    show(question_count);
  }
  
  function show(count) {
    let question = document.getElementById("questions");
    let [first, second, third, fourth] = questions[count].options;
  
    question.innerHTML = `
    <h2>Q${count + 1}. ${questions[count].question}</h2>
     <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
  </ul> 
    `;
    toggleActive();
  }
  console.log(show)
  function toggleActive() {
    let option = document.querySelectorAll("li.option");
    for (let i = 0; i < option.length; i++) {
      option[i].onclick = function() {
        for (let i = 0; i < option.length; i++) {
          if (option[i].classList.contains("active")) {
            option[i].classList.remove("active");
          }
        }
        option[i].classList.add("active");
      };
    }
  }
      

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


let user_points = sessionStorage.getItem("points");
document.querySelector("span.points").innerHTML = user_points;


let user_name = sessionStorage.getItem("name");
document.querySelector("span.name").innerHTML = user_name;

let username = document.getElementById("username");
let saveScoreBtn = document.getElementById("saveScoreBtn");
let finalScore = document.getElementById("finalScore");
let mostRecentScore = localStorage.getItem("mostRecentScore");


let MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();

  let score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScoresList");
  window.location.assign("/");
};

// saveHighScore ()

let highScoresList = document.getElementById("highScoresList");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
