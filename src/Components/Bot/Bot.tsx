import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC, useEffect } from 'react';
import { CurrentPlayer } from '../../Types/CurrentPlayer';

const useStyles = makeStyles(theme => ({
  aiContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  aiHeading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  currentPlayer: CurrentPlayer;
  bavovnasRemaining: number;
  aiAmount: number;
  onAIMove: (aiMove: number) => void;
  customBavovnasRemaining: number;
  customNBavovnas: number;
}

export const Bot: FC<Props> = ({
  currentPlayer,
  bavovnasRemaining,
  aiAmount,
  onAIMove,
  customBavovnasRemaining,
  customNBavovnas,
}) => {
  const classes = useStyles();

  const makeMove = () => {
    const remainingBavovnas = bavovnasRemaining;
    let maxBavovnas;
    let aiMove = 1;

    if (customBavovnasRemaining === 0 || customNBavovnas === 0) {
      maxBavovnas = Math.min(remainingBavovnas, 3);
    } else {
      maxBavovnas = Math.min(remainingBavovnas, customNBavovnas);
    }

    if (remainingBavovnas <= maxBavovnas) {
      aiMove = remainingBavovnas;
    } else if ((remainingBavovnas - 1) % (maxBavovnas + 1) === 0) {
      aiMove = 1;
    } else {
      for (let i = 2; i <= maxBavovnas; i++) {
        if ((remainingBavovnas - i) % (maxBavovnas + 1) === 0) {
          aiMove = i;
          break;
        }
      }
    }

    setTimeout(() => {
      if (bavovnasRemaining > 0) {
        onAIMove(aiMove);
      }
    }, 1500);
  };

  useEffect(() => {
    if (currentPlayer === CurrentPlayer.AI) {
      makeMove();
    }
  }, [currentPlayer]);

  return (
    <div className={classes.aiContainer}>
      <Typography
        variant="h4"
        className={currentPlayer === CurrentPlayer.AI ? classes.aiHeading : ''}
      >
        Bot
      </Typography>

      <Typography variant="body1">Bot's bavovnas: {aiAmount}</Typography>
    </div>
  );
};
