import styled from 'styled-components'
import { } from '@material-ui/core'
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
import Logged from './logged';
import Comunicacao from '../communication';
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.palette.primary.dark};
`

export default function Home() {
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
      <form onSubmit={onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleInputEmail}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handleInputPassword}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}