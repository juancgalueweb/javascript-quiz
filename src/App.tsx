import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import Game from './components/Game'
import HPPhilosopherStone from './components/HPPhilosopherStone'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore(state => state.questions)
  return (
    <main>
      <Container
        style={{
          minHeight: '100vh',
          minWidth: '800px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'
        >
          <Typography
            variant='h2'
            component='h1'
            marginTop={4}
            sx={{ fontFamily: 'Harry Potter', color: '#FFC63D' }}
          >
            Harry Potter Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <HPPhilosopherStone />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
