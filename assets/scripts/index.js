var Score = [0, 0, 0];
var AnnounceAlert = true;
var AnnounceConsole = true;
var SummaryAlertCount = 10;

// Function takes score board and the choice
function game(human_choice) {
    // These are the labels for the moves.
    let moves = ["Rock", "Paper", "Scissors"];
    // These are the possible outcomes.
    let score_label = ['Drawn', 'Lost', 'Won'];
    // The computer decides the offset of the choice.
    let computer_choice_offset = Math.floor(Math.random() * moves.length);
    // The offset of the choice determines if it won or not, so increase by the offset between guesses.
    Score[computer_choice_offset]++;
    // Work out the computers choice from the offset chosen and the human choice. Also present a description of the round.
    sendMessage(`You have ${score_label[computer_choice_offset].toLowerCase()} the game.\nYou have ${score_label[computer_choice_offset].toLowerCase()} ${Score[computer_choice_offset]} time(s).\nYou have chosen ${moves[human_choice]}.\nThe computer has chosen ${moves[((computer_choice_offset + human_choice) % 3)]}.`);
    // Return the score for the next game.
    updateScoreboard(false)
    // return score;
}
// This function sets which message types to use
function setMessageTypes(){
    // 
    if (document.querySelector('input[name="alertOutcome"]:checked').value === "true") {
        AnnounceAlert = true;
    } else {
        AnnounceAlert = false;
    }
    //
    if (document.querySelector('input[name="consoleOutcome"]:checked').value === "true") {
        AnnounceConsole = true;
    } else {
        AnnounceConsole = false;
    }
}
// This function announces the results of the game
function sendMessage(message) {
    // Update the page 
    document.getElementById("notification").innerHTML = message;
    // Alert the message if the setting is on
    if (AnnounceAlert) {
        alert(message);
    }
    // Update the console log
    if (AnnounceConsole) {
        console.log(message);
    }
}
// This function updates the scoreboard and announces it based on the setting
function updateScoreboard(reset) {
    if (reset) {
        Score = [0,0,0]
    }
    // Number of games is the total number of wins, lossses and draws
    let games = Score[0] + Score[1] + Score[2]
    // If alerts are on, and it is enough games have been played
    if ((games % SummaryAlertCount === 0) && (SummaryAlertCount > 0) && (games > 0)) {
        // Score alert
        sendMessage(`You have played ${games} game(s).\n${Score[2]} win(s).\n${Score[0]} draw(s)\n${Score[1]} loss(es).`);
    }
    // Update the scoreboard on the page
    document.getElementById('games').innerHTML = games
    document.getElementById('wins').innerHTML = Score[2];
    document.getElementById('draws').innerHTML = Score[0];
    document.getElementById('losses').innerHTML = Score[1];
    if (games > 0) {
        document.getElementById('winsPCT').innerHTML = Math.floor((Score[2] * 100) / games) + '%';
        document.getElementById('drawsPCT').innerHTML = Math.floor((Score[0] * 100) / games) + '%';
        document.getElementById('lossesPCT').innerHTML = Math.floor((Score[1] * 100) / games) + '%';
    } else {
        document.getElementById('winsPCT').innerHTML = '0%';
        document.getElementById('drawsPCT').innerHTML = '0%';
        document.getElementById('lossesPCT').innerHTML = '0%';
    }
}
// Function if playing using the input
function playInput() {
    // Inputs listening for valid input
    let valid_input = ['r', 'p', 's'];
    choice = valid_input.indexOf(document.getElementById("inputGame").value.toLowerCase());
    // Clear the input after reading it
    document.getElementById("inputGame").value = null;
    // If its invalid, do not run the game
    if ((choice < 0) || (choice > valid_input.length)) {
        return;
    }
    // Play the game using the user choice
    game(choice);
}
// Function if playing using keyboard presses
function playKeyboard() {
    document.onkeyup = function (event) {
        switch (event.keyCode) {
            // r button for rock
            case 82:
                game(0);
                break;
            // p button for paper
            case 80:
                game(1);
                break;
            // s button for scissors
            case 83:
                game(2);
                break;
            case 27:
                alert("Released keyboard");
                document.onkeyup = null;
                return false;
        }
      };
}
// Function if playing using alert inputs
function playAlert() {
    // Possible inputs (all lower, as toLower is used).
    let valid_input = ['r', 'p', 's'];
    while (true) {
        // Ask the user for a choice.
        let human_choice_raw = prompt('Choose r(ock), p(aper), s(cissors)?');
        // If the user presses cancel, close the game.
        if (human_choice_raw === null) {
            break;
        }
        // If the input is invalid, repeat the loop without playing
        let human_choice = valid_input.indexOf(human_choice_raw.toLowerCase());
        if (human_choice < 0 || human_choice > valid_input.length) {
            alert('please only input "' + valid_input[0] + '", "' + valid_input[1] + '" or "' + valid_input[2] + '".');
            continue;
        }
        // The new score is the result of the game
        game(human_choice);
    }
}