import useGame from '@components/chess-game/useGame'
import React, { useEffect } from 'react'
import s from './history.scss'

/**
 * Shows the moves
 * @returns {React.Component}
 */
export default function ChessHistory() {
    const game = useGame();

    // useEffect(() => {
    //     game.move('e2,e4');
    //     game.move('e7,e5');
    // }, []);

    useEffect(() => {
        console.log('History', game);
    }, [game])

    return (
        <div className={s.wrapper}>
            <h1>Moves</h1>
            <div>
                <ul>
                    <li>1. e4 e5</li>
                    <li>2. Nf3 Nc6</li>
                    <li>3. Bb5</li>
                </ul>
            </div>
        </div>
    )
}
