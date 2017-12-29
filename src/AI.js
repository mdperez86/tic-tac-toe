/**
 * AI
 */
class AI {

    /**
     * Minimax
     *
     * @param state
     * @param level
     * @returns {*}
     */
    minimax(state, level) {
        this.min(state, level - 1);
        // console.log('MINIMAX', state, r);
        let acts = this.actions(state);
        if (acts.length && state.index >= 0) {
            return acts[state.index];
        }
        return state;
    }

    /**
     * Minimize
     *
     * @param state
     * @param level
     * @returns {number}
     */
    min(state, level) {
        if (this.terminal(state)) {
            return this.utility(state);
        } else if (level === 0) {
            return 0;
        }
        const acts = this.actions(state);
        let m = 2;
        for (let i = 0; i < acts.length; i++) {
            const r = this.max(acts[i], level - 1);
            if (m > r) {
                m = r;
                state.index = i;
                state.value = m;
            }
        }
        return m;
    }

    /**
     * Maximize
     *
     * @param state
     * @param level
     * @returns {number}
     */
    max(state, level) {
        if (this.terminal(state)) {
            return this.utility(state);
        } else if (level === 0) {
            return 0;
        }
        const acts = this.actions(state);
        let m = -2;
        for (let i = 0; i < acts.length; i++) {
            const r = this.min(acts[i], level - 1);
            if (m < r) {
                m = r;
                state.index = i;
                state.value = m;
            }
        }
        return m;
    }

    /**
     * Terminal
     *
     * @param state
     * @returns {boolean}
     */
    terminal(state) {
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
        const squares = state.squares;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a]) {
                if (squares[a] === squares[b] && squares[a] === squares[c]) {
                    return true;
                }
            }
        }
        let moved = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i]) {
                moved++;
            }
        }
        return moved === squares.length;

    }

    /**
     * Utility
     *
     * @param state
     * @returns {number}
     */
    utility(state) {
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
        const squares = state.squares;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                if (squares[a] === 'X') {
                    return state.player === 'MAX' ? -1 : 1;
                } else if (squares[a] === 'O') {
                    return state.player === 'MIN' ? 1 : -1;
                }
            }
        }
        return 0;
    }

    /**
     * Actions
     *
     * @param state
     * @returns {Array}
     */
    actions(state) {
        if (state.children)
            return state.children;
        state.children = [];
        const squares = state.squares;
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                let ns = squares.slice();
                ns[i] = state.player === 'MAX' ? 'X' : 'O';
                state.children.push({
                    player: this.player(state),
                    squares: ns
                });
            }
        }
        return state.children;
    }

    /**
     * Player
     *
     * @param state
     * @returns {string}
     */
    player(state) {
        return !state.player || state.player === 'MAX' ? 'MIN' : 'MAX';
    }
}

export default AI;