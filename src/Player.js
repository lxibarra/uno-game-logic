//should generate a random unique id or be assigned within the session to identify a client
// with an object of type Player
const uuidV4 = require('uuid/v4');


class Player {
  constructor(cards) {
    this._cards = cards;
    this.id = { value:uuidV4() };
    Object.freeze(this.id);
  }

  getCards() {
    return this._cards.slice();
  }

  //the player should not handle the logic to remove cards it should
  // comunicate which card is trying to play
  // because if we play a card and its rejected then it will crash everything

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

module.exports = Player;
