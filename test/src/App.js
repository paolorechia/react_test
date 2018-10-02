import React from 'react';
import './App.css';



function Square(props){
    let className = "square";
    if (props.winner === true){ 
      className += " winner";
    }
    return (
      <button 
        className={className}
        onClick={() => props.onClick()} 
      >
        {props.value}
      </button>
    );
}

class GenericButton extends React.Component{
  render(){
    return (
      <button 
        className="generic" 
        onClick={() => this.props.onClick()} 
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(idx, winner) {
    return <Square 
              value={this.props.squares[idx]}
              onClick={() => this.props.onClick(idx)} 
              key={idx}
              winner={winner}
           />;
  }


  render() {
    console.log(this.props.winner);
    let board = [];
    let grid_size = 3;
    for (let i = 0; i < grid_size; i++){
      let row = [];
      for (let j = 0; j < grid_size; j++){
        let idx = i * grid_size + j;
        let winner = false;
        if (this.props.winner && this.props.winner.includes(idx)){
          winner = true;
        }
        row.push(this.renderSquare(idx, winner));
      }
      board.push(<div key={i} className="board-row"> {row} </div>)
    }
    return (<div> {board} </div>);
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill('.'),
        move_idx: null,
      }],
      xIsNext: true,
      stepNumber: 0,
      reverse: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i] === 'X' || squares[i] === 'O'){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        move_idx: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 ) === 0,
    });
  }

  reverseMoves(){
    this.setState({
      reverse : !this.state.reverse,
    });
  }

  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const current_idx = this.state.stepNumber;
    const winner = calculateWinner(current.squares);
    const grid_size = 3;
    let status;


    let moves = [];
    if (!this.state.reverse){
      for (let i = 0; i < history.length; i++){
        let move_idx = history[i].move_idx;
        let row = Math.floor(move_idx / grid_size);
        let col = move_idx - row * grid_size;
        row += 1;
        col += 1;
        let desc;
        if (move_idx == null){
          desc = 'Go to game start'; 
        }
        else{
          desc = 'Go to move #' + (i + 1) + " (" + row + ", " + col + ")";
        }
        if (i === current_idx){
          desc = <b> {desc} </b>
        }
        moves.push(
            <li key={i}>
              <button onClick={() => this.jumpTo(i)}>
                  {desc}
              </button>
            </li>
        )
      }
    }
    else{
      for (let i = history.length - 1; i >= 0; i--){
        let move_idx = history[i].move_idx;
        let row = Math.floor(move_idx / grid_size);
        let col = move_idx - row * grid_size;
        row += 1;
        col += 1;
        let desc;
        if (move_idx == null){
          desc = 'Go to game start'; 
        }
        else{
          desc = 'Go to move #' + (i + 1) + " (" + row + ", " + col + ")";
        }
        if (i === current_idx){
          desc = <b> {desc} </b>
        }
        moves.push(
            <li key={i}>
              <button onClick={() => this.jumpTo(i)}>
                  {desc}
              </button>
            </li>
        )
      }
    }


    if (winner){
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    } 
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
           />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-reverse">
          <GenericButton
            value="Reverse" 
            onClick={() => this.reverseMoves()}
          />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] !== '.' && squares[a] === squares[b] && squares[a] === squares[c]){
      return [a, b, c];
    }
  }
  return null;
}

export default Game;
