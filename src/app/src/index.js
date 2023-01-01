import React from 'react'
import Chess from '@components/chess-game'
import ChessBoard from '@components/chess-board'
import ChessHistory from '@components/chess-history'

import s from '@styles/app.scss'
import '@styles/global.scss'

export default function App() {
    return (
        <Chess>
            <div className={s.wrapper}>
                <ChessBoard/>
                <div className={s.sidebar}>
                    <ChessHistory/>
                </div>
            </div>
        </Chess>
    )
}
