import inquirer from 'inquirer';
// Define the game states
var GameState;
(function (GameState) {
    GameState[GameState["Start"] = 0] = "Start";
    GameState[GameState["Forest"] = 1] = "Forest";
    GameState[GameState["Cave"] = 2] = "Cave";
    GameState[GameState["End"] = 3] = "End";
})(GameState || (GameState = {}));
// Define the game map
const gameMap = {
    [GameState.Start]: [
        { text: 'Go to the forest', nextState: GameState.Forest },
        { text: 'Go to the cave', nextState: GameState.Cave }
    ],
    [GameState.Forest]: [
        { text: 'Explore deeper into the forest', nextState: GameState.End },
        { text: 'Return to the starting point', nextState: GameState.Start }
    ],
    [GameState.Cave]: [
        { text: 'Explore deeper into the cave', nextState: GameState.End },
        { text: 'Return to the starting point', nextState: GameState.Start }
    ],
    [GameState.End]: []
};
async function startGame() {
    let currentState = GameState.Start;
    console.log('Welcome to the Text Adventure Game!\n');
    while (currentState !== GameState.End) {
        const choices = gameMap[currentState].map(choice => choice.text); // Explicitly define the type
        const { chosenChoice } = await inquirer.prompt({
            type: 'list',
            name: 'chosenChoice',
            message: 'What would you like to do?',
            choices: choices
        });
        const chosenAction = gameMap[currentState].find(choice => choice.text === chosenChoice);
        if (chosenAction) {
            console.log(`\nYou chose: ${chosenAction.text}\n`);
            currentState = chosenAction.nextState;
        }
    }
    console.log('Congratulations! You reached the end of the game.');
}
startGame();
