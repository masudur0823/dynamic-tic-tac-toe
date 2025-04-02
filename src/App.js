import React, { useState } from "react";
import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Board from "./components/Board";

function App() {
  const [size, setSize] = useState(5);
  const [winCell, setWinCell] = useState(4);
  const [player, setPlayer] = useState(3);
  const [gameKey, setGameKey] = useState(0); // To reset the board when needed

  const resetGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Tic Tac Toe - 5x5 Grid - 3 Players
      </Typography>
      <Stack gap={2} direction={"row"}>
        <TextField
          type="number"
          size="small"
          label="Select Dimention"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <TextField
          type="number"
          size="small"
          label="Winning Cell"
          value={winCell}
          onChange={(e) => setWinCell(e.target.value)}
        />
        <TextField
          type="number"
          size="small"
          label="Total Player"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
      </Stack>

      {!size || size < 3 ? (
        <Typography>Please select Size value geater than 3</Typography>
      ) : (
        
          <Board
            key={gameKey}
            size={Number(size)}
            winCondition={Number(winCell)}
            player={Number(player)}
            resetGame={resetGame}
          />
      
      )}
    </Container>
  );
}

export default App;
