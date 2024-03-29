var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var helpLabel = "Press A Key to";

var clickEvent = (function() {
    if ("ontouchstart" in document.documentElement === true) {
        helpLabel = "Touch to"
        return "touchstart";
    }

    return "keydown";
})();

$("#level-title").text(helpLabel + " Start");

document.addEventListener(clickEvent, function(e) {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;

        setTimeout(function() {
            nextSequence();
            $(".btn").click(function() {
                var userChosenColour = $(this).attr("id");
                userClickedPattern.push(userChosenColour);
                playSound(userChosenColour);
                animatePress(userChosenColour);
                checkAnswer(userClickedPattern.length - 1);
            });
        }, 500)
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var buttonPlay = new Audio("sounds/" + name + ".mp3");
    buttonPlay.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentPattern) {
    if (userClickedPattern[currentPattern] === gamePattern[currentPattern]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, " + helpLabel + " Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
