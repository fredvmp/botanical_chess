import React, { useEffect, useRef, useState } from "react";
import "./Chessboard.css";
import Cell from "../../components/Cell/Cell";

const horizontalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const verticalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface Piece {
  image: string;
  x: number;
  y: number;
  id: string;
}

const initialPieces: Piece[] = [];

// Añadir peones al tablero 
for (let i = 0; i < 8; i++) {
  initialPieces.push({
    image: "/figures/pawn_black.png",
    x: i,
    y: 6,
    id: `bp${i}`,
  });
  initialPieces.push({
    image: "/figures/pawn_white.png",
    x: i,
    y: 1,
    id: `wp${i}`,
  });
}

// Añadir el resto de piezas al tablero
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "black" : "white";
  const y = p === 0 ? 7 : 0;
  const prefix = p === 0 ? "b" : "w";

  initialPieces.push({
    image: `/figures/rook_${type}.png`,
    x: 0,
    y,
    id: `${prefix}r1`,
  });
  initialPieces.push({
    image: `/figures/rook_${type}.png`,
    x: 7,
    y,
    id: `${prefix}r2`,
  });

  initialPieces.push({
    image: `/figures/knight_${type}.png`,
    x: 1,
    y,
    id: `${prefix}n1`,
  });
  initialPieces.push({
    image: `/figures/knight_${type}.png`,
    x: 6,
    y,
    id: `${prefix}n2`,
  });

  initialPieces.push({
    image: `/figures/bishop_${type}.png`,
    x: 2,
    y,
    id: `${prefix}b1`,
  });
  initialPieces.push({
    image: `/figures/bishop_${type}.png`,
    x: 5,
    y,
    id: `${prefix}b2`,
  });

  initialPieces.push({
    image: `/figures/queen_${type}.png`,
    x: 3,
    y,
    id: `${prefix}q`,
  });
  initialPieces.push({
    image: `/figures/king_${type}.png`,
    x: 4,
    y,
    id: `${prefix}k`,
  });
}

const Chessboard = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabOffset, setGrabOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  const boardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece") && boardRef.current) {
      const boardBounds = boardRef.current.getBoundingClientRect();

      const offsetX = e.clientX;
      const offsetY = e.clientY;

      setGrabOffset({ x: offsetX, y: offsetY });
      setActivePiece(element);

      const boardSize = boardBounds.width; // assuming square

      element.style.position = "absolute";
      element.style.width = `${boardSize / 8}px`;
      element.style.height = `${boardSize / 8}px`;
      element.style.pointerEvents = "none";
      element.style.zIndex = "1000";

      setPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    }
  }

  function movePiece(e: MouseEvent) {
    if (activePiece) {
      const x = e.clientX - grabOffset.x;
      const y = e.clientY - grabOffset.y;

      setPosition({ x, y });
    }
  }

  function dropPiece(e: MouseEvent) {
    if (!activePiece || !boardRef.current) return;

    const boardBounds = boardRef.current.getBoundingClientRect();
    const x = e.clientX - boardBounds.left;
    const y = e.clientY - boardBounds.top;

    const gridX = Math.floor((x / boardBounds.width) * 8);
    const gridY = Math.floor((y / boardBounds.height) * 8);
    const newY = 7 - gridY;

    const id = activePiece.getAttribute("data-id");
    if (!id) return;

    const occupied = pieces.some((p) => p.x === gridX && p.y === newY);

    if (!occupied) {
      setPieces((prev) =>
        prev.map((p) => (p.id === id ? { ...p, x: gridX, y: newY } : p))
      );
    } else {
      setPieces((prev) => [...prev]);
    }

    activePiece.style.position = "relative";
    activePiece.style.left = "0";
    activePiece.style.top = "0";
    activePiece.style.pointerEvents = "auto";
    activePiece.style.zIndex = "auto";
    setActivePiece(null);
    setPosition({ x: -1000, y: -1000 });
  }

  useEffect(() => {
    window.addEventListener("mousemove", movePiece);
    window.addEventListener("mouseup", dropPiece);

    return () => {
      window.removeEventListener("mousemove", movePiece);
      window.removeEventListener("mouseup", dropPiece);
    };
  });

  const board = [];
  for (let i = verticalAxis.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontalAxis.length; j++) {
      const number = i + j + 2;
      const piece = pieces.find((p) => p.x === j && p.y === i);
      board.push(
        <Cell
          key={`${i},${j}`}
          number={number}
          image={piece?.image || ""}
          dataId={piece?.id || ""}
          pos={position}
          isActive={activePiece?.getAttribute("data-id") === piece?.id}
        />
      );
    }
  }

  return (
    <div ref={boardRef} onMouseDown={grabPiece} className="chessboard">
      {board}
    </div>
  );
};

export default Chessboard;
