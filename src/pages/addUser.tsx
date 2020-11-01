import React, { useState } from 'react';
import {addUser} from '../scripts/firebase/addUser'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

type ColorType = "inherit" | "primary" | "secondary" | "default" | undefined

export default function AddUser(){
  const [name, setName] = useState('');

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const click=()=>{
    if (name === '') {
      setColor('secondary')
      setWord('空文字です')
      setOpen(true);
      return
    }
    addUser(name)
    setWord('ok')
    setColor('primary')
    setOpen(true);
  }

  const [open, setOpen] = React.useState(false);
  const [word, setWord] = React.useState('');
  const [color, setColor] = useState<ColorType>("default");
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div>add user to firebase</div>
      <div style={{display: "flex", alignItems: "center", marginTop: 10}}>
        <TextField size="small" label="Outlined" variant="outlined" value={name} onChange={handleChange} />
        <Button variant="contained" color="primary" onClick={click}>add firebase</Button>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={word}
        action={
          <React.Fragment>
            <Button color={color} size="small" onClick={handleClose}>
              UNDO
            </Button>
          </React.Fragment>
        }
      />
    </div>
  )
}
