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

// Generate an array of all the pokemons
for (var i = 1; i < 152; i++) {
    oneTo151.push(i);
    allPokemons = oneTo151;
};

// Function to set up / updating scores
var update = function() {
    foreverScore.textContent = currentForeverScore;
    foreverBest.textContent = bestForeverScore;
    timedScore.textContent = currentTimedScore;
    timedBest.textContent = bestTimedScore;
};

// Records the Pokemon's Name into nameArray, type into typeArray & image url into imgArray
var responseHandler = function() {
	results = JSON.parse(this.responseText);
	console.log(results);
    namesArray.push(results.name);
    imgArray.push(results.sprites.front_default);
    tempArr = [];

    if ( results.types.length < 2) {
        typeArray.push( [results.types[0].type.name] );
    } else if ( results.types.length > 1 ) {
        for ( var i = 0; i < 2; i++ ) {
            tempArr.push( results.types[i].type.name );
        } typeArray.push( tempArr );
    };
};

// Shuffling the order of Pokemons being shown
var shuffle = function() {
	for (var i = 151; i > 0; i--) {
		rNum = Math.floor( Math.random()*i );
		shuffledPokemons.push(rNum);
	} console.log(shuffledPokemons);
};

// Function to get a random Pokemon from the remaining Pokemons
var getPokemon = function() {

    for ( var i = 0; i < 4; i++ ) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
    	request.open("GET", "http://pokeapi.co/api/v2/pokemon/" + shuffledPokemons[i] + "/");
    	request.send();
    };
};

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
	if ( currentImg === null )
		return false;

	var canvas = document.getElementById("myCanvas")
		ctx = canvas.getContext("2d");
		shownImage = new Image();
		shownImage.src = imgArray[0];
		shownImage.setAttribute("crossorigin","Anonymous");

		// onload is used to ensure image has has finished loading
		shownImage.onload = function() {
			if ( shownImage.width <= 100 ) {
				canvas.width = shownImage.width * 4;
				canvas.height = shownImage.height * 4;
			} else {
				canvas.width = shownImage.width;
				canvas.height = shownImage.height;
			}

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
    if ( document.getElementById("name-input").value == namesArray[0] ) {
        revealPokemon();

        // Add difficulty conditions here

        currentForeverScore++
        update();
        imgArray.shift(1,1);
        namesArray.shift(1,1);
        typeArray.shift(1,1);

        setTimeout(clearAndDraw, 1000);
    };
};

















update();
shuffle();









