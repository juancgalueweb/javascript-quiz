import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTIONS = 10

const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button variant='contained' sx={{ mt: 2 }} onClick={handleClick}>
      ¡Empezar!
    </Button>
  )
}

export default Start
