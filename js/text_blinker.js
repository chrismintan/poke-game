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
        x.style.backgroundColor = x.style.backgroundColor == "white" ? "black" : "white";
    }
    //clear interval
    function stopBlink() {
        clearInterval(intervalID);
    }