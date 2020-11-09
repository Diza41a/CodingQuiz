//questions array
var questions = [
        {
            question: "What tag is used to define a standard cell inside a table?", 
            a: "A. <button>",
            b: "B. <h1> to <h6>",
            c: "C. <td>",
            d: "D. <footer>",
            answer: "C. <td>"
        },
        {
            question: "What does HTML stand for?", 
            a: "A. Hyper Trainer Marking Language",
            b: "B. Hyper Text Marketing Language",
            c: "C. Hyper Text Markup Language",
            d: "D. Hyper Text Markup Leveler",
            answer: "C. Hyper Text Markup Language"
        },
        {
            question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n\n" +
            "<p id='demo'>This is a demonstration.</p>",
            a: "A.  #demo.innerHTML = 'Hello World!';",
            b: "B.  document.getElement('p').innerHTML = 'Hello World!';",
            c: "C.  document.getElementByName('p').innerHTML = 'Hello World!';",
            d: "D.  document.querySelector('#demo').innerHTML = 'Hello World!';",
            answer: "D.  document.querySelector('#demo').innerHTML = 'Hello World!';"
        },
        {
            question: "What declaration MUST be included as the first item in an " + 
            "HTML document before the tag and is used to provide instructions to the web browser?", 
            a: "A. <embed>",
            b: "B. <caption>",
            c: "C. <code>",
            d: "D. <!DOCTYPE>",
            answer: "D. <!DOCTYPE>"
        },
        {
            question: "function -> count(a, b){return a + b;} is going to log sum of two given nums in console.", 
            a: "A. True",
            b: "B. False",
            answer: "B. False"
        },
        {
            question: "What is the definition of pseudo-class?", 
            a: "A. A CSS pseudo-class is a keyword added to a selector that specifies a special state of the selected element(s)",
            b: "B. A notation resembling a simplified programming language, used in program design.",
            answer: "A. A CSS pseudo-class is a keyword added to a selector that specifies a special state of the selected element(s)"
        },
        {
            question: "is this the correct syntax for defining border for a header in stylesheet.css file?\n"+
            "header{\nborder: black solid 1px;\n}",
            a: "A. Correct",
            b: "B. Incorrect",
            answer: "A. Correct"
        }
    ];
var time = 99;
var justLoaded = true;
var currScore = 0;
var questionEl = document.querySelector("#question"), testBodyEl = document.querySelector(".test-body"),
timer = document.querySelector("#timer"), skipBtn = document.querySelector("#skip-button");

var timeInterval = setInterval(function() {
    timer.textContent = time;
    time--;
}, 1000);

var currEntry = 0;

function displayQuestion(event){
    if (!justLoaded)
    {
        if (!justSkipped)
        {
            if (event.target.getAttribute("class")!=="answer")
            {
                return;
            }
        }
    }
    if (!justLoaded && !justSkipped)
    {
        if (event.target.textContent === questions[currEntry].answer)
        {
            alert("correct!");
            event.target.style.backgroundColor = "lightgreen";
            setTimeout('',2000);
        }
    }
    if(!justLoaded)
    {
        currEntry++;
    }
    testBodyEl.innerHTML = "";
    if (questions[currEntry]!==undefined)
    {
        var questionEntry = questions[currEntry];
        questionEl.textContent = questionEntry.question;
        
        function addAnswerEntry(custom_answer)
        {
            var div, p;
            div = document.createElement('div');
            p = document.createElement('p');
            p.textContent = custom_answer;
            p.setAttribute("class","answer")
            div.appendChild(p);
            div.setAttribute("class","answer");
            testBodyEl.appendChild(div);
        }

        addAnswerEntry(questionEntry.a);
        addAnswerEntry(questionEntry.b);
        
        if (questionEntry.hasOwnProperty('c'))
        {
            addAnswerEntry(questionEntry.c);
        }
        if (questionEntry.hasOwnProperty('d'))
        {
            addAnswerEntry(questionEntry.d)
        }
        // if(!justLoaded)
        // {
        //     currEntry++;
        // }
        if (questions[currEntry+1] === undefined)
        {
            skipBtn.textContent = "Last Question";
            skipBtn.style.backgroundColor = "darkgray";
        }
        //sidenote: later, store divs in array, and increase padding?/fontsize? to spread questions evenly 
    }
    if (justLoaded)
    {
        justLoaded = false;
    }
    justSkipped = false;
}

var justSkipped = false;
function skipQuestion(){
    justSkipped = true;
    //currEntry - 1
    if (questions[currEntry-1]!==undefined)
    {
        questions.push(questions[currEntry-1]);
        displayQuestion();
    }
    // else
    // {
    //     skipBtn.textContent = "Last Question";
    //     skipBtn.setAttribute("background-color","dark-gray");
    // }
}

document.onload = displayQuestion();
testBodyEl.addEventListener("click", displayQuestion);
skipBtn.addEventListener("click",skipQuestion);