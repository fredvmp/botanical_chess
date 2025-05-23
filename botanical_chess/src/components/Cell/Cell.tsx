import React from "react";
import Pawn from "./public/figures/pawn_2.png";
import "./Cell.css";

interface Props {
    number: number;
    image: string 
}

const Cell = ({ number, image }: Props) => {
    if (number % 2 === 0) {
        return (
            <div className="cells black-cell">
                <img src={image} className="piece"/>
            </div>
        );
    } else {
        return (
           <div className="cells white-cell">
            <img src={image} className="piece"/>
            </div>
        );
    }
};

export default Cell;