/*108 cards as follows
19 Blue cards – 0-9 (1 x 0 only for all)
19 Green cards – 0-9
19 Red cards – 0-9
19 Yellow cards – 0-9
8 Draw Two cards – 2 each in blue, green, red, and yellow
8 Reverse cards – 2 each in blue, green, red, and yellow
8 Skip cards – 2 each in blue, green, red, and yellow
4 Wild cards
4 Wild Draw Four cards
*/

const pickRandomSubSet = () => Math.floor(Math.random() * 6);
const pickRandomCard = cardSubset => Math.floor(Math.random() * (cardSubset.length - 1));

class DeckSet {
    constructor() {}

    getInitialDeck() {
        let numbers = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9'
        ].slice();
        let plus2 = ['+2', '+2'].slice();
        let reverse = ['reverse', 'reverse'].slice();
        let skip = ['skip', 'skip'].slice();
        let wild = ['*', '*', '*', '*'].slice();
        let wildPlus4 = ['*+4', '*+4', '*+4', '*+4'].slice();
        const deckValue = {
            red: [
                ...numbers,
                ...plus2,
                ...reverse,
                ...skip
            ],
            blue: [
                ...numbers,
                ...plus2,
                ...reverse,
                ...skip
            ],
            green: [
                ...numbers,
                ...plus2,
                ...reverse,
                ...skip
            ],
            yellow: [
                ...numbers,
                ...plus2,
                ...reverse,
                ...skip
            ],
            wild,
            wildPlus4,
        };

        return deckValue;
    }

    getInitialSets(numberOfPlayers) {
        let cardDeck = this.getInitialDeck();
        var possibilities = [
            'red',
            'blue',
            'green',
            'yellow',
            'wild',
            'wildPlus4'
        ]

        let gameCards = [];

        for (let c = 0; c < numberOfPlayers; c++) {
            //select a random type while the length is greater than 0
            let playerCards = [];
            let lastSubsetUsed = null;
            while (playerCards.length < 7) {
                let subSet = pickRandomSubSet();
                while (cardDeck[possibilities[subSet]].length <= 2 || lastSubsetUsed === subSet) {
                    subSet = pickRandomSubSet();
                }
                lastSubsetUsed = subSet;

                let subsetName = possibilities[subSet];

                let withDrawCard = undefined;
                while (typeof withDrawCard === 'undefined') {
                  let cardIndex = pickRandomCard(cardDeck[subsetName]);
                  withDrawCard = cardDeck[subsetName].splice(cardIndex, 1);
                }

                playerCards.push({
                  card:`${subsetName}-${withDrawCard[0]}`
                })
            }
            gameCards.push(playerCards);
        }

        return {gameCards, cardDeck};

    }

}

class Game extends DeckSet {
    constructor() {
        super();
    }

    prepareGame(numberOfPlayers = 2) {
        //validate game
        if(numberOfPlayers > 10 || numberOfPlayers < 0) {
          throw 'Invalid number of players, number must be between 0 and 10';
        }
        let game = this.getInitialSets(numberOfPlayers);

        return game;
    }
}


module.exports = Game;
