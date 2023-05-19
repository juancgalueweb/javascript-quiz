import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { type Question as QuestionType } from '../types.d'
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
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  return (
    <Card
      variant='outlined'
      sx={{
        m: 4,
        textAlign: 'left',
        p: 2,
        backgroundColor: '#222',
        maxWidth: '600px'
      }}
    >
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
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(
    state => state.goPreviousQuestion
  )

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'
        marginTop={2}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}

export default Game
