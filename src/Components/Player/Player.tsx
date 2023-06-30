import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC, useState } from 'react';
import { CurrentPlayer } from '../../Types/CurrentPlayer';
import { ButtonSet } from '../ButtonSet/ButtonSet';

const useStyles = makeStyles(theme => ({
  playerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '100px',
    marginBottom: '2rem',
  },
  playerHeading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  warningText: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(1),
  },
  customMatchInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  currentPlayer: CurrentPlayer,
  bavovnasRemaining: number,
  playerAmount: number,
  onUserMove: (userMove: number) => void,
  customBavovnasRemaining: number,
  customNBavovnas: number,
};

export const Player: FC<Props> = ({
  currentPlayer,
  bavovnasRemaining,
  playerAmount,
  onUserMove,
  customBavovnasRemaining,
  customNBavovnas,
}) => {
  const classes = useStyles();
  const [customTake, setCustomTake] = useState(0);

  return (
    <div className={classes.playerContainer}>
      <Typography
        variant="h4"
        className={
          currentPlayer === CurrentPlayer.User ? classes.playerHeading : ''
        }
      >
        Player
      </Typography>

      <Typography variant="body1">Player's bavovnas: {playerAmount}</Typography>

      <Typography variant="body2">Take bavovnas:</Typography>

      {customBavovnasRemaining === 0 && customNBavovnas === 0 ? (
        <ButtonSet
          currentPlayer={currentPlayer}
          onUserMove={onUserMove}
          bavovnasRemaining={bavovnasRemaining}
        />
      ) : (
        <div className={classes.customMatchInput}>
          {customTake > customNBavovnas && (
            <Typography variant="body2" className={classes.warningText}>
              You can't take more than {customNBavovnas} bavovnas!
            </Typography>
          )}

          <TextField
            type="number"
            className={classes.input}
            placeholder="Enter a number"
            value={customTake !== 0 ? customTake : ''}
            onChange={e => setCustomTake(Number(e.target.value))}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onUserMove(customTake);
              setCustomTake(0);
            }}
            disabled={customTake > customNBavovnas || customTake === 0}
          >
            Take
          </Button>
        </div>
      )}
    </div>
  );
};
