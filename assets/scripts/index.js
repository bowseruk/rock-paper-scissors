var Score = [0, 0, 0];
var HumanMoves = [0, 0, 0];
var ComputerMoves = [0, 0, 0];
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
    // Update how many times each option has been chosen
    HumanMoves[human_choice]++;
    ComputerMoves[((computer_choice_offset + human_choice) % 3)]++;
    // Work out the computers choice from the offset chosen and the human choice. Also present a description of the round.
    sendMessage(`-*- ${moves[human_choice]} vs ${moves[((computer_choice_offset + human_choice) % 3)]} -*-\nYou have ${score_label[computer_choice_offset].toLowerCase()} the game.\nYou have ${score_label[computer_choice_offset].toLowerCase()} ${Score[computer_choice_offset]} ${(Score[computer_choice_offset] === 1) ? "time" : "times"}.\nYou have chosen ${moves[human_choice]} ${HumanMoves[human_choice]} ${(HumanMoves[human_choice] === 1) ? "time" : "times"}.\nThe computer has chosen ${moves[((computer_choice_offset + human_choice) % 3)]} ${ComputerMoves[((computer_choice_offset + human_choice) % 3)]} ${(ComputerMoves[((computer_choice_offset + human_choice) % 3)] === 1) ? "time" : "times"}.`);
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
    // Alert the message if the setting is on
    if (AnnounceAlert) {
        alert(message);
    }
    // Update the console log
    if (AnnounceConsole) {
        console.log(message);
    }
    htmlMessage = message.replace("-*-", "<h3>");
    htmlMessage = htmlMessage.replace("-*-", "</h3>");
    htmlMessage = htmlMessage.replaceAll("Rock", '<i class="fa-regular fa-hand-back-fist"></i>Rock');
    htmlMessage = htmlMessage.replaceAll("Paper", '<i class="fa-regular fa-hand"></i>Paper');
    htmlMessage = htmlMessage.replaceAll("Scissors", '<i class="fa-regular fa-hand-scissors"></i>Scissors');
    // Update the page 
    document.getElementById("notification").innerHTML = htmlMessage;
}
// This function updates the scoreboard and announces it based on the setting
function updateScoreboard(reset) {
    if (reset) {
        Score = [0,0,0];
        HumanMoves = [0, 0, 0];
        ComputerMoves = [0, 0, 0];
        sendMessage('Score reset!')
    }
    // Number of games is the total number of wins, lossses and draws
    let games = Score[0] + Score[1] + Score[2]
    // If alerts are on, and it is enough games have been played
    if ((games % SummaryAlertCount === 0) && (SummaryAlertCount > 0) && (games > 0)) {
        // Score alert
        sendMessage(`You have played ${games} ${(games === 1) ? "game" : "games"}.\n${Score[2]} ${(Score[2] === 1) ? "win" : "wins"}.\n${Score[0]} ${(Score[0] === 1) ? "draw" : "draws"}.\n${Score[1]} ${(Score[1] === 1) ? "loss" : "losses"}.`);
    }
    // Update the scoreboard on the page
    document.getElementById('games').innerHTML = games
    document.getElementById('wins').innerHTML = Score[2];
    document.getElementById('draws').innerHTML = Score[0];
    document.getElementById('losses').innerHTML = Score[1];
    document.getElementById('rocks').innerHTML = HumanMoves[0];
    document.getElementById('papers').innerHTML = HumanMoves[1];
    document.getElementById('scissors').innerHTML = HumanMoves[2];
    document.getElementById('rocksComputer').innerHTML = ComputerMoves[0];
    document.getElementById('papersComputer').innerHTML = ComputerMoves[1];
    document.getElementById('scissorsComputer').innerHTML = ComputerMoves[2];
    document.getElementById('rocksTotal').innerHTML = (HumanMoves[0] + ComputerMoves[0]);
    document.getElementById('papersTotal').innerHTML = (HumanMoves[1] + ComputerMoves[1]);
    document.getElementById('scissorsTotal').innerHTML = (HumanMoves[2] + ComputerMoves[2]);
    if (games > 0) {
        document.getElementById('winsPCT').innerHTML = Math.floor((Score[2] * 100) / games) + '%';
        document.getElementById('drawsPCT').innerHTML = Math.floor((Score[0] * 100) / games) + '%';
        document.getElementById('lossesPCT').innerHTML = Math.floor((Score[1] * 100) / games) + '%';
        document.getElementById('rocksPCT').innerHTML = Math.floor((HumanMoves[0] * 100) / games) + '%';
        document.getElementById('papersPCT').innerHTML = Math.floor((HumanMoves[1] * 100) / games) + '%';
        document.getElementById('scissorsPCT').innerHTML = Math.floor((HumanMoves[2] * 100) / games) + '%';
        document.getElementById('rocksPCTComputer').innerHTML = Math.floor((ComputerMoves[0] * 100) / games) + '%';
        document.getElementById('papersPCTComputer').innerHTML = Math.floor((ComputerMoves[1] * 100) / games) + '%';
        document.getElementById('scissorsPCTComputer').innerHTML = Math.floor((ComputerMoves[2] * 100) / games) + '%';
        document.getElementById('rocksPCTTotal').innerHTML = Math.floor(((HumanMoves[0] + ComputerMoves[0]) * 100) / (games*2)) + '%';
        document.getElementById('papersPCTTotal').innerHTML = Math.floor(((HumanMoves[1] + ComputerMoves[1]) * 100) / (games*2)) + '%';
        document.getElementById('scissorsPCTTotal').innerHTML = Math.floor(((HumanMoves[2] + ComputerMoves[2]) * 100) / (games*2)) + '%';
    } else {
        document.getElementById('winsPCT').innerHTML = '0%';
        document.getElementById('drawsPCT').innerHTML = '0%';
        document.getElementById('lossesPCT').innerHTML = '0%';
        document.getElementById('rocksPCT').innerHTML = '0%';
        document.getElementById('papersPCT').innerHTML = '0%';
        document.getElementById('scissorsPCT').innerHTML = '0%';
        document.getElementById('rocksPCTComputer').innerHTML = '0%';
        document.getElementById('papersPCTComputer').innerHTML = '0%';
        document.getElementById('scissorsPCTComputer').innerHTML = '0%';
        document.getElementById('rocksPCTTotal').innerHTML = '0%';
        document.getElementById('papersPCTTotal').innerHTML = '0%';
        document.getElementById('scissorsPCTTotal').innerHTML = '0%';
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
    sendMessage("Started keyboard control.");
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
                sendMessage("Released keyboard control.");
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
            alert(`please only input "${valid_input[0]}", "${valid_input[1]}" or "${valid_input[2]}".`);
            continue;
        }
        // The new score is the result of the game
        game(human_choice);
    }
}