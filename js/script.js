

utilities: {
    function spannify(word) {
        var spannified = [];
        for ( e in word ) {
            var spanID = word[e];
            var spanStart =     `<span id="${spanID}">`
            var spanEnd = "</span>";
            spannified.push(spanStart);
            spannified.push(word[e]);
            spannified.push(spanEnd);
        };
        return spannified.join("");
    };
};

text: {
    function displayEnemy(x,y,text) {
        var pos = document.getElementById(x + y);
        pos.innerHTML = text
    }
    // Displaying player input
    function displayKeys(currentKeys) {
        var spannified = [];
        for ( i in currentKeys ) {
            spannified.push(spannify(currentKeys[i]))
        }
        bottom.innerHTML = spannified.join("");
        return blinkEnd();
    };
};

animations: {
    function blink() {
        stopBlink()
        bottom.innerHTML = spannify('_')
        intervalID = setInterval(selector, 500)
    }

    function blinkEnd()
    {
        stopBlink()
        var addSpan = spannify('_')
        bottom.innerHTML = bottom.innerHTML + addSpan
        intervalID = setInterval(selector, 500)
    }

    //animation style
    function selector() {
        var x = document.getElementById('_')
        x.style.backgroundColor = x.style.backgroundColor == "red" ? "blue" : "red";
    }
    //clear interval
    function stopBlink() {
        clearInterval(intervalID);
    }
    function flash(target, message, anim) {
        target.textContent = message;
        target.style.animationName = anim;
        target.id = "current-status";
    }
}

function verifyKeys(event) {
    if ( event.key == "Backspace" ) {
        currentKeys.pop();
        if ( currentKeys.length != 0 ) {
            return displayKeys(currentKeys);
        }
        else {
            console.log(currentKeys.length);
            return blink();
        };
    } else {
        if ( event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 32 )
            currentKeys.push(event.key);
            stopBlink(blink);
            return displayKeys(currentKeys);

    };
};

window.onload = function() {
    document.addEventListener("keydown", verifyKeys);
    blink();
};













