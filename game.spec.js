var expect = require('chai').expect;
var Game =  require('./index');

describe('Test Uno Game Rules', function() {
 let game;
  beforeEach(function() {
    game = new Game();
  });

  it('CarDeck has 108 cards to deal', function() {
    let gameSetup = game.prepareGame(0);
    var count = 0;
    Object.keys(gameSetup.cardDeck).forEach(prop=>{
      let total = gameSetup.cardDeck[prop].length;
      if(total) {
          count+= total;
      }
    });
    expect(count).to.equal(108);
  });

  it('Create game with 2 players and each one has 7 cards and the deck has 94', function() {
    let gameSetup = game.prepareGame(2);
    var count = 0;
    Object.keys(gameSetup.cardDeck).forEach(prop=>{
      let total = gameSetup.cardDeck[prop].length;
      if(total) {
          count+= total;
      }
    });
    expect(count).to.equal(94);
    expect(gameSetup.gameCards[0].length).to.equal(7);
    expect(gameSetup.gameCards[1].length).to.equal(7);
  });

  it('Create a game with 10 players and each one has 7 cards and the total remaining is 38', function() {
    let gameSetup = game.prepareGame(10);
    var count = 0;
    Object.keys(gameSetup.cardDeck).forEach(prop=>{
      let total = gameSetup.cardDeck[prop].length;
      if(total) {
          count+= total;
      }
    });
    expect(count).to.equal(38);
    expect(gameSetup.gameCards[0].length).to.equal(7);
    expect(gameSetup.gameCards[1].length).to.equal(7);
    expect(gameSetup.gameCards[2].length).to.equal(7);
    expect(gameSetup.gameCards[3].length).to.equal(7);
    expect(gameSetup.gameCards[4].length).to.equal(7);
    expect(gameSetup.gameCards[5].length).to.equal(7);
    expect(gameSetup.gameCards[6].length).to.equal(7);
    expect(gameSetup.gameCards[7].length).to.equal(7);
    expect(gameSetup.gameCards[8].length).to.equal(7);
    expect(gameSetup.gameCards[9].length).to.equal(7);
  });

  it('No more than 10 players allowed', function() {
    expect(game.prepareGame.bind(game, 11)).to.throw();
  });

  describe("Randomizer test", function() {
    it('One player was not given only one color cards', function() {
        let gameSetup = game.prepareGame(2);
        expect(gameSetup.gameCards[0].filter(item=>item.card.match(/red/gi)).length).to.not.equal(7);
        expect(gameSetup.gameCards[0].filter(item=>item.card.match(/blue/gi)).length).to.not.equal(7);
        expect(gameSetup.gameCards[0].filter(item=>item.card.match(/yellow/gi)).length).to.not.equal(7);
        expect(gameSetup.gameCards[0].filter(item=>item.card.match(/green/gi)).length).to.not.equal(7);

        expect(gameSetup.gameCards[1].filter(item=>item.card.match(/red/gi)).length).to.not.equal(7);
        expect(gameSetup.gameCards[1].filter(item=>item.card.match(/blue/gi)).length).to.not.equal(7);
        expect(gameSetup.gameCards[1].filter(item=>item.card.match(/yellow/gi)).length).to.not.equal(7);
        expect(gameSetup.gameCards[1].filter(item=>item.card.match(/green/gi)).length).to.not.equal(7);

    });
  });

  describe('Player plays cards', function() {
    it('Play a card, user has 1 less card and the deck increases correctly', function(){
      let gameSetup = game.prepareGame(4);
      //for this to be possible we have to store an array of player classes that is able to play
      // must interact with parent class.
      gameSetup.player[0].play('red-01');
    });
  });

});
