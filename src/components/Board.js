import React, { useState } from "react";
import Square from "./Square";
import { Grid, Typography, Button } from "@mui/material";

const Board = ({ size, winCondition,player, resetGame }) => {
    
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for winner
    if (checkWinner(newBoard)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer((prev) => (prev % player) + 1); // Rotate between 3 players
    }
  };

  const checkWinner = (board) => {
    // Check rows, columns, and diagonals for a winner
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (checkLine(board, row, col, 1, 0)) return true; // Check row
        if (checkLine(board, row, col, 0, 1)) return true; // Check column
        if (checkLine(board, row, col, 1, 1)) return true; // Check diagonal \
        if (checkLine(board, row, col, 1, -1)) return true; // Check diagonal /
      }
    }
    return false;
  };

  const checkLine = (board, row, col, dRow, dCol) => {
    let count = 0;
    for (let i = 0; i < winCondition; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < size &&
        newCol < size &&
        board[newRow * size + newCol] === currentPlayer
      ) {
        count++;
      } else {
        break;
      }
    }
    return count === winCondition;
  };

  const renderSquare = (index) => {
    return (
      <Square
        key={index}
        value={board[index]}
        onClick={() => handleClick(index)}
      />
    );
  };

  const handleReset = () => {
    setBoard(Array(size * size).fill(null));
    setWinner(null);
    setCurrentPlayer(1);
    resetGame();
  };

  return (
    <div>
      <Typography variant="h5">Current Player: {currentPlayer}</Typography>
      <Grid
        container
        spacing={0}
        direction="row"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {Array.from({ length: size }).map((_, rowIndex) => (
          <Grid container size={12} justifyContent="center" key={rowIndex}>
            {Array.from({ length: size }).map((_, colIndex) =>
              renderSquare(rowIndex * size + colIndex)
            )}
          </Grid>
        ))}
      </Grid>
      {winner && <Typography variant="h5">Player {winner} Wins!</Typography>}
      <Button
        variant="contained"
        onClick={handleReset}
        sx={{ marginTop: "20px" }}
      >
        Reset Game
      </Button>
    </div>
  );
};

export default Board;
