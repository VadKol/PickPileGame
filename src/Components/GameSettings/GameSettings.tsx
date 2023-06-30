import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { ChangeEvent, FC, useState } from 'react';
import './GameSettings.scss';

interface Props {
  selectedStarter: string;
  onStarterChoose: (
    event: ChangeEvent<{ value?: unknown; name?: string | undefined }>,
  ) => void;
  handleCustomBavovnas: (num: number) => void;
  handleSettingNBavovnas: (num: number) => void;
  handleResetCustomSettings: () => void;
  customBavovnasRemaining: number;
  customNBavovnas: number;
}

export const GameSettings: FC<Props> = ({
  selectedStarter,
  onStarterChoose,
  handleCustomBavovnas,
  handleSettingNBavovnas,
  handleResetCustomSettings,
  customBavovnasRemaining,
  customNBavovnas,
}) => {
  const [bavovnas, setBavovnas] = useState(0);
  const [bavovnasToTake, setBavovnasToTake] = useState(0);

  const isValid: boolean =
    Number(bavovnas) % 2 !== 0 &&
    bavovnas > 0 &&
    bavovnasToTake > 0 &&
    Number(bavovnasToTake) < Number(bavovnas);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCustomBavovnas(bavovnas);
    handleSettingNBavovnas(bavovnasToTake);
    setBavovnas(0);
    setBavovnasToTake(0);
  };

  return (
    <div className="settings">
      <FormControl variant="outlined" size="small">
        <InputLabel id="starter-select-label">First step</InputLabel>
        <Select
          className="settings__select"
          labelId="starter-select-label"
          id="starter-select"
          value={selectedStarter}
          onChange={onStarterChoose}
          label="First move"
        >
          <MenuItem value="Player">Player 👨</MenuItem>
          <MenuItem value="Bot">Bot 🤖</MenuItem>
        </Select>
      </FormControl>

      <form onSubmit={handleFormSubmit}>
        <TextField
          className="input settings__form_item"
          label="Number of bavovnas"
          type="number"
          variant="filled"
          placeholder="odd only!!!"
          value={bavovnas !== 0 ? bavovnas : ''}
          onChange={e => setBavovnas(Number(e.target.value))}
          required
          size="small"
        />

        <TextField
          className="input settings__form_item"
          label="Max step of bavovnas"
          type="number"
          variant="filled"
          placeholder="Enter a number"
          value={bavovnasToTake !== 0 ? bavovnasToTake : ''}
          onChange={e => setBavovnasToTake(Number(e.target.value))}
          required
          size="small"
        />

        <Button
          className="settings__form_item"
          type="submit"
          disabled={!isValid}
          variant="contained"
          color="primary"
          size="small"
        >
          Save
        </Button>

        <Button
          className="settings__form_item"
          onClick={handleResetCustomSettings}
          disabled={customBavovnasRemaining === 0 && customNBavovnas === 0}
          variant="contained"
          color="secondary"
          size="small"
        >
          Reset
        </Button>
      </form>
    </div>
  );
};
