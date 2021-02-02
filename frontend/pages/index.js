import styled from 'styled-components'
import { } from '@material-ui/core'
import MenuAppBar from '../components/MenuAppBar'
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.palette.primary.dark};
`

export default function Home() {
  return (
    <div>
      <MenuAppBar />
     <Title>Teste</Title>
    </div>
  )
}