import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { getBackgroundColor } from '../helpers/GetBackgroundColor'
import { useQuestionsStore } from '../store/questions'
import { type Question as QuestionType } from '../types.d'
import AnswerTimer from './AnswerTimer'

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

export default Question
