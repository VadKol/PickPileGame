import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  gameEnd: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  winnerText: {
    marginBottom: theme.spacing(2),
  },
  playAgainButton: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  aiAmount: number;
  clearStates: () => void;
}

export const GameEnd: React.FC<Props> = ({ aiAmount, clearStates }) => {
  const classes = useStyles();

  return (
    <div className={classes.gameEnd}>
      <Typography variant="h5" className={classes.winnerText}>
        {aiAmount % 2 === 0
          ? 'You are Loooooseeeeerrrr!!! 😈'
          : 'You are winner!!! 🎉'}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={classes.playAgainButton}
        onClick={clearStates}
      >
        Try again
      </Button>
    </div>
  );
};

export default GameEnd;
