
// Function takes score board and the choice
function game(score, human_choice) {
    // These are the labels for the moves.
    let moves = ["Rock", "Paper", "Scissors"];
    // These are the possible outcomes.
    let score_label = ['Drawn', 'Lost', 'Won'];
    // The computer decides the outcome of the game.
    let computer_choice = Math.floor(Math.random() * moves.length);
    // The offset of the choice determines if it won or not, so increase by the offset between guesses.
    score[computer_choice]++;
    // Work out the computers choice from the offset chosen and the human choice. Also present a description of the round.
    alert("You have " + score_label[computer_choice] + ' the game ' + score[computer_choice] + ' times. You have chosen ' + moves[human_choice] + ', while the computer has chose '+ moves[((computer_choice + human_choice)%3)]);
    // Return the score for the next game.
    return score;
}
// Main function that runs the game loop
function main() {
    // Possible inputs (all lower, as toLower is used).
    let valid_input = ['r', 'p', 's'];
    // The games score board.
    let score = [0, 0, 0];
    // Count of the number of games.
    loops = 0;
    // This is an infinite loop so you can continue to play until feed up.
    while (true) {
        // Ask the user for a choice.
        let human_choice_raw = prompt('Choose r(ock), p(aper), s(cissors)?');
        // If the user presses cancel, close the game.
        if (human_choice_raw === null) {
            break;
        }
        // If the input is invalid, repeat the loop without playing
        let human_choice = valid_input.indexOf(human_choice_raw.toLowerCase());
        if (human_choice < 0 || human_choice > valid_input.length){
            alert('please only input "' + valid_input[0] + '", "' + valid_input[1] + '" or "' + valid_input[2] + '".');
            continue;
        }
        // The new score is the result of the game
        score = game(score, human_choice);
        // Increase the number of games
        loops++;
        // Every 10 games output the summary of wins/draws/losses
        if ((loops % 10) === 0 ) {
            alert( "You have played " + loops + " game(s).\n" + score[2] + " win(s).\n" + score[0] + " draw(s)\n" + score[1] + " loss(es).");
        }
    }
    alert( "You have played " + loops + " game(s).\n" + score[2] + " win(s).\n" + score[0] + " draw(s)\n" + score[1] + " loss(es).");
}
// Start the game
main();