import React,{useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {createMovie} from '../scripts/dynamo/createMovie'

type ColorType = "inherit" | "primary" | "secondary" | "default" | undefined

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function AddMovie(){
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const [year, setYear] = useState(0);
  const handleChangeYear = (event:React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    setYear(event.target.value as number)
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

  const click = () =>{
    if (year === 0) {
      setColor('secondary')
      setWord('yearを選択してね')
      setOpen(true)
      return
    }
    if (title === '') {
      setColor('secondary')
      setWord('titleを入力してね')
      setOpen(true)
      return
    }
    const info = {}
    const movie = {
      title,
      year,
      info,
    }
    createMovie(movie)
    setColor('primary')
    setWord(`ok title: ${title}を作成`)
    setOpen(true)
  }

  const list = [...Array(100).keys()].reverse().map((i) => {
    return <MenuItem value={i + 1920}>{i + 1920}</MenuItem>
  })

  return (
    <>
    <div>add movie to dynamo</div>
    <div style={{display: "flex", alignItems:"center"}}>
      <TextField label="Outlined" variant="outlined" value={title} size="small" onChange={handleChangeTitle} />
      <FormControl size="small" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          onChange={handleChangeYear}
        >
          {list}
        </Select>
      </FormControl>
      <Button onClick={click} color='primary' variant="contained">create movie</Button>
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
    </>
  )
}
