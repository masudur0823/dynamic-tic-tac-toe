import React from 'react';
import { Button } from '@mui/material';

const Square = ({ value, onClick }) => {
  return (
    <Button 
      variant="outlined" 
      sx={{ width: '50px', height: '50px', fontSize: '24px', margin: '1px' }} 
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

export default Square;
