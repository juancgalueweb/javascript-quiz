import { Stack } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { useQuestionsStore } from '../store/questions'
import Footer from './Footer'
import Question from './Question'

const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const questionInfo = questions[currentQuestion]

  return (
    <>
      <ToastContainer />
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'
        marginTop={2}
      >
        <span className='current-question'>{currentQuestion + 1}</span> /{' '}
        {questions.length}
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}

export default Game
