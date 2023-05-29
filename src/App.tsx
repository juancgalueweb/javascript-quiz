import { Container, Stack, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Game from './components/Game'
import HPChamberOfSecrets from './components/HPChamberOfSecrets'
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
      <ToastContainer />
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px'
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
            variant={medium ? 'h2' : 'h4'}
            component='h1'
            marginTop={2}
            sx={{ fontFamily: 'Harry Potter', color: '#FFC63D' }}
          >
            Harry Potter Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && (
          <>
            <Typography variant='h5' component='h2' margin={2}>
              Para jugar, haga click sobre la imagen de la película que desee.
            </Typography>
            <Container
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '50px'
              }}
            >
              <HPPhilosopherStone />
              <HPChamberOfSecrets />
            </Container>
          </>
        )}
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
