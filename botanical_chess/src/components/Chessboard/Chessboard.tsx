import React from 'react';
import "./Chessboard.css";
import Cell from "../../components/Cell/Cell.tsx";

const horizontalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const verticalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface Piece {
    image: string
    x: number
    y: number
}

const pieces: Piece[] = []

// Peones
for (let i = 0; i < 8; i++) {
    pieces.push( {image: "/figures/pawn_black.png", x: i, y: 6})
}
for (let i = 0; i < 8; i++) {
    pieces.push( {image: "/figures/pawn_white.png", x: i, y: 1})
}

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "black" : "white"
    const y = (p === 0) ? 7 : 0

    // Torres
    pieces.push({ 
        image: `/figures/rook_${type}.png`, 
        x: 0, 
        y: y 
    });    
    pieces.push({ 
        image: `/figures/rook_${type}.png`, 
        x: 7, 
        y: y 
    });

    // Caballos
    pieces.push({ 
        image: `/figures/knight_${type}.png`, 
        x: 1, 
        y: y 
    });
    pieces.push({ 
        image: `/figures/knight_${type}.png`, 
        x: 6, 
        y: y 
    });

    // Alfiles
    pieces.push({ 
        image: `/figures/bishop_${type}.png`, 
        x: 2, 
        y: y 
    });
    pieces.push({ 
        image: `/figures/bishop_${type}.png`, 
        x: 5, 
        y: y 
    });

    // Rey y Reina
    pieces.push({ 
        image: `/figures/king_${type}.png`, 
        x: 4, 
        y 
    });
    pieces.push({ 
        image: `/figures/queen_${type}.png`, 
        x: 3, 
        y
    });


}


const Chessboard = () => {
    let board = [];

    for (let i = verticalAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            /*const key = `${verticalAxis[i]}${horizontalAxis[j]}`;*/
            const number = i + j + 2;
            let image = undefined;

            pieces.forEach(p => {
                if (p.y === i && p.x === j) {
                    image = p.image;
                }
            })

            board.push(<Cell number={number} image={image}/>); 
        }
    }

    return (
        <div className='chessboard'>
            {board}
        </div>
    );
};

export default Chessboard;
