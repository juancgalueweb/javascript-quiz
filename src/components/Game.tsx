import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'
import { type Question as QuestionType } from '../types.d'

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
      sx={{ m: 4, textAlign: 'left', p: 2, backgroundColor: '#222' }}
    >
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter language='javascript' style={gruvboxDark}>
        {info.code}
      </SyntaxHighlighter>
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
      <Question info={questionInfo} />
    </>
  )
}

export default Game
