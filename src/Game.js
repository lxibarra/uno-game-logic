var DeckSet = require('./DeckSet');
var Player = require('./Player');

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
