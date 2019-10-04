import React from 'react';
import './App.css';
import Board from './Board.js';
import Score from './Score';

class App extends React.Component {
  constructor(props) {
    super(props);
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));

    const actualBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.initBoard(actualBoard);

    this.state = {
      board: actualBoard,
      score: 0,
      gameOver: false,
    };
  }

  initBoard = actualBoard => {
    const rand1 = Math.floor(Math.random() * actualBoard.length);
    const rand2 = Math.floor(Math.random() * actualBoard.length);
    let rand3 = Math.floor(Math.random() * actualBoard.length);
    const rand4 = Math.floor(Math.random() * actualBoard.length);
    actualBoard[rand1][rand2] = 2;
    while (rand1 === rand3 && rand2 === rand4)
      rand3 = Math.floor(Math.random() * actualBoard.length);
    actualBoard[rand3][rand4] = 2;
  };

  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    if ([up, right, down, left].includes(e.keyCode)) {
      const actualBoard = [
        [...this.state.board[0]],
        [...this.state.board[1]],
        [...this.state.board[2]],
        [...this.state.board[3]],
      ];
      if (e.keyCode === up) this.moveUp(actualBoard);
      if (e.keyCode === down) this.moveDown(actualBoard);
      if (e.keyCode === left) this.moveLeft(actualBoard);
      if (e.keyCode === right) this.moveRight(actualBoard);
    }
  }

  moveRight = actualBoard => {
    actualBoard.map(row => {
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i + 1] === 0) {
          row[i + 1] = row[i];
          row[i] = 0;
        } else if (row[i + 1] === row[i]) {
          row[i + 1] = row[i] * 2;

          row[i] = 0;
          this.setState({
            score: this.state.score + row[i] * 2,
          });
        }
      }
    });
    this.insertRandom(actualBoard);
    this.checkIfGameIsOver(actualBoard);
    this.setState({ board: actualBoard });
  };

  moveDown = actualBoard => {
    for (let column = 0; column < actualBoard[0].length; column++) {
      for (let row = 0; row < actualBoard.length - 1; row++) {
        if (actualBoard[row + 1][column] === 0) {
          actualBoard[row + 1][column] = actualBoard[row][column];
          actualBoard[row][column] = 0;
        } else if (actualBoard[row + 1][column] === actualBoard[row][column]) {
          actualBoard[row + 1][column] = actualBoard[row][column] * 2;
          this.setState({
            score: this.state.score + actualBoard[row][column] * 2,
          });
          actualBoard[row][column] = 0;
        }
      }
    }

    this.insertRandom(actualBoard);
    this.checkIfGameIsOver(actualBoard);
    this.setState({ board: actualBoard });
  };

  moveUp = actualBoard => {
    for (let column = 0; column < actualBoard[0].length; column++) {
      for (let row = actualBoard.length - 1; row > 0; row--) {
        if (actualBoard[row - 1][column] === 0) {
          actualBoard[row - 1][column] = actualBoard[row][column];
          actualBoard[row][column] = 0;
        } else if (actualBoard[row - 1][column] === actualBoard[row][column]) {
          actualBoard[row - 1][column] = actualBoard[row][column] * 2;
          this.setState({
            score: this.state.score + actualBoard[row][column] * 2,
          });
          actualBoard[row][column] = 0;
        }
      }
    }
    this.insertRandom(actualBoard);
    this.checkIfGameIsOver(actualBoard);
    this.setState({ board: actualBoard });
  };

  moveLeft = actualBoard => {
    actualBoard.map(row => {
      for (let i = row.length - 1; i > 0; i--) {
        if (row[i - 1] === 0) {
          row[i - 1] = row[i];
          row[i] = 0;
        } else if (row[i - 1] === row[i]) {
          row[i - 1] = row[i] * 2;
          this.setState({
            score: this.state.score + row[i] * 2,
          });
          row[i] = 0;
        }
      }
    });
    this.insertRandom(actualBoard);
    this.checkIfGameIsOver(actualBoard);
    this.setState({ board: actualBoard });
  };

  checkIfGameIsOver = actualBoard => {
    let isGameOver = true;
    if (JSON.stringify(actualBoard) === JSON.stringify(this.state.board)) {
      if (
        actualBoard.map(row => {
          if (isGameOver && row.includes(0)) this.checkIfGameIsOver = false;
        })
      )
        this.setState({ gameOver: true });
    }
  };

  insertRandom = board => {
    let hasSpace = false;
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i].includes(0)) {
        hasSpace = true;
        break;
      }
    }
    if (hasSpace) {
      let rand1 = Math.floor(Math.random() * board.length);
      let rand2 = Math.floor(Math.random() * board.length);
      while (board[rand1][rand2] !== 0) {
        rand1 = Math.floor(Math.random() * board.length);
        rand2 = Math.floor(Math.random() * board.length);
      }
      board[rand1][rand2] = 2;
    }
  };

  restart = () => {
    const actualBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.initBoard(actualBoard);
    this.setState({
      score: 0,
      gameOver: false,
      board: actualBoard,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.gameOver ? (
            <div className="Gameover">Game Over</div>
          ) : (
            <></>
          )}
          <p className="App-score">
            <Score scoreValue={this.state.score} />
          </p>

          <button onClick={this.restart}>New Game</button>

          <div>
            <Board values={this.state.board} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
