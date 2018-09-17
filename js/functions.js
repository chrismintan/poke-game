var currentPokeNum;
var pastPokemons = [];
var oneTo151 = [];
var currentType = [];
var currentName;
var currentPokemonURL;
var shuffledPokemons = [];
var currentImg;
var currentForeverScore = 0;
var bestForeverScore = 0;
var currentTimedScore = 0;
var bestTimedScore = 0;
var typed;
var foreverScore = document.getElementById("forever-current-score");
var foreverBest = document.getElementById("forever-best-score");
var timedScore = document.getElementById("timed-current-score");
var timedBest = document.getElementById("timed-best-score");
var canvas = document.getElementById("myCanvas");
var namesArray = [];
var imgArray = [];
var typeArray = [];
var seconds = 10;
var turn;
var difficulty = 2;
var gameMode = 0;

// Setting up buttons for difficulty and game modes
var easyButton = document.getElementById("easy");
var mediumButton = document.getElementById("medium");
var hardButton = document.getElementById("hard");
var hintButton = document.getElementById("hint");
var foreverButton = document.getElementById("forever");
var timedButton = document.getElementById("timed");
var startButton = document.getElementById("start-button");
var restartButton = document.getElementById("restart");

// Setting up variable for progress-bar
var progressBar = document.getElementById("progressBar");
var counter = document.getElementById("progress");

// Functions to change difficulty
var changeEasy = function() {
    difficulty = 1;
    mediumButton.classList.remove("selected");
    hardButton.classList.remove("selected");
    easyButton.classList.add("selected");
    getPokemon();
};

var changeMedium = function() {
    difficulty = 2;
    hardButton.classList.remove("selected");
    easyButton.classList.remove("selected");
    mediumButton.classList.add("selected");
    getPokemon();
};

var changeHard = function() {
    difficulty = 3;
    easyButton.classList.remove("selected");
    mediumButton.classList.remove("selected");
    hardButton.classList.add("selected");
    getPokemon();
};

var foreverMode = function() {
    gameMode = 1;
    timedButton.classList.remove("selected");
    foreverButton.classList.add("selected");
};

var timedMode = function() {
    foreverButton.classList.remove("selected");
    timedButton.classList.add("selected");
}

var giveHint = function() {
    console.log("hint!");
};

// Function to remove all event listeners and cursor change
var removeAllListeners = function() {
    easyButton.removeEventListener("click", changeEasy);
    mediumButton.removeEventListener("click", changeMedium);
    hardButton.removeEventListener("click", changeHard);
    startButton.removeEventListener("click", gameInit);

    easyButton.style.cursor = "default";
    mediumButton.style.cursor = "default";
    hardButton.style.cursor = "default";
    foreverButton.style.cursor = "default";
    timedButton.style.cursor = "default";
    startButton.style.cursor = "default";
};

var restartGame = function() {
    clearCanvas();
    currentForeverScore = 0;
    currentTimedScore = 0;
    progress.textContent = "";
    setUpListeners();
    update();
    shuffle();
    updateBar();
    imgArray = [];
    namesArray = [];
    typeArray = [];
    seconds = 10;
};

var gameInit = function() {
    rm = document.getElementById("type-input");
    if ( gameMode == 1 ) {
        if ( difficulty == 3 ) {
            progress.textContent = "0/151";
        };

        if ( difficulty == 1 ) {
            drawShadow();
            progress.textContent = "0/151";
            rm.style.display = "none";
        };
        if ( difficulty == 2 ) {
            drawShadow();
            progress.textContent = "0/151";
            rm.style.display = "none";
        };
        removeAllListeners();
    };
    if ( gameMode == 2 ) {
        if ( difficulty == 3 ) {

        };
        if ( difficulty == 1 ) {
            drawShadow();
            progress.textContent = seconds;
            startTimedGame();
            rm.style.display = "none";
        };
        if ( difficulty == 2 ) {
            drawShadow()
            progress.textContent = seconds;
            startTimedGame();
            rm.style.display = "none";
        };
    };
};

// Adding event listeners to the difficulty selectors
var setUpListeners = function() {
    easyButton.addEventListener("click", changeEasy);
    mediumButton.addEventListener("click", changeMedium);
    hardButton.addEventListener("click", changeHard);
    foreverButton.addEventListener("click", foreverMode);
    timedButton.addEventListener("click", timedMode);
    hintButton.addEventListener("click", giveHint);
    startButton.addEventListener("click", gameInit);
    restartButton.addEventListener("click",restartGame);

    easyButton.style.cursor = "pointer";
    mediumButton.style.cursor = "pointer";
    hardButton.style.cursor = "pointer";
    foreverButton.style.cursor = "pointer";
    timedButton.style.cursor = "pointer";
    startButton.style.cursor = "pointer";

    easyButton.style.backgroundColor = "";
    mediumButton.style.backgroundColor = "";
    hardButton.style.backgroundColor = "";
    foreverButton.style.backgroundColor = "";
    timedButton.style.backgroundColor = "";
    startButton.style.backgroundColor = "";
};

// Generate an array of all the pokemons
for (var i = 1; i < 152; i++) {
    oneTo151.push(i);
    allPokemons = oneTo151;
};

// Progress bar manipulation for forever mode
var updateBar = function() {
    if ( gameMode == 1 ) {
        var percentage = parseInt(currentForeverScore) / 151;
        percentage = percentage * 100;
        progressBar.style.width = percentage + "%";
        progress.textContent = currentForeverScore + "/151";
    };

    if ( gameMode == 2 ) {
        progress.textContent = seconds;
        percent = (seconds/10)*100;
        progressBar.style.width = percent + "%";
        if ( seconds < 0 ) {
            clearCanvas;
        };
    };
};

// Function to set up / updating scores
var update = function() {
    foreverScore.textContent = currentForeverScore;
    foreverBest.textContent = bestForeverScore;
    timedScore.textContent = currentTimedScore;
    timedBest.textContent = bestTimedScore;
    updateBar();
};
//var tt = [];
// Records the Pokemon's Name into nameArray, type into typeArray & image url into imgArray
var responseHandler = function() {
	results = JSON.parse(this.responseText);
	console.log(results);
    namesArray.push(results.name);

    tempArr = [];
    if ( results.types.length < 2) {
        typeArray.push( [results.types[0].type.name] );
    } else if ( results.types.length > 1 ) {
        for ( var i = 0; i < 2; i++ ) {
            tempArr.push( results.types[i].type.name );
        } typeArray.push( tempArr );
    };

    // if ( difficulty == 1 ) {

    //     if ( results.id > 0 && results.id <10 ) {
    //     imgArray.push("https://assets.pokemon.com/assets/cms2/img/pokedex/full/00" + results.id + ".png");


    //     };
    //     if ( results.id > 9 && results.id < 100 ) {
    //     imgArray.push("https://assets.pokemon.com/assets/cms2/img/pokedex/full/0" + results.id + ".png");

    //     };
    //     if ( results.id > 99 ) {
    //     imgArray.push("https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + results.id + ".png");
    //     };
    // };

    if ( difficulty == 1 ) {
        imgArray.push("https://serebii.net/art/th/" + results.id + ".png");
    };

    if ( difficulty == 2 || difficulty == 3 ) {
        imgArray.push(results.sprites.front_default);
    };
};

// Shuffling the order of Pokemons being shown
var shuffle = function() {
    shuffledPokemons = [];
	for (var i = 151; i > 0; i--) {
		rNum = Math.floor( Math.random()*i );
		shuffledPokemons.push(rNum);
	} console.log(shuffledPokemons);
};

// Function to get a random Pokemon from the remaining Pokemons
var getPokemon = function() {
    for ( var i = 0; i < 8; i++ ) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
    	request.open("GET", "http://pokeapi.co/api/v2/pokemon/" + shuffledPokemons[0] + "/");
    	request.send();
        // Removing Pokemons which data we already have searched for
        shuffledPokemons.shift(1,8);

    };
};

/*
var getInAdvance = function() {
    if ( nameArray.length < 4 )
    for ( var i = 4; i < 8; i++ ) {
        request.addEventListener("load", responseHandler);
        request.open("GET", "http://pokeapi.co/api/v2/pokemon/" + shuffledPokemons[i] + "/");
        request.send();
    };
};
*/

// Legacy version
/*
var setUpGame = function() {
	currentName = currentPokemonData.name;
	if ( currentPokemonData.types.length < 2 ) {
		currentType.push(currentPokemonData.types[0].type.name);
	};
	if ( currentPokemonData.types.length > 2 ) {
		for (var i = 0; i < currentPokemonData.types[0].type.length; i++) {
			currentType.push(currentPokemonData.types[0].type[i]);
		};
	};
	currentImg = currentPokemonData.sprites.front_default;
};
*/

/*
 	Function: drawShadow
	Makes all pixels of the image that is on the <canvas> black.

    Other difficulties ideas - use clearer image (try from official Pokemon website)
	Pikachu from official Pokemon site for testing
	"https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
*/

var drawShadow = function() {

	var canvas = document.getElementById("myCanvas")
		ctx = canvas.getContext("2d");
		shownImage = new Image();
		shownImage.src = imgArray[0];
		shownImage.setAttribute("crossorigin","Anonymous");

		// onload is used to ensure image has has finished loading
		shownImage.onload = function() {
            if ( difficulty != 1 ) {

    			if ( shownImage.width <= 100 ) {
    				canvas.width = shownImage.width * 4;
    				canvas.height = shownImage.height * 4;
    			} else {
    				canvas.width = shownImage.width;
    				canvas.height = shownImage.height;
    			};
            };

			ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);

			var baseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);


				for (var i = 0; i < baseImage.data.length; i+=4 ) {
	                if( baseImage.data[i+3] >= 100 ) {
	                    baseImage.data[i] = 30;
	                    baseImage.data[i+1] = 30;
	                    baseImage.data[i+2] = 30;
	                    baseImage.data[i+3] = 255;
	            };
			};

			ctx.putImageData( baseImage, 0, 0 );
		};
};

var revealPokemon = function() {
	var canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	shownImage = new Image();
	shownImage.src = imgArray[0];

    shownImage.onload = function() {
    if ( shownImage.width <= 100 ) {
        canvas.width = shownImage.width * 4;
        canvas.height = shownImage.height * 4;
    } else {
        canvas.width = shownImage.width;
        canvas.height = shownImage.height;
    }

    ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);

    };
};

var clearCanvas = function() {
    cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, canvas.width, canvas.height);
};

var clearInputFields = function() {
    document.getElementById("name-input").value = "";
    document.getElementById("type-input").value = "";
};

var clearAndDraw = function() {
    clearCanvas();
    drawShadow();
    clearInputFields();
};

// Function for checking the name of the Pokemon
var nameCheck = function() {

    if ( difficulty == 1 || difficulty == 2 ){

        if ( document.getElementById("name-input").value == namesArray[0] ) {
            revealPokemon();

            // Add difficulty conditions here
            currentForeverScore++
            if ( currentForeverScore > bestForeverScore ) {
                bestForeverScore = currentForeverScore;
            };

            if ( currentTimedScore > bestTimedScore ) {
                bestTimedScore = currentTimedScore;
            };

            update();
            imgArray.shift(1,1);
            namesArray.shift(1,1);
            typeArray.shift(1,1);

            // Make AJAX request in advance once array has less than 4
            // This is to avoid any 'lag'
            if ( imgArray.length < 4 ) {
                getPokemon();
            };

            // Timeout delay of 1 second so that user can see the Pokemon before clearing the canvas
            setTimeout(clearAndDraw, 1000);
        };
    };
    if ( difficulty == 3 ) {
        if ( document.getElementById("name-input").value == namesArray[0] && typeArray[0].includes(document.getElementById("type-input").value)) {
            revealPokemon();
            currentForeverScore++
            if ( currentForeverScore > bestForeverScore ) {
                bestForeverScore = currentForeverScore;
            };

            if ( currentTimedScore > bestTimedScore ) {
                bestTimedScore = currentTimedScore;
            };
            update();
            imgArray.shift(1,1);
            namesArray.shift(1,1);
            typeArray.shift(1,1);

            if ( imgArray.length < 4 ) {
                getPokemon();
            };
            setTimeout(clearAndDraw, 1000);
        };
    };
};

var seconds = 10;

var timeoutID;

var timeMode = function() {
    seconds = seconds - 0.01;
    if ( seconds < 0 ) {
        clearTimeout(timeoutID);
    };
    updateBar();
};

var startTimedGame = function() {
    timeoutID = setInterval(timeMode, 10);
};

var stopTime = function() {
    clearTimeout(timeoutID);
};

setUpListeners();
update();
shuffle();








