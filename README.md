# Who's That Pokémon!
[**Who's That Pokémon**](https://chrismintan.github.io/whos-that-pokemon/) is a game developed for a [project assignment](https://github.com/wdi-sg/project-1) at General Assembly's Web Development Immersive (WDI) Course.

## How to play
This project is inspired by the popular question-and-answer segment that is featured in numerous episodes of the Pokémon anime. There are three different difficulty settings and two different game modes in this game. The easiest setting is Greyscale which shows Pokémons in the OG Game Boy non colored version. Shadow is the normal version of showing just the silhouette of the Pokémon and the user would have to input the name. Extreme involves having to input both the Pokémon's name and type. For Pokémons with multiple types, only one type would be required to be inputted.

### Demo
You can see how the game works below:

![Demo Gif](https://github.com/chrismintan/whos-that-pokemon/blob/master/assets/shadow.gif)

[Link to Game](https://chrismintan.github.io/whos-that-pokemon/)

Have fun playing! For more information on how I made the game read on!

## Application and Development Process
### Built With
[HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) - Asynchronous JavaScript And XML.

### AJAX Call
An AJAX request is made to [PokéAPI](https://pokeapi.co/) which is a website which provides a RESTful API interface to highly detailed objects built from thousands of lines of data related to Pokémon. The game works by getting Pokémon data via this API by performing an AJAX Call.

```
var request = new XMLHttpRequest()
    request.addEventListener("load", responseHandler)
   	request.open("GET", `https://pokeapi.co/api/v2/pokemon/${Pokemon_ID}/`
   	request.send()
```

The website then returns a bunch of data relating to the Pokémon requested in JSON format. The JSON data would then be parsed and the data required (namely the Pokémon's Name, Type, and Image URL) would be pushed into an array. Now with this data, I am able to use Canvas to create the game!

### Drawing on Canvas
[Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) draws images by creating image Objects and assigning their src, x and y positions, width and height. The main function of Canvas used in this project is it's ability to manipulate the pixels of a picture. The Image data taken from PokéAPI comes in the form of a **sprite**, which you will see later why it is so crucial.

There are many properties of a sprite but the one most crucial to this project would be that it is a "stand-alone" graphic element. Meaning that unlike normal pictures, it only has pixels where relavent.

![Sprite vs Non-sprite](https://github.com/chrismintan/whos-that-pokemon/blob/master/assets/sprite-vs-image.png)

In our case, the Pokémon image only has pixels where the Pokémon is. This allows the sprite to be placed on a background without having a white square around it!

![Sprite transform](https://github.com/chrismintan/whos-that-pokemon/blob/master/assets/sprite-transform.png)

You will see later how this not only improves the visuals by allowing a nice background image to be placed but it also allows us to manipulate the picture to draw a silhouette.

The Pokémon image is first drawn on the Canvas using the following code:

```
var canvas = document.getElementById("myCanvas")
		ctx = canvas.getContext("2d")
		pokemonImage = new Image()
		pokemonImage.src = `sprites/${okémon ID}.png`

		// This function draws the sprite onto the Canvas
		ctx.drawImage(pokemonImage, 0, 0, canvas.width, canvas.height)
```

Now that the Pokémon sprite is on the Canvas, we can now manipulate the pixels!

### Greyscale
The first difficulty setting is Greyscale. This turns the colored Pokémon image into an image which the value of each pixel is a single sample representing only an amount of light that it carries. The contrast ranges from black at the weakest intensity to white at the strongest. The code to manipulate the colored pixels into greyscale can be seen below:

```
for (var i = 0; i < pokemonImage.data.length; i+=4 ) {
		// This function only picks the pixels which have color. Colored pixels would be pixels which have a Red / Green / Blue value of at least one
	  if( pokemonImage.data[i] >= 1 || pokemonImage.data[i+1] >= 1 || pokemonImage.data[i+2] >= 1) {

	  		// The RGB values are totaled up and averaged
				var avg = (pokemonImage.data[i] + pokemonImage.data[i+1] + pokemonImage.data[i+2])/3
	      pokemonImage.data[i] = avg;		// Corresponds to the Red index
	      pokemonImage.data[i+1] = avg;	// Corresponds to the Green index
	      pokemonImage.data[i+2] = avg;	// Corresponds to the Blue index

	      // Together, these 3 values make up the RGB color value of each individual pixel. Making the values of their RGB to be the average turns the colored image into a greyscale picture!
	  };
};

// The greyscale image is then drawn onto the Canvas
ctx.putImageData( pokemonImage, 0, 0 );
```

![Greyscale Demo](https://github.com/chrismintan/whos-that-pokemon/blob/master/assets/greyscale.gif)

Greyscaling the sprite now gives the Pokémons the classic non colored Game Boy OG look! Now lets see how making a silhouette is done instead.

### Silhouette
For drawing a silhouette instead of greyscale, instead of using the average of every pixel's RGB value, we change all the values to 0 as an RGB value of (0, 0, 0) would equate to black.

```
for (var i = 0; i < pokemonImage.data.length; i+=4 ) {
		// This function only picks the pixels which have color. Colored pixels would be pixels which have a Red / Green / Blue value of at least one
	  if( pokemonImage.data[i] >= 1 || pokemonImage.data[i+1] >= 1 || pokemonImage.data[i+2] >= 1) {

	  		// The RGB values are then made to equate to 0 to give rgb(0, 0, 0) for every pixel
	      pokemonImage.data[i] = 0;		// Corresponds to the Red index
	      pokemonImage.data[i+1] = 0;	// Corresponds to the Green index
	      pokemonImage.data[i+2] = 0;	// Corresponds to the Blue index

	  };
};

// The silhouette is then drawn onto the Canvas
ctx.putImageData( pokemonImage, 0, 0 );
```

Now the importance of the Pokémon image being a sprite can be seen! If the Pokémon image had a white background, the picture drawn will just be a black square!

However, using a sprite, we can get this:

![Extreme mode gif](https://github.com/chrismintan/whos-that-pokemon/blob/master/assets/extreme.gif)

Now that the pictures have been set up on Canvas, now comes matching the user's input with the correct answer!

### Answers Checking
For answers checking, initially I set the winning condition to be if the input equates to the Pokémon's name. However, I realised while doing initial testing that even for huge Pokémon fans (such as myself), I found it difficult to remember the exact spelling of some Pokémons. I mean come on even if we were die hard Pokémon fans are you sure you can remember the spelling of **Kangaskahn**? Or was it **Kangaskhan**? Hmm...

To combat this issue, a 'forgiving spelling' option was created. Instead of checking whether the strings of the input and answer are exactly the same, a function to find out the difference in the number of letters was used. The code can be seen below:

```
var wordDiff = function(str1, str2) {

    // If the strings are equal, no point running the function thus return 0
    if ( str1.toLowerCase() == str2.toLowerCase() ) {
        return 0;
    }

    // If the lengths are not equal, there is no point comparing each character.
    if (str1.length != str2.length) {
        return false;
    }

    // This loops through each letter and checks if both characters are equal. If it is different, adds 1 to numDiffChar and when it reaches the end of the word it returns numDiffChar which is the number of different letters between the two strings which were passed into the function

    var numDiffChar = 0;
    var index = 0;
    while (index < str1.length) {
        if (str1.toLowerCase().charAt(index) != str2.toLowerCase().charAt(index)) {
            numDiffChar++;
        }
        index++;
    }
    return numDiffChar;
};
```

With forgiving spelling, instead of the winning condition being the user's input being the same as the correct answer, the winning condition is set to be if the number of different characters are less than 3. The code can be seen below:

```
// Using the wordDiff function we are able to find out the number of different characters between the user's input and the correct answer. An additional conditional of wordDiff != false is added to ensure that the word length must be the same before winning condition is met

if ( wordDiff(input, answer) < 3 && wordDiff(input, answer) != false ) {
    revealPokemon()
}
```

You can see it in action below. **Hint: The proper spelling is Kangaskhan!**

![Spelling demo](https://github.com/chrismintan/whos-that-pokemon/blob/master/assets/spelling.gif)

With Forgiving Spelling mode checked, small spelling mistakes such as 'Kangaskahn' would still be accepted as a win condition!

### Issues Encountered
While test playing the game, I realised that using AJAX to get data via PokéAPI made the game seem sluggish. Moreover, PokéAPI is banned in several countries thus making my game unplayable in some parts of the world. Using AJAX to fetch data was used purely for learning purposes and it is not a crucial factor in making the game.

I have thus refactored my code and stored the whole Gen 1 Pokédex locally to avoid the game feeling sluggish. 

### Other Features
For people who do not like the awesome nostalgic good vibes Pokémon theme song, I reluctantly implemented a mute button which is done with the following code:

```
// Mute function for people who dont want to hear the awesome music
var mute = function() {
    if(document.getElementById('myMusic').muted == false) {
        document.getElementById('myMusic').muted = true;
    } else {
        document.getElementById('myMusic').muted = false;
    }
}
document.getElementById('mute').addEventListener('click', mute)
```

## Areas to Improve on
Currently, only Gen 1 Pokémons are in the game. The other Gens can be added but I'm only a fan of the OG Pokémons. 

## Author(s)
- Christopher Tan

This is a completely open source project! Feel free to submit pull requests or leave comments if you would like to give any feedback or encounter any bugs.

## Acknowledgements
This project is purely educational and expirimental. It would not have been possible without the following sources:

* [Nintendo](https://www.nintendo.com/) for making the game we all love along with the awesome [Pokémon theme song](https://www.youtube.com/watch?v=JuYeHPFR3f0)

* [PokéAPI](https://pokeapi.co/) for their thorough Pokémon data. It is an extremely fun API to use for students to use. It's Pokémon after all!

* [Jackster Productions](http://www.fontspace.com/jackster-productions/pokemon-gb) for the OG old school Pokémon Game Boy font.

## License
MIT