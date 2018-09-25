var module = (function($){

	const $boxes = $('.box');

	const winningCombinations = [
      [$boxes[0], $boxes[1], $boxes[2]],
      [$boxes[3], $boxes[4], $boxes[5]],
      [$boxes[6], $boxes[7], $boxes[8]],
      [$boxes[0], $boxes[3], $boxes[6]],
      [$boxes[1], $boxes[4], $boxes[7]],
      [$boxes[2], $boxes[5], $boxes[8]],
      [$boxes[0], $boxes[4], $boxes[8]],
      [$boxes[2], $boxes[4], $boxes[6]]
    ];

    
    const $boxUL = $('.boxes');
    const $board = $('#board');


	const $playerRectangles = $('#player1').parent();
	const $player1Rectangle = $('#player1');
	const $player2Rectangle = $('#player2');

	const startButton = $("<a class='button' id='2players' href = '#'>Start game - 2 players</a>");	
	const startButtonComputer = $("<a class='button' id='1player' href = '#'>Start game - 1 players</a>");

	
	// const winnerMessage = document.createElement('p');
	// winnerMessage.className = 'message';

})(jQuery);