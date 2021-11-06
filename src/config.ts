import { getConectedHexGroups } from './game/map';
import { renderGameObjects } from './game/render';
import { executeRound } from './game/round';
import { getPlayerHexes } from './models/grid';
import { highlightHexes, State } from './models/state';
// tslint:disable:no-string-literal


export const configObject: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        fullscreenTarget: undefined,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER,
        parent: 'thegame',
        width: "100%",
        height: "100%"
    },
};

export function createControls(state: State): Phaser.Cameras.Controls.SmoothedKeyControl {
    setupRoundInteraction(state);
    // setupItemInteraction(state);
    // setupPlayerInteraction(state);
    return setupKeyControls(state);
};

function setupRoundInteraction(state: State) {
    var iKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    iKey.on('down', () => executeRound(state));
}

// function setupItemInteraction(state: State) {
//     var iKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
//     iKey.on('down', () => {
//         let currSelectedIndex = PlaceableItems.findIndex(item => item === state.selectedItemType);
//         const newItem = currSelectedIndex === -1 ? PlaceableItems[0] : currSelectedIndex === (PlaceableItems.length - 1) ? undefined : PlaceableItems[++currSelectedIndex];
//         state.selectedItemType = newItem;

//         if (newItem === undefined) {
//             state.scene.input.setDefaultCursor(`pointer`);
//         } else {
//             state.scene.input.setDefaultCursor(`url(assets/${PlaceableItemCursorMap[newItem]}), pointer`);
//         }
//         highlightActionableHexGroups(state);
//     });
// }

function setupPlayerInteraction(state: State) {
    var pKey = state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    pKey.on('down', () => {
        let nextPlayerID = state.currentPlayer.id + 1;
        if (nextPlayerID > state.players.length - 1) {
            nextPlayerID = 0;
        }
        state.currentPlayer = state.players[nextPlayerID];
        highlightActionableHexGroups(state);
    });
}

function setupKeyControls(state: State): Phaser.Cameras.Controls.SmoothedKeyControl {
    const cursors = state.scene.input.keyboard.createCursorKeys()
    return new Phaser.Cameras.Controls.SmoothedKeyControl({
        camera: state.scene.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
        zoomOut: state.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    });
}

interface Point {
    x: number;
    y: number;
}

interface Line {
    p1: Point;
    p2: Point;
}

/*
    sources
        - https://wiki.pathmind.com/deep-reinforcement-learning
        - https://www.tensorflow.org/agents/tutorials/0_intro_rl
        - experience relay https://awjuliani.medium.com/simple-reinforcement-learning-with-tensorflow-part-4-deep-q-networks-and-beyond-8438a3e2b8df    

    Re-inforcement learning goal: find an action model that total cumulative reward for an agent
    Environment: Physical world in which the agent operates
        - hex map
    State: Current situation of the agent
        - my hexes, items, and money
    Reward: Feedback from the environment
        - increasing money, (punishment) losing territory
    Policy: Method to map agent’s state to actions
    Value: Future reward that an agent would receive by taking an action in a particular state

    Description of this problem:
    - discrete action space
    - 
    min-max

    Markov Decision Processes (MDPs)
    - states: hexes, money
    - possible actions: 
    - reward function: 
    - transition model: 
    
    Algorithms
    - state action pairs: the value of doing action A in state S" 
    - model-based: uses reward function and transition model
    - model-free: "explicit" trial-and-error algorithm 
    - on-policy: The policy that is used for updating and the policy used for acting is the same
    - off-policy: updated policy is different from the behavior policy
    - QLearning: Q values --> (off-policy) estimates the return (total discounted future reward) for state-action pairs assuming a greedy policy were followed
    - SARSA (State-Action-Reward-State-Action): (on-policy) estimates the return for state-action pairs assuming the current policy continues to be followed
    - discrete action space: the agent decides which distinct action to perform from a finite action set
    - continuous action space: actions are expressed as a single real-valued vector

    Questions
    - what is considered LOW dimensional action spaces?
    - how to build a Q-function

    https://github.com/tensorflow/tfjs-examples/tree/master/cart-pole

    tensorflow
    - gradient
        - input tensor = current state
        - tf.tidy
        - tf.variableGrads = 
        - policyNet = tf.sequential  --> create layers of a neural net
        - tf.nextFrame --> apart of animation
        - optimizer = tf.train.adam
        - policyNet.getActions(<currentState>)
        ? how is the neural net setup to produce a single number as an output
    
    Questions
        ? how do I format an action (item, location)?
        ? what does a model look like. A bunch of weights and layout of the net?
        ? what is a specification "The time_step_spec() method returns the specification for the TimeStep tuple"?
            A: 

    thoughts on building player actions
        - isolate what the player can see (observation)
            - when switching player, add fog of war for other player


*/

async function highlightActionableHexGroups(state: State) {
    // get all currently owned groups
    const playerHexes = getPlayerHexes(state.grid, state.currentPlayer);
    const playerLandGroups = getConectedHexGroups(playerHexes);
    highlightHexes(state, playerLandGroups.flat());
}