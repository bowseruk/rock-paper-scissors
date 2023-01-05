
function game(score, human_choice) {
    // These are the labels for the moves
    let moves = ["Rock", "Paper", "Scissors"];
    // These are the possible outcomes
    let score_label = ['Drawn', 'Lost', 'Won'];
    let computer_choice = Math.floor(Math.random() * moves.length);
    score[computer_choice]++;
    alert("You have " + score_label[computer_choice] + ' the game ' + score[computer_choice] + ' times. You have chosen ' + moves[human_choice] + ', while the computer has chose '+ moves[((computer_choice + human_choice)%3)]);
    return score;
}

function main() {
    let valid_input = ['r', 'p', 's']
    let score = [0, 0, 0];
    loops = 0;
    while (true) {
        let human_choice_raw = prompt('r(ock), p(aper), s(cissors)?');
        if (human_choice_raw === null) {
            break;
        }
        let human_choice = valid_input.indexOf(human_choice_raw.toLowerCase());
        if (human_choice < 0 || human_choice > valid_input.length){
            alert('please only input "' + valid_input[0] + '" or "' + valid_input[1] + '" or "' + valid_input[2] + '".')
            continue;
        }
        score = game(score, human_choice);
        loops++;
        if ((loops % 10) === 0 ) {
            alert( "You have played " + loops + " game(s), with " + score[2] + " win(s), " + score[0] + " draw(s), and " + score[1] + " losse(s).")
        }
    }
}

main()


