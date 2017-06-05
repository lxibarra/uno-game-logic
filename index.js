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

    isCardValid(cardValue) {
      //cardValue = (cardValue||'').toString().trim();
      if(typeof cardValue !== 'string' || cardValue.trim().length < 2) {
        throw 'Invalid Card Value';
      }

      let cardValues = cardValue.split('-');
      if (cardValues.length <= 0) {
        throw 'Invalid Card Value';
      }
      //we first check if its a valid card.
      let _cardDeck = this.getInitialDeck();
      if ((_cardDeck[cardValues[0]]||[]).find(card=>card === cardValues[1])) {
        return {
           ok:true,
           card:{
             group:cardValues[0],
             value:cardValues[1]
           }
        };
      }
      return {
        ok:false,
        cardValues:null
      };
    }

    getCardMaxQuantity(cardValue) {
      let {ok, card} = this.isCardValid(cardValue);
      if(ok) {
        let _cardDeck = this.getInitialDeck();
        let maxTotal = _cardDeck[card.group].filter(_card=>_card===card.value).length;
        return maxTotal;
      }
      return null;
    }

    cardIsReturnable(cardValue, players, currentCardDeck) {
      let {ok, card} = this.isCardValid(cardValue);
      if(ok) {
        //get total cards of this type from original card deck.
        let maxTotal = this.getCardMaxQuantity(cardValue);

        //is card in players hand and how many times
        let totalInPlayers = 0;
        for(let p=0,totalPlayers=players.length; p<totalPlayers; p++) {
           for(let c=0, totalCards=players[p]._cards.length;c < totalCards;c++) {
             if(cardValue === players[p]._cards[c].card) {
               totalInPlayers += 1;
             }
           }
        }

        //Is card in deck and how many times.
        let totalInDeck = currentCardDeck[card.group].filter(_card=>_card === card.value).length;

        if(totalInDeck + totalInPlayers < maxTotal) {
          return true;
        }

        return false;

      } else {
        throw  'Invalid Card Value';
      }
    }
}

class Player {
  constructor(cards) {
    this._cards = cards;
  }

  getCards() {
    return this._cards.slice();
  }

  drawCard(value) {
    let index = -1;
    for(let c = 0; c<this._cards.length; c++) {
      if(this._cards[c].card === value) {
        index = c;
        break;
      }
    }
    if(index !== -1) {
      return this._cards.splice(index, 1)[0];
    }
    //maybe we should throw when we try to play a card we dont have
    return null;
  }
}

class Game extends DeckSet {
    constructor() {
        super();
        this._players = [];
    }

    getPlayers() {
      return this._players.slice();
    }

    getCardDeck() {
      return JSON.parse(JSON.stringify(this._cardDeck));
    }

    putCardInDeck(cardValue) {
      //put card in deck and make sure the card is not duplicated or invalid
      if(this.isCardValid(cardValue).ok) {

      }
    }

    prepareGame(numberOfPlayers = 2) {
        if(numberOfPlayers > 10 || numberOfPlayers < 0) {
          throw 'Invalid number of players, number must be between 0 and 10';
        }

        let game = this.getInitialSets(numberOfPlayers);
        this._game = game;

        game.gameCards.forEach(cardSet=> {
          let player = new Player(cardSet);
          this._players.push(player);
        });

        this._cardDeck = game.cardDeck;
    }
}


module.exports = Game;
