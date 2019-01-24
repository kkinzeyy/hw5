console.log("hello")

// question

let card = $("#game");

let questions = [
    {
        question: "What year did 'Super Mario Bros.' release?",
        answers: ["1981", "1983", "1985", "1987"],
        correcta: "1985"
    },
    {
        question: "What is Mario's brother's name?",
        answers: ["Luis", "Luigi", "Leonardo", "Lorenzo"],
        correcta: "Luigi"
    },
    {
        question: "What is the name of the main princess in the Mario Bros. saga?",
        answers: ["Princess", "Periwinkle", "Peach", "Toad"],
        correcta: "Peach"
    },
    {
        question: "What do the Mario brothers do for a living?",
        answers: ["Carpenters", "Plumbers", "Electricians", "Painters"],
        correcta: ""
    },
    {
        question: "What console was 'Super Mario Bros.' originally released for?",
        answers: ["Atari", "GameCube", "NES", "Wii"],
        correcta: "NES"
    }
];

let timer;

let game = {
    correct: 0,
    wrong: 0,
    counter: 120,


    countdown: function () {
        game.counter--;
        $("#count-down").html(game.counter);
        if (game.counter === 0) {
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1000);
        $("#wrapper").prepend(
            "<h2>Time left: <span id='count-down'>120</span> Seconds</h2>"
        );

        $("#start").remove();

        for (let i = 0; i < questions.length; i++) {
            card.append("<h2>" + questions[i].question + "</h2>");
            for (var k = 0; k < questions[i].answers.length; k++) {
                card.append("<input type='radio' name='question-" + i +
                    "' value='" + questions[i].answers[k] + "''>" + questions[i].answers[k]);
            }
        }
        card.append("<br><button id='done'>Done</button>");
    },

    done: function () {
        let inputs = card.children("input:checked");
        for (let i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === questions[i].correcta) {
                game.correct++;
            }
            else {
                game.wrong++;
            }
        }
        this.result();
    },

    result: function () {
        clearInterval(timer);

        $("#wrapper h2").remove();

        card.html("<h2>All Done!</h2>");
        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.wrong + "</h3>");
    }
};

$(document).on("click", "#start", function () {
    game.start();
});

$(document).on("click", "#done", function () {
    game.done();
});
