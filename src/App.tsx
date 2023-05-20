import { Container, Stack, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import './App.css'
import Game from './components/Game'
import HPPhilosopherStone from './components/HPPhilosopherStone'
import QuizResultModal from './components/QuizResultModal'
import { useQuestionData } from './hooks/useQuestionData'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore(state => state.questions)
  const theme = useTheme()
  const medium = useMediaQuery(theme.breakpoints.up('md'))
  const { unanswered } = useQuestionData()

  return (
    <main>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px'
        }}
        maxWidth='sm'
      >
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'
        >
          <Typography
            variant={medium ? 'h2' : 'h5'}
            component='h1'
            marginTop={2}
            sx={{ fontFamily: 'Harry Potter', color: '#FFC63D' }}
          >
            Harry Potter Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <HPPhilosopherStone />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <QuizResultModal />}
        <strong
          style={{ display: 'block', fontSize: '14px', marginTop: '48px' }}
        >
          Desarrollado con TypeScript + Zustand -{' '}
          <a
            style={{ color: '#FFC63D' }}
            href='https://github.com/juancgalueweb/javascript-quiz'
          >
            Ir al código
          </a>
        </strong>
      </Container>
    </main>
  )
}

export default App
