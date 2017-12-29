import React, {Component} from "react";
import Board from "./Board";
import Modal from "./Modal";
import AI from "./AI";
import "./Game.css";

/**
 * Game
 */
class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            level: 6
        };
        this.ai = new AI();
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        let moved = 0;
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                moved++;
            }
        }
        if (moved === 0) {
            return -1;
        }
        return null;
    }

    handleClick(i) {
        let history = this.state.history;
        const current = history[history.length - 1];
        let squares = current.squares.slice();
        const winner = this.calculateWinner(squares);
        if ((winner && winner !== -1) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: [...history, {
                squares: squares
            }],
            stepNumber: history.length,
            xIsNext: this.state.xIsNext
        });
        setTimeout(() => this.runAi(), 100);
    }

    runAi() {
        let history = this.state.history;
        const current = history[history.length - 1];
        let squares = current.squares.slice();
        const winner = this.calculateWinner(squares);
        if ((winner && winner !== -1)) {
            return;
        }

        let r = this.ai.minimax({
            player: 'MIN',
            squares: squares
        }, this.state.level);
        squares = r.squares;

        this.setState({
            history: [...history, {
                squares: squares
            }],
            stepNumber: history.length,
            xIsNext: this.state.xIsNext
        });
    }

    newGame(level) {
        this.setState({
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            level: level || 6
        });
        console.log(this.modal);
        this.modal.show();
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: !(step % 2),
        });
    }

    render() {
        

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        let status;
        if (!winner) {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else if (winner === -1) {
            status = 'Game tied';
        } else {
            status = 'Winner: ' + winner;
        }

        const moves = history.map((step, move) => {
            console.log(step);
            const desc = move ?
                'Move #' + move:
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <button className="btn-flat btn-primary btn-float" onClick={() => this.modal.show()}>+</button>
                <Modal ref={(modal) => this.modal = modal} onAccept={(level) => this.newGame(level)} />
            </div>
        );
    }
}

export default Game;
