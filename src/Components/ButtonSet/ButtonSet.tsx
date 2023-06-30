import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { CurrentPlayer } from '../../Types/CurrentPlayer';

type Props = {
  currentPlayer: CurrentPlayer;
  onUserMove: (userMove: number) => void;
  bavovnasRemaining: number;
};

export const ButtonSet: React.FC<Props> = (
  {
    currentPlayer,
    onUserMove,
    bavovnasRemaining,
  }) => {
  return (
    <ButtonGroup>
      <Button
        variant="contained"
        color="primary"
        disabled={
          currentPlayer !== CurrentPlayer.User || bavovnasRemaining === 0
        }
        onClick={() => {
          onUserMove(1);
        }}
      >
        1
      </Button>

      <Button
        variant="contained"
        color="primary"
        disabled={
          currentPlayer !== CurrentPlayer.User ||
          bavovnasRemaining === 0 ||
          bavovnasRemaining < 2
        }
        onClick={() => {
          onUserMove(2);
        }}
      >
        2
      </Button>

      <Button
        variant="contained"
        color="primary"
        disabled={
          currentPlayer !== CurrentPlayer.User ||
          bavovnasRemaining === 0 ||
          bavovnasRemaining < 3
        }
        onClick={() => {
          onUserMove(3);
        }}
      >
        3
      </Button>
    </ButtonGroup>
  );
};
