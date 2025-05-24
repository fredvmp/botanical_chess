import React from "react";
import styles from "./Cell.module.css";

interface Props {
  number: number;
  image: string;
  dataId: string;
  pos: { x: number; y: number };
  isActive: boolean;
}

const Cell: React.FC<Props> = ({
  number,
  image,
  dataId,
  pos,
  isActive,
}: Props) => {
  const cellColor = number % 2 === 0 ? "blackCell" : "whiteCell";

  const style: React.CSSProperties = isActive
    ? {
        backgroundImage: `url(${image})`,
        position: "absolute",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 1000,
        pointerEvents: "none",
        aspectRatio: "1 / 1",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundImage: `url(${image})`,
        width: "90%",
        aspectRatio: "1 / 1",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      };

  return (
    <div className={`${styles.cells} ${styles[cellColor]}`}>
      {image && (
        <div className={styles.chessPiece} data-id={dataId} style={style} />
      )}
    </div>
  );
};

export default Cell;
