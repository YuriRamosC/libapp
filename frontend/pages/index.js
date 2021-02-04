import styled from 'styled-components'
import { } from '@material-ui/core'
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.palette.primary.dark};
`

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    //encapsular isso aqui
    fetch('http://192.168.100.66:3001/funcionarios/login', {
      method: 'POST',
      body: `email=${email}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'
      }
    })
    .then(res => {
     if (res.status === 204) {
       console.log('two: '+res.headers.get('Authorization'));
       //DAQUI
       //Guardar isso aqui no LocalStorage
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
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