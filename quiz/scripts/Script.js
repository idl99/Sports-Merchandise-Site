function QuizItem(question, variants, answer, enabled, replied, selectionOfUser) {
	this.question = question;
	this.variants = variants;
	this.answer = answer;
	this.enabled = enabled;
	this.replied = replied;
	this.selectionOfUser = selectionOfUser;
}


var quizQuestions = [];
quizQuestions[0] = new QuizItem("Which player was the result of the British Transfer Fee Record for a player sold ?", 
						["David Beckham",
						 "Cristiano Ronaldo",
						 "Neymar Jr",
						 "Kane"], 
						 1,
						 false,
						 false,
						 undefined);

quizQuestions[1] = new QuizItem("Which player is the highest rated of football ?", 
						["Cristiano Ronaldo",
						 "Messi",
						 "Sergio ramos",
						 "Dani Alves"],
						 0,
						 false,
						 false,
						 undefined);

quizQuestions[2] = new QuizItem("Who has scored the most goals in a Premiership debut season ?",
						["Fernando Torres",
						 "Cristiano Ronaldo",
						 "Messi",
						 "Lukaku"],
						 0,
						 false,
						 false,
						undefined);

quizQuestions[3] = new QuizItem("Micheal Carrick (CDM) Central Defence Mid player which club is he playing ?",
						["Arsenal", "Chelsea", "Manchester Utd","neither"],
						2,
						false,
						false,
						undefined);

quizQuestions[4] = new QuizItem("What Formation Do Real madrid have ?",
						["4-2-3-1 Formation",
						"4-3-3 Formation",
						"4-2-1-3 Frmation"],
						1,
						false,
						false,
						undefined);
quizQuestions[5] = new QuizItem("Which club has had the most losses in the top flight 'Premier League' ?",
						["West Ham Utd",
						"Arsenal",
						"Manchester Utd",
						"Everton"],
						3,
						false,
						false,
						undefined);
quizQuestions[6] = new QuizItem("In August, Paris St-Germain smashed the world transfer record in buying Neymar from Barcelona. Including transfer fee and wages over his five-year contract, what will the total outlay be on the deal by the French club ?",
						["$330m",
						"$400m",
						"$290m"],
						1,
						false,
						false,
						undefined);
quizQuestions[7] = new QuizItem("Which player was top scorer during European qualification for the 2018 World Cup in Russia ?",
						["Cristiano Ronaldo",
						"Robert Lewandowski",
						"Eden Hazard",
						"Messi"],
						1,
						false,
						false,
						undefined);
quizQuestions[8] = new QuizItem("Which country has won the World Cup the most times ?",
						["England",
						"Italy",
						"Brasil",
						"Everton"],
						2,
						false,
						false,
						undefined);
quizQuestions[9] = new QuizItem("Which footballer has 'written' the most books ?",
						["Henry",
						"Maradona",
						"Messi",
						"David Beckham"],
						3,
						false,
						false,
						undefined);
						
						
// pTag.innerHTML = test1.question;
// console.log(quizQuestions[0]);
var currentIndex = 0, numOfAnswered = 0;
var currentQuestion = quizQuestions[currentIndex];
//second ulTag 
var ulTag = document.getElementsByTagName('ul')[1];
var liTags = ulTag.getElementsByTagName('li');
/*
	this function inserts the current question into the layout
	of the page: p tag which is a question and ul tag meaning
	an options
*/
function showCurrentQuestion(){
	var headerOfDropdow = document.getElementsByClassName('wrapper')[0];
	//parse into integer, because it interpretes it as a string
	var numQuestion = parseInt(currentIndex)+1;
	headerOfDropdow.getElementsByTagName('span')[0].innerHTML = numQuestion;
	var pTag = document.getElementsByTagName('p')[0];
	// console.log(liTags);
	var ulTag = document.getElementsByTagName('ul')[1];
	var liTags = ulTag.getElementsByTagName('li');
	pTag.innerHTML = currentQuestion.question;
	for (var i=0; i < liTags.length; i++) {
		//in case the number of variants is less than 4 (e.g. when it's
		// undefined) disable li tag
		if (currentQuestion.variants[i] == undefined) {
			console.log(currentQuestion.variants[i]);
			liTags[i].className = "doNotDisplay";
		} else {
			console.log(currentQuestion.variants[i]);
			liTags[i].innerHTML = currentQuestion.variants[i];//assign question
			liTags[i].className = "";
		}
	}
};

enableLiOnClickEvents();
showCurrentQuestion();

//when a variant is selected it becomes highlighted 
function changeLiStyle() {
	var selectedItem = document.getElementsByClassName('selected')[0];
	//disable previously selected item and enable the clicked one
	if (selectedItem) selectedItem.className = "";
	this.className = "selected";
}


//self-invoking function to find all li tags 
// and assing them text from the object 
// and assign event listeners
function enableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		console.log(liTags[i]);
		liTags[i].onclick = changeLiStyle;
	}
};

var button = document.getElementsByClassName('submit')[0];
button.onclick = submitAndCheckAnswer;

function submitAndCheckAnswer() {
	var selectedItem = document.getElementsByClassName('selected')[0];
/*	console.log(selectedItem.innerHTML);*/
 if (selectedItem == undefined)
   		alert("There is no variant selected! Please select any!");
else {
   currentQuestion.enabled = true;
	if (selectedItem.innerHTML == currentQuestion.variants[currentQuestion.answer]) {
		
		console.log("Correct "+ currentQuestion.variants.indexOf(selectedItem.innerHTML));
		changeTheLayoutAccordingTheResult(selectedItem,"correct", true);
		checkIfTheLastQuestion(this);//sending button obj as a parameter
		numOfAnswered++;
		
	} else {
		
		console.log("Wrong!");
		changeTheLayoutAccordingTheResult(selectedItem,"wrong", false);
		checkIfTheLastQuestion(this);
		liTags[currentQuestion.answer].className = "correct";
	}	
}
}

function changeTheLayoutAccordingTheResult(selectedItem,result,replied) {
	console.log(result);
	currentQuestion.replied = replied;
	//the index corresponding to the selection of user is selectiOfUser
	currentQuestion.selectionOfUser = currentQuestion.variants.indexOf(selectedItem.innerHTML);
	selectedItem.className=result;//changing color of selected item by changing className
	disableLiOnClickEvents();//cannot click on the other litags anymore
}

//if the current question is the last one then change button style
//and onclick event(function)
//to finalize, otherwise continue to the next question 
function checkIfTheLastQuestion(button) {
	console.log("currentIndex: ",currentIndex);
	if (currentIndex == quizQuestions.length-1) {
			console.log(currentIndex +" " + quizQuestions.length);
			button.className = "finalize";//change the color
			button.innerHTML = "Finalize";
			button.onclick = finalize;//change event listener
		} else {
			console.log(currentIndex +"fdsf " + quizQuestions.length);
			currentIndex++;
			button.innerHTML = "Next Question";
			button.className = "next";
			button.onclick = goToNextQuestion;
		}
}

function disableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		liTags[i].onclick = "";
	}
}

function goToNextQuestion() {
	// if (currentIndex == quizQuestions.length) {
	// 	finalize();
	// 	return alert("Quiz is over. Your result: " + numOfAnswered);
	// }
	//changes the current question index before moving to the next one
	currentQuestion = quizQuestions[currentIndex];
	//change button's label and event handler
	this.innerHTML = "Submit";
	this.onclick = submitAndCheckAnswer;
	this.className = "submit";
	showCurrentQuestion();
	enableLiOnClickEvents();
}

function cleanUpTheLayout() {
	var mainDiv = document.getElementsByClassName('main')[0];
	// deleting all child nodes 
	while (mainDiv.hasChildNodes()) {
		mainDiv.removeChild(mainDiv.firstChild);
	}
	console.log("clean UPP!!");
}

function finalize() {
	cleanUpTheLayout();
	var mainDiv = document.getElementsByClassName('main')[0];
	var tHeader = document.createElement("p");
	tHeader.appendChild(document.createTextNode("Review your answers"));
	tHeader.setAttribute("class","pAboveTable");
	mainDiv.appendChild(tHeader);
	var table = document.createElement("table");
	// table.border='1px';
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var heading = ["Questions", "Your results", "Correct option"];
	
	for (var i = 0 ; i < heading.length ; i++) {
		var th = document.createElement("th");
		th.width = '200px';
		th.appendChild(document.createTextNode(heading[i]));
		tr.appendChild(th);
		console.log(tr);
	}

	for (var i = 0 ; i < quizQuestions.length; i++) {
			
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.appendChild(document.createTextNode("Question " + (i+1)));
			td.setAttribute("class","questionCol");
			tr.appendChild(td);
			var td = document.createElement('td');
			
			var answer = quizQuestions[i].replied ? (
				td.className = "correctCol",
				"Correct"
				) : (
				td.className = "wrongCol",
				"Incorrect"
				);
			
			td.appendChild(document.createTextNode(answer));
			tr.appendChild(td);
			var td = document.createElement('td');
			if (!quizQuestions[i].replied) {
				var correctAns = quizQuestions[i].variants[quizQuestions[i].answer];
				td.appendChild(document.createTextNode(correctAns));
				td.setAttribute("class","correctCol");
			}
			tr.appendChild(td);
			
			table.appendChild(tr);

	}
	
	mainDiv.appendChild(table);
	var trAll = document.getElementsByTagName("tr");
	console.log(trAll);
	for (var i = 1; i < trAll.length; i++) {
		trAll[i].onclick = returnToQuestion;
		console.log("Assigned!");
	}
		
}
//dynamicaally creates the question layout when clicked on any of the questions in the result table
function createQuestionLayout() {
			var mainDiv = document.getElementsByClassName('main')[0];
			var wrapperDiv = document.createElement('div');
			wrapperDiv.className = "wrapper";
			wrapperDiv.onclick = "showDropdown";
			mainDiv.appendChild(wrapperDiv);
			for (var j = 0 ; j < 2; j++) {
				var span = document.createElement('span');
				wrapperDiv.appendChild(span);
			}
			span.innerHTML = "/ "+quizQuestions.length;
			var ulDdown = document.createElement('ul');
			ulDdown.className = "dropdown";
			mainDiv.appendChild(ulDdown);
			var pTag = document.createElement('p');
			pTag.className = "question";
			var ulTag = document.createElement('ul');
			mainDiv.appendChild(pTag);
			mainDiv.appendChild(ulTag);
			for (var i = 0 ; i < 4; i++) {
				var liTag = document.createElement('li');
				ulTag.appendChild(liTag);
				var liTag1 = document.createElement('li');
				ulDdown.appendChild(liTag1);
			}
			var button = document.createElement('button');
			button.innerHTML = "Back";
			button.className = "back";
      //goes back to the table layout when clicked
			button.onclick = finalize;
			mainDiv.appendChild(button);
}

function returnToQuestion() {
	console.log(this);
	var questionTitle = this.getElementsByClassName("questionCol")[0].innerHTML;
	var questionNum = questionTitle[questionTitle.length -1];
	
 
 			cleanUpTheLayout();
			createQuestionLayout();
			currentQuestion = quizQuestions[questionNum -1];
			// change currentIndex in orderto correctly display
			// it on the new layout
			currentIndex = questionNum-1;
			showCurrentQuestion();
			var correctLiNum = quizQuestions[questionNum-1].answer;
  if (quizQuestions[questionNum-1].enabled) {
	 	if (quizQuestions[questionNum-1].replied) {
	 		
			document.getElementsByTagName("li")[correctLiNum+4].className="correct";
		} else {
			var selectedLiNum = quizQuestions[questionNum-1].selectionOfUser;
			document.getElementsByTagName("li")[selectedLiNum+4].className="wrong";
			document.getElementsByTagName("li")[correctLiNum+4].className="correct";
		
	 }
}
}

function showDropdown() {
	var dropdown = document.getElementsByClassName("dropdown")[0];
	 var dropdownItems = dropdown.getElementsByTagName("li");
	 console.log(dropdownItems);
	 for (var i = 0 ; i < dropdownItems.length; i++)
	 	dropdownItems[i].onclick = clickOnAnyQuestionFromDropdown;
	var display = dropdown.style.display;
	if (display=="") {
		dropdown.style.display = "block";
	} 
	else {
		dropdown.style.display ="";
	};
}

function hideDropdown() {
	var dropdown = document.getElementsByClassName("dropdown")[0];
	var dropdownItems = dropdown.getElementsByTagName("li");
	var display = dropdown.style.display;
	if (display=="") {
		dropdown.style.display = "block";
	} 
	else {
		dropdown.style.display ="";
	};
}

/*
the number of action taken when any of the ul items is clicked on:
getting the number of question and show the current question
*/
function clickOnAnyQuestionFromDropdown() {
	console.log(this);
	var questionNum = this.getElementsByTagName('span')[0].innerHTML;
	currentQuestion = quizQuestions[questionNum-1];
	hideDropdown();
	currentIndex = questionNum-1;
	showCurrentQuestion();
}
