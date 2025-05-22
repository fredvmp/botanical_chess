import React from 'react';
import "./Chessboard.css";

const horizontalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const verticalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

const Chessboard = () => {
    let board = [];

    for (let i = verticalAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            const key = `${verticalAxis[i]}${horizontalAxis[j]}`;
            const number = i + j + 2;

            if(number % 2 === 0) {
                board.push(
                <div key={key} className='cells black-cell'>
                    [{horizontalAxis[j]} {verticalAxis[i]}]
                </div>
                );

            } else {

                board.push(
                <div key={key} className='cells white-cell'>
                    [{horizontalAxis[j]} {verticalAxis[i]}]
                </div>
                );
            }


            
            
        }
    }

    return (
        <div className='chessboard'>
            
            {board}

        </div>
    );
};

export default Chessboard;
