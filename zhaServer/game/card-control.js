const Defines = require('./define');
const Card = require('./card');

const CardController = function () {
  var that = {};

  var cardsList = [];           //一副打乱的牌
  var cardStartIndex = 0;       //模拟端牌的点

  //准备和打乱牌
  var initCard = function () {
      var cards = [];
      var cardValueKey = Object.keys(Defines.cardValue);
      var carTypeKey   = Object.keys(Defines.cardType);
      //初始化牌
      for(let i = 0; i < carTypeKey.length; i++){
          for(let j = 0; j < cardValueKey.length; j++){
              var card = Card(Defines.cardValue[j], Defines.cardType[i]);
              cards.push(card);
          }
      }

      //打乱牌
      while(cards.length){
          var index = Math.floor(Math.random() * cards.length);
          var card = cards[index];
          cardsList.push(card);
          cards.splice(index, 1);
      }

  };

  that.init = function () {
    initCard();
  };

  //设置端牌点，从这个点开始往后发牌,开始一局游戏时调用
  that.preStartGame = function () {
      //取0~34之间的随机数，这样就保证发牌的张数够6个人
      cardStartIndex = Math.floor(Math.random() * 34);
  };


  //获取发牌的每一张牌
  that.getGameCard = function () {
      var card = cardsList[cardStartIndex];
      cardStartIndex++;
      return card;
  };

  return that;
};

module.exports = CardController;