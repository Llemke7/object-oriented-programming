/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */



class Game {
    constructor(height, width) {
      this.HEIGHT = height;
      this.WIDTH = width;
      this.players = [1, 2];
      this.currentPlayerIndex = 0;
      this.board = [];
      this.gameOver = false;
  
      this.handleClick = this.handleClick.bind(this);
      this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
  
      this.startButton = document.getElementById("start-button");
      this.startButton.addEventListener("click", this.handleStartButtonClick);
  
      
      
      this.makeHtmlBoard();
    }
  
    makeBoard() {
      this.board = Array.from({ length: this.HEIGHT }).map(() =>
        Array.from({ length: this.WIDTH })
      );
    }
  
    makeHtmlBoard() {
      const board = document.getElementById("board");
  
      while (board.firstChild) {
        board.removeChild(board.firstChild);
      }
  
      const top = document.createElement("tr");
      top.setAttribute("id", "column-top");
      top.addEventListener("click", this.handleClick);
  
      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
      }
  
      board.append(top);
  
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement("tr");
  
        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement("td");
          cell.setAttribute("id", `${y}-${x}`);
          row.append(cell);
        }
  
        board.append(row);
      }
  
      this.startButton.style.display = "block";
    }
  
    handleStartButtonClick() {
      if (this.gameOver) {
        this.resetGame();
      } else {
        this.makeBoard();
        this.startButton.style.display = "none";
        this.gameOver = false;
      }
    }
  
    findSpotForCol(x) {
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }
  
    placeInTable(y, x) {
      const piece = document.createElement("div");
      piece.classList.add("piece");
      piece.classList.add(`p${this.players[this.currentPlayerIndex]}`);
      piece.style.top = -50 * (y + 2);
  
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }
  
    endGame(msg) {
      alert(msg);
      this.gameOver = true;
    }
  
    handleClick(evt) {
      if (this.gameOver) {
        return;
      }
  
      const x = +evt.target.id;
      const y = this.findSpotForCol(x);
  
      if (y === null) {
        return;
      }
  
      this.board[y][x] = this.players[this.currentPlayerIndex];
      this.placeInTable(y, x);
  
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.players[this.currentPlayerIndex]} won!`);
      }
  
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame("Tie!");
      }
  
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  
    checkForWin() {
      function _win(cells) {
        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.players[this.currentPlayerIndex]
        );
      }
  
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
          if (
            _win.call(this, horiz) ||
            _win.call(this, vert) ||
            _win.call(this, diagDR) ||
            _win.call(this, diagDL)
          ) {
            return true;
          }
        }
      }
    }
  
    resetGame() {
      this.makeBoard();
      this.startButton.style.display = "none";
      this.gameOver = false;
    }
  }
  
  // Create a new game with a height of 6 and width of 7
  const game = new Game(6, 7);

  class Player{
    constructor(color){
        this.color = color;
    }
  }
  
  