"use-strict";

const boxUL = document.querySelector('.boxes');
const boxes = document.querySelectorAll('.box');
const board = document.querySelector('#board');
const playerRectangles = document.querySelector('#player1').parentNode;
const player1Rectangle = document.querySelector('#player1');
const player2Rectangle = document.querySelector('#player2');
const header = document.querySelector('header');
const startButton = document.createElement('a');
startButton.className = 'button';
startButton.id = '2players';
startButton.href = '#';
startButton.textContent = 'Start game - 2 Players';
const startButtonComputer =  document.createElement('a');
startButtonComputer.className = 'button';
startButtonComputer.id = '1player';
startButtonComputer.href = '#';
startButtonComputer.textContent = 'Start game - 1 Player';
const winnerMessage = document.createElement('p');
winnerMessage.className = 'message';

let computerPlaying = true;

document.addEventListener('DOMContentLoaded', () => {

  const game = {

    //All winning combinations in the game

    winningCombinations : [
      [boxes[0], boxes[1], boxes[2]],
      [boxes[3], boxes[4], boxes[5]],
      [boxes[6], boxes[7], boxes[8]],
      [boxes[0], boxes[3], boxes[6]],
      [boxes[1], boxes[4], boxes[7]],
      [boxes[2], boxes[5], boxes[8]],
      [boxes[0], boxes[4], boxes[8]],
      [boxes[2], boxes[4], boxes[6]]
    ],

    player1: new Player(document.querySelector('#player1'), 'box-filled-1'),


    player2: new Player(document.querySelector('#player2'),  'box-filled-2'),

    //WHY COULDN'T I ASSIGN IT DIRECTLY TO THE PROPERTY player1

    //Variable containing the active player in the game
    activePlayer: {},

    inactivePlayer:{},

    createAndAppendStartButton: function(){


      //Removing board class, and adding screen and screen start classes to board element
      board.classList.remove('board');
      board.classList.add('screen')
      board.classList.add('screen-start');

      //Creaing and appending the start button


      const header = document.querySelector('header');
      header.insertBefore(startButton, playerRectangles);
      header.insertBefore(startButtonComputer, playerRectangles);

      // return startButton;
    },

    hideScreenShowBoard: function(){

      this.resetElementsForNewGame();
      board.className = 'board';
      this.addHoverImages();
      const buttons = document.querySelectorAll('.button');
      buttons.forEach(button => button.style.display = 'none');
    },

    prepareGameForStart: function(){

      this.addPlayer1NameTag();
      this.addPlayer2NameTag();

      this.createAndAppendStartButton();

      const buttons = document.querySelectorAll('.button');
      buttons.forEach(button => {
        button.addEventListener('click', (event) =>{

          if(event.target.id === '2players'){
            computerPlaying = false;
            let player1Name = prompt('Player 1 Name:');
            while(!player1Name || player1Name.trim().length === 0){
              player1Name = prompt('Player 1 Name:');
            }
            const player1NameTag = document.querySelector('#player1 p');
            player1NameTag.textContent = player1Name;
            let player2Name = prompt('Player 2 Name:');
            while(!player2Name || player2Name.trim().length === 0){
              player2Name = prompt('Player 2 Name:');
            }
            const player2NameTag = document.querySelector('#player2 p');
            player2NameTag.textContent = player2Name;

          } else if(event.target.id === '1player'){
            computerPlaying = true;

            let player1Name = prompt('Player 1 Name:');
            while(!player1Name || player1Name.trim().length === 0){
              player1Name = prompt('Player 1 Name:');
            }
            const player1NameTag = document.querySelector('#player1 p');
            player1NameTag.textContent = player1Name;

            const player2NameTag = document.querySelector('#player2 p');
            player2NameTag.textContent = 'Computer';
          }

          this.hideScreenShowBoard();
          this.prepareGameForPlay();
        })
      })

    },
    addHoverImages: function(svg){
      boxes.forEach(box => {
        box.addEventListener('mouseover', (event) => {
          if(event.target.classList.contains('box-filled-1') || event.target.classList.contains('box-filled-2')){
            event.target.style.backgroundImage = '';
          } else {
            event.target.style.backgroundImage = svg;
            event.target.style.backgroundRepeat = 'no-repeat';
            event.target.style.backgroundSize = 'contain';
          }
        })
      })
    },

    switchHoverImagesOnTurn: function () {
      if (player1Rectangle.classList.contains('active')) {
        this.addHoverImages('url("img/o.svg")');
      } else if (player2Rectangle.classList.contains('active')){
        this.addHoverImages('url("img/x.svg")');
      } else {
        this.addHoverImages("url('img/o.svg')");
      }
    },

    removeHoverImages: function addMouseOut () {
      boxes.forEach(box => {
        box.addEventListener('mouseout', function(e) {
          event.target.style.backgroundImage = '';
        });
      })
    },

    addPlayer1NameTag: function(){

      const nameTag = document.createElement('p');
      nameTag.className = 'playerNameTag';
      player1Rectangle.appendChild(nameTag);

    },

    addPlayer2NameTag: function(){
      const nameTag = document.createElement('p');
      nameTag.className = 'playerNameTag';
      player2Rectangle.appendChild(nameTag);
    },

    resetElementsForNewGame: function(){
      //Reset all boxes

      for (var i = 0; i < boxes.length; i++) {
        boxes[i].className = 'box';
      }

      this.player1.colorRectangle.classList.remove('active');
      this.player2.colorRectangle.classList.remove('active');

      this.player1.checkedBoxes = [];
      this.player2.checkedBoxes = [];
    },

    //Checks whether a player has a winning combination with his checked boxes
    hasThreeInRow: function(winningCombinations, playersBoxes){
      for (var i = 0; i < winningCombinations.length; i++) {
        if(playersBoxes.includes(winningCombinations[i][0]) &&
           playersBoxes.includes(winningCombinations[i][1]) &&
           playersBoxes.includes(winningCombinations[i][2])){
             return true;
           }
      }
      return false;
    },

    checkForWinOrDraw: function(){
      const threeInRow = this.hasThreeInRow(this.winningCombinations, this.activePlayer.checkedBoxes);
      const noMoreBoxesToFill = this.noMoreBoxesToFill();
      if(threeInRow){
        this.endGameWin(this.activePlayer);
      } else if(noMoreBoxesToFill) {
        this.endGameDraw();
      }
    },

    prepareGameForPlay: function(){

      //Setting the active player, and activating his rectangle
      this.activePlayer = this.player1;
      this.activePlayer.colorRectangle.classList.add('active');

      this.removeHoverImages();
      this.switchHoverImagesOnTurn();

      //Listening for events on the boxes
      boxUL.addEventListener('click', (event) => {

        const clickedBox = event.target;
        //Add the checked class only if the box hasn't yet been checked
        if(clickedBox.classList.contains('box-filled-1') || clickedBox.classList.contains('box-filled-2')){
          return ;
        }
        //Add the checked box to the player's checked boxes
        clickedBox.classList.add(this.activePlayer.filledBoxClass);
        this.activePlayer.checkedBoxes.push(clickedBox);
        //Check if the active player has achieved any of the winning _combinations
        console.log(this.findAllUncheckedBoxes());
        const threeInRow = this.hasThreeInRow(this.winningCombinations, this.activePlayer.checkedBoxes);
        const noMoreBoxesToFill = this.noMoreBoxesToFill();
        if(threeInRow){
          this.endGameWin(this.activePlayer);
          return ;
        } else if(noMoreBoxesToFill) {
          this.endGameDraw();
          return ;
        }
        //The computer  playing algorithm has three actions
        if(computerPlaying === true){
          this.switchToOtherPlayer();
          // Firstly, the computer checks if there is an opprotunity to win the game
          // and these moves are of top priority
          let possibleMoves = this.createWinningMovesArray();
          if(possibleMoves.length > 0 ){
            this.computerPlayMove(possibleMoves);
            this.checkForWinOrDraw();
            this.switchToOtherPlayer();
          } else {
            //Secondly, if the computer cannot win the game, it checks if there is a box
            // that must be checked in order to prevent the opponent from winning the game
            possibleMoves = this.createMustDefendMovesArray();
            if(possibleMoves.length > 0){
              this.computerPlayMove(possibleMoves);
              this.checkForWinOrDraw();
              this.switchToOtherPlayer();
            } else{
              //Finally, the computer loooks for the box which could give it the most leverage
              // in the current game conditions (e.g playing the central box on first turn)
              const checkBoxToPlay = this.findUncheckedBoxWithMostPotential();
              possibleMoves.push(checkBoxToPlay);
              this.computerPlayMove(possibleMoves);
              this.switchToOtherPlayer();
            }

          }

        } else {
          this.switchToOtherPlayer();
        }

      });
    },

    //Proverava da li postoji jos neko polje za igru koje nije obelezeno
    noMoreBoxesToFill: function(){
      for (var i = 0; i < boxes.length; i++) {
        if(!boxes[i].classList.contains('box-filled-1') && !boxes[i].classList.contains('box-filled-2')){
          return false
        }
      }
      return true;
    },

    switchToOtherPlayer: function(){
      if(this.activePlayer === this.player1){
        this.activePlayer.colorRectangle.classList.remove('active');
        this.activePlayer = this.player2;
        this.activePlayer.colorRectangle.classList.add('active');
        this.inactivePlayer = this.player1;
        this.switchHoverImagesOnTurn();

      } else {
        this.activePlayer.colorRectangle.classList.remove('active');
        this.activePlayer = this.player1;
        this.activePlayer.colorRectangle.classList.add('active');
        this.inactivePlayer = this.player2;
        this.switchHoverImagesOnTurn();
      }
    },

    endGameWin: function(winningPlayer){
      board.classList.remove('board');
      board.classList.add('screen')
      if(winningPlayer == this.player1){
      board.classList.add('screen-win-one');
      } else {
      board.classList.add('screen-win-two');
      }
      board.id = 'finish';

      header.insertBefore(winnerMessage, playerRectangles);

      startButton.textContent = 'New Game - 2 Players';
      startButton.style.display = '';
      header.appendChild(startButton);
      startButtonComputer.textContent = 'New Game - 1 Player';
      startButtonComputer.style.display = '';
      header.appendChild(startButtonComputer);

    },

    endGameDraw: function(){
      board.classList.remove('board');
      board.classList.add('screen');
      board.classList.add('screen-win-tie');
      board.id = 'finish';

      header.insertBefore(winnerMessage, playerRectangles);


      startButton.textContent = 'New Game - 2 Players';
      startButton.style.display = '';
      header.appendChild(startButton);
      startButtonComputer.textContent = 'New Game - 1 Player';
      startButtonComputer.style.display = '';
      header.appendChild(startButtonComputer);

    },


    //
    createWinningMovesArray: function(){
      const possibleWinningCombinations = game.winningCombinations.filter(this.oneBoxMissingForWin);
      const possiblePlays = this.findPossibleMoves(possibleWinningCombinations);
      return possiblePlays;
    },

    createMustDefendMovesArray: function(){
      const possibleLossCombinations = game.winningCombinations.filter(this.oneBoxMissingForLoss);
      const possiblePlays = this.findPossibleMoves(possibleLossCombinations);
      return possiblePlays;
    },

    computerPlayMove: function(possiblePlays){
        const randomNum = Math.floor(Math.random() * possiblePlays.length);
        possiblePlays[randomNum].classList.add(this.activePlayer.filledBoxClass);
        this.activePlayer.checkedBoxes.push(possiblePlays[randomNum]);
    },

    //U prosledjenom nizu aktivnih pobednickih kombinacija, nalazi elemente koji mogu da se igraju
    findPossibleMoves: function(arrayOfThrees){
      let options = [];
      arrayOfThrees.forEach(array => {
        array.forEach(elem => {
          if(!elem.classList.contains('box-filled-1') && !elem.classList.contains('box-filled-2') && !options.includes(elem)){
            options.push(elem);
          }
        })
      })
      return options;
    },

    //Za dati niz vraca da li sadrzi dva elementa protivnika
    oneBoxMissingForWin: function(array){
      let numberOfCheckedBoxes = 0;
      array.forEach(elem => {
        if(elem.classList.contains(game.inactivePlayer.filledBoxClass)){
          return false;
        }
        if(elem.classList.contains(game.activePlayer.filledBoxClass)){
          numberOfCheckedBoxes++;
        }
      })
      return numberOfCheckedBoxes == 2;
    },

    oneBoxMissingForLoss: function(array){
      let numberOfCheckedBoxes = 0;
      array.forEach(elem => {
        if(elem.classList.contains(game.activePlayer.filledBoxClass)){
          return false;
        }
        if(elem.classList.contains(game.inactivePlayer.filledBoxClass)){
          numberOfCheckedBoxes++;
        }
      })
      return numberOfCheckedBoxes == 2;
    },

    //ZAPISI KAKO PRAVIS NIZ OD NodeList
    findAllUncheckedBoxes: function(){
      return Array.from(boxes).filter( box => !box.classList.contains('box-filled-1') && !box.classList.contains('box-filled-2'))
    },

    combinationIncludesOpponentsBox: function(combination){

      for (var i = 0; i < combination.length; i++) {
        if(combination[i].classList.contains(this.inactivePlayer.filledBoxClass)){
          return true;
        }
      }
      return false;
      // combination.forEach(box => {
      //   if(box.classList.contains(this.inactivePlayer.filledBoxClass)){
      //     return false;
      //   }
      // })

    },

    findUncheckedBoxWithMostPotential: function(){
      const uncheckedBoxes = this.findAllUncheckedBoxes();
      let boxWithMostPotential = uncheckedBoxes[0];
      let mostCombinations = 0;
      uncheckedBoxes.forEach( box => {
        let combinationsForBox = 0;
        this.winningCombinations.forEach(combination => {
          if(combination.includes(box) && !this.combinationIncludesOpponentsBox(combination)){
            combinationsForBox++;
          }
        })
        if(combinationsForBox > mostCombinations){
          mostCombinations = combinationsForBox;
          boxWithMostPotential = box;
        }
      })
      return boxWithMostPotential;
    }


  }
   game.prepareGameForStart();


  });



