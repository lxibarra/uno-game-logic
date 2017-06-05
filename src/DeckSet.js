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
      wildPlus4
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

        playerCards.push({card: `${subsetName}-${withDrawCard[0]}`})
      }
      gameCards.push(playerCards);
    }

    return {gameCards, cardDeck};

  }

  isCardValid(cardValue) {
    //cardValue = (cardValue||'').toString().trim();
    if (typeof cardValue !== 'string' || cardValue.trim().length < 2) {
      throw 'Invalid Card Value';
    }

    let cardValues = cardValue.split('-');
    if (cardValues.length <= 0) {
      throw 'Invalid Card Value';
    }
    //we first check if its a valid card.
    let _cardDeck = this.getInitialDeck();
    if ((_cardDeck[cardValues[0]] || []).find(card => card === cardValues[1])) {
      return {
        ok: true,
        card: {
          group: cardValues[0],
          value: cardValues[1]
        }
      };
    }
    return {ok: false, cardValues: null};
  }

  getCardMaxQuantity(cardValue) {
    let {ok, card} = this.isCardValid(cardValue);
    if (ok) {
      let _cardDeck = this.getInitialDeck();
      let maxTotal = _cardDeck[card.group].filter(_card => _card === card.value).length;
      return maxTotal;
    }
    return null;
  }

  cardIsReturnable(cardValue, players, currentCardDeck) {
    let {ok, card} = this.isCardValid(cardValue);
    if (ok) {
      //get total cards of this type from original card deck.
      let maxTotal = this.getCardMaxQuantity(cardValue);

      //is card in players hand and how many times
      let totalInPlayers = 0;
      for (let p = 0, totalPlayers = players.length; p < totalPlayers; p++) {
        for (let c = 0, totalCards = players[p]._cards.length; c < totalCards; c++) {
          if (cardValue === players[p]._cards[c].card) {
            totalInPlayers += 1;
          }
        }
      }

      //Is card in deck and how many times.
      let totalInDeck = currentCardDeck[card.group].filter(_card => _card === card.value).length;

      if (totalInDeck + totalInPlayers < maxTotal) {
        return true;
      }

      return false;

    } else {
      throw 'Invalid Card Value';
    }
  }
}

module.exports = DeckSet;
