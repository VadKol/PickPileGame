import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import './MatchGame.scss';

import { CurrentPlayer } from '../../Types/CurrentPlayer';

import { Bot } from '../Bot/Bot';
import { GameEnd } from '../GameResult/GameResult';
import { GameSettings } from '../GameSettings/GameSettings';
import { Player } from '../Player/Player';

const useStyles = makeStyles(theme => ({
  gameContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },

  gameInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameHeading: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  additional: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
  },
}));

export const MatchGame: React.FC = () => {
  const classes = useStyles();
  const [bavovnasRemaining, setBavovnasRemaining] = useState(25);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(
    CurrentPlayer.None,
  );
  const [playerAmount, setPlayerAmount] = useState(0);
  const [aiAmount, setAIAmount] = useState(0);
  const [selectedStarter, setSelectedStarter] = useState('You');
  const [customBavovnasRemaining, setCustomBavovnasRemaining] = useState(0);
  const [customNBavovnas, setCustomNBavovnas] = useState(0);

  const handleUserMove = (userMove: number) => {
    setBavovnasRemaining(bavovnasRemaining - userMove);
    setPlayerAmount(playerAmount + userMove);
    setCurrentPlayer(CurrentPlayer.AI);
  };

  const handleAIMove = (aiMove: number) => {
    setBavovnasRemaining(bavovnasRemaining - aiMove);
    setAIAmount(aiAmount + aiMove);
    setCurrentPlayer(CurrentPlayer.User);
  };

  const handleStarterChoose = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStarter(event.target.value);
  };

  const handleCustomBavovnas = (num: number) => {
    setBavovnasRemaining(num);
    setCustomBavovnasRemaining(num);
  };

  const handleSettingNBavovnas = (num: number) => {
    setCustomNBavovnas(num);
  };

  const handleResetCustomSettings = () => {
    setBavovnasRemaining(25);
    setCustomBavovnasRemaining(0);
    setCustomNBavovnas(0);
    setPlayerAmount(0);
    setAIAmount(0);
    setCurrentPlayer(CurrentPlayer.None);
  };

  const renderBavovnas = () => {
    const bavovnaImage = '🔥';

    if (bavovnasRemaining > 0) {
      const bavovnas = bavovnaImage.repeat(bavovnasRemaining);

      return <div className="bavovnas">{bavovnas}</div>;
    }
  };

  const clearStates = () => {
    if (customBavovnasRemaining > 0) {
      setBavovnasRemaining(customBavovnasRemaining);
    } else {
      setBavovnasRemaining(25);
    }

    setCurrentPlayer(CurrentPlayer.None);
    setPlayerAmount(0);
    setAIAmount(0);
  };

  return (
    <>
      <div className={''}>
        <div>
          <div className={classes.additional}>
            <GameSettings
              selectedStarter={selectedStarter}
              onStarterChoose={handleStarterChoose}
              handleCustomBavovnas={handleCustomBavovnas}
              handleSettingNBavovnas={handleSettingNBavovnas}
              handleResetCustomSettings={handleResetCustomSettings}
              customBavovnasRemaining={customBavovnasRemaining}
              customNBavovnas={customNBavovnas}
            />
          </div>
          <div className={classes.gameContainer}>
            <Player
              currentPlayer={currentPlayer}
              bavovnasRemaining={bavovnasRemaining}
              playerAmount={playerAmount}
              onUserMove={handleUserMove}
              customBavovnasRemaining={customBavovnasRemaining}
              customNBavovnas={customNBavovnas}
            />
            <Bot
              currentPlayer={currentPlayer}
              bavovnasRemaining={bavovnasRemaining}
              aiAmount={aiAmount}
              onAIMove={handleAIMove}
              customBavovnasRemaining={customBavovnasRemaining}
              customNBavovnas={customNBavovnas}
            />
          </div>

          {bavovnasRemaining === 0 ? (
            <GameEnd aiAmount={aiAmount} clearStates={clearStates} />
          ) : (
            <div className={classes.gameInfo}>
              <Typography variant="h4" className={classes.gameHeading}>
                Bavovnas: {bavovnasRemaining}
              </Typography>

              <div>{renderBavovnas()}</div>

              {currentPlayer === CurrentPlayer.None ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    if (selectedStarter === 'You') {
                      setCurrentPlayer(CurrentPlayer.User);
                    } else {
                      setCurrentPlayer(CurrentPlayer.AI);
                    }
                  }}
                >
                  Start
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    clearStates();

                    if (selectedStarter === 'You') {
                      setCurrentPlayer(CurrentPlayer.User);
                    } else {
                      setCurrentPlayer(CurrentPlayer.AI);
                    }
                  }}
                  disabled={
                    customBavovnasRemaining === 0
                      ? bavovnasRemaining === 25
                      : bavovnasRemaining === customBavovnasRemaining
                  }
                >
                  Restart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
