var currentPokeNum;
var pastPokemons = [];
var oneTo151 = [];
var currentType = [];
var currentName;
var currentPokemonURL;
var shuffledPokemons = [];
var currentImg;

// Generate an array of all the pokemons
for (var i = 1; i < 152; i++) {
	oneTo151.push(i);
	allPokemons = oneTo151;
};

// Records the random Pokemon's Name & Type
var responseHandler = function() {
	results = JSON.parse(this.responseText);
	currentPokemonData = results;
	console.log(currentPokemonData);
};

var request = new XMLHttpRequest();

request.addEventListener("load", responseHandler);

var requestFailed = function() {
	console.log("Error");
}

request.addEventListener("error", requestFailed);

// Shuffling the order of Pokemons being shown
var shuffle = function() {
	for (var i = 151; i > 0; i--) {
		rNum = Math.floor( Math.random()*i );
		shuffledPokemons.push(rNum);
	} console.log(shuffledPokemons);
};

// Function to get a random Pokemon from the remaining Pokemons
var getPokemon = function() {
	request.open("GET", "http://pokeapi.co/api/v2/pokemon/" + shuffledPokemons[0] + "/");
	request.send();
	shuffledPokemons.shift();
};

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
	canvas = document.getElementById("myCanvas");
};

/*
 	Function: drawShadow
	Makes all pixels of the image that is on the <canvas> black.
	
	Pikachu from official Pokemon site for testing
	"https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
	
*/

var drawShadow = function() {
	if ( currentImg === null )
		return false;

	var canvas = document.getElementById("myCanvas")
		ctx = canvas.getContext("2d");
		shownImage = new Image();
		shownImage.src = currentImg;
		shownImage.setAttribute("crossorigin","Anonymous");
		
		// onload is used to ensure image is loaded before coloring it all black
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
	shownImage = new Image()
	shownImage.src = currentImg;
	ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
};




















shuffle();









