var expect = require('chai').expect;
var Game =  require('./index');

describe('Test Uno Game Rules', function() {
 let game;
  beforeEach(function() {
    game = new Game();
  });

  it('CarDeck has 108 cards to deal', function() {
    game.prepareGame(0);
    var count = 0;
    Object.keys(game.getCardDeck()).forEach(prop=>{
      let total = game.getCardDeck()[prop].length;
      if(total) {
          count+= total;
      }
    });
    expect(count).to.equal(108);
  });

  it('Create game with 2 players and each one has 7 cards and the deck has 94', function() {
    game.prepareGame(2);
    var count = 0;
    Object.keys(game.getCardDeck()).forEach(prop=>{
      let total = game.getCardDeck()[prop].length;
      if(total) {
          count+= total;
      }
    });
    expect(count).to.equal(94);
    expect(game.getPlayers()[0].getCards().length).to.equal(7);
    expect(game.getPlayers()[1].getCards().length).to.equal(7);
  });

  it('Create a game with 10 players and each one has 7 cards and the total remaining is 38', function() {
    game.prepareGame(10);
    var count = 0;
    Object.keys(game.getCardDeck()).forEach(prop=>{
      let total = game.getCardDeck()[prop].length;
      if(total) {
          count+= total;
      }
    });
    expect(count).to.equal(38);
    expect(game.getPlayers()[0].getCards().length).to.equal(7);
    expect(game.getPlayers()[1].getCards().length).to.equal(7);
    expect(game.getPlayers()[2].getCards().length).to.equal(7);
    expect(game.getPlayers()[3].getCards().length).to.equal(7);
    expect(game.getPlayers()[4].getCards().length).to.equal(7);
    expect(game.getPlayers()[5].getCards().length).to.equal(7);
    expect(game.getPlayers()[6].getCards().length).to.equal(7);
    expect(game.getPlayers()[7].getCards().length).to.equal(7);
    expect(game.getPlayers()[8].getCards().length).to.equal(7);
    expect(game.getPlayers()[9].getCards().length).to.equal(7);
  });

  it('No more than 10 players allowed', function() {
    expect(game.prepareGame.bind(game, 11)).to.throw();
  });

  describe("Randomizer test", function() {
    it('One player was not given only one color cards', function() {
        game.prepareGame(2);
        expect(game.getPlayers()[0].getCards().filter(item=>item.card.match(/red/gi)).length).to.not.equal(7);
        expect(game.getPlayers()[0].getCards().filter(item=>item.card.match(/blue/gi)).length).to.not.equal(7);
        expect(game.getPlayers()[0].getCards().filter(item=>item.card.match(/yellow/gi)).length).to.not.equal(7);
        expect(game.getPlayers()[0].getCards().filter(item=>item.card.match(/green/gi)).length).to.not.equal(7);

        expect(game.getPlayers()[1].getCards().filter(item=>item.card.match(/red/gi)).length).to.not.equal(7);
        expect(game.getPlayers()[1].getCards().filter(item=>item.card.match(/blue/gi)).length).to.not.equal(7);
        expect(game.getPlayers()[1].getCards().filter(item=>item.card.match(/yellow/gi)).length).to.not.equal(7);
        expect(game.getPlayers()[1].getCards().filter(item=>item.card.match(/green/gi)).length).to.not.equal(7);

    });
  });

  describe('Player plays cards', function() {
    it('Play a card, user has 1 less card and the deck increases correctly', function(){
      game.prepareGame(4);
      let [player1] = game.getPlayers();
      let [card1] = player1.getCards();
      console.log(card1);
      player1.drawCard(card1.card);
      expect(player1.getCards().length).to.equal(6);
      //should create a method to put the card back in the deck.
    });
  });

});
