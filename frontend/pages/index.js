import { } from '@material-ui/core'
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
import Logged from './logged';
import Comunicacao from '../communication';
import {
  makeStyles, Avatar, Toolbar, Typography, Container,
  Button, IconButton, InputAdornment, InputLabel, Input, Grid, TextField, Paper
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const stylesLogin = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Home() {
  const classes = stylesLogin();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const communication = new Comunicacao();
  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    communication.autenticar(email, password).then(res => {
      localStorage.setItem('token', res);
    });
    router.push('/logged');
  }
  return (
    <div>
      <MenuAppBar />
      <Container maxWidth='xs'>
        <Paper elevation={4} align='center' className={classes.paper}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logar
        </Typography>
          <form onSubmit={onSubmit} align='center'>
            <TextField
              id="email-input"
              type="email"
              name="email"
              fullWidth
              variant='outlined'
              autoComplete='email'
              margin='normal'
              autoFocus
              value={email}
              onChange={handleInputEmail}
              required label="Digite o email" />
            <TextField
              id='type-password'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleInputPassword}
              required label="Digite a sua senha" />
            <Button
              fullWidth
              type='submit'
              variant="contained"
              color="primary"
              className={classes.submit}
              value="Submit">
              Confirmar
          </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}