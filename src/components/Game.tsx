import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useQuestionsStore } from '../store/questions'
import { type Question as QuestionType } from '../types.d'
import AnswerTimer from './AnswerTimer'
import Footer from './Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // Usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // Si ya seleccionó, pero la solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'
  // Si esta es la solución correcta
  if (index === correctAnswer) return 'green'
  // Si esta es la selección del usuario, pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // Si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const [showAnswerTime, setShowAnswerTime] = useState(true)
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const answerNotSelected = useQuestionsStore(state => state.answerNotSelected)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
    setShowAnswerTime(false)
    setTimeout(() => {
      goNextQuestion()
      setShowAnswerTime(true)
    }, 3000)
  }

  const handleTimeUp = () => {
    answerNotSelected(info.id)
    setShowAnswerTime(false)
    setTimeout(() => {
      goNextQuestion()
      setShowAnswerTime(true)
    }, 3000)
  }

  return (
    <Card
      variant='outlined'
      sx={{
        m: 4,
        textAlign: 'left',
        p: 2,
        backgroundColor: '#222',
        maxWidth: '100%',
        position: 'relative'
      }}
    >
      {showAnswerTime && <AnswerTimer duration={20} onTimeUp={handleTimeUp} />}
      <Typography variant='h5' marginBottom={4}>
        {info.question}
      </Typography>
      <List sx={{ backgroundColor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={handleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

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
