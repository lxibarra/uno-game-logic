var Game =  require('./index');
let game = new Game();

var x = game.prepareGame(10);

game.cardIsReturnable('red-9', game.getPlayers(), game.getCardDeck());
