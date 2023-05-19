import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { Button, Stack } from '@mui/material'
import { useQuestionData } from '../hooks/useQuestionData'
import { useQuestionsStore } from '../store/questions'

const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData()
  const reset = useQuestionsStore(state => state.reset)
  return (
    <>
      <Stack
        component='footer'
        direction='row'
        useFlexGap
        alignItems='center'
        justifyContent='center'
        spacing={1}
      >
        <CheckIcon color='success' /> {correct}
        {` ${correct === 1 ? 'correcta' : 'correctas'}`}
        <CloseIcon color='error' /> {incorrect} incorrectas
        <QuestionMarkIcon color='warning' /> {unanswered} sin responder
      </Stack>
      <Button
        variant='outlined'
        sx={{ mt: 2 }}
        onClick={() => {
          reset()
        }}
      >
        Resetear
      </Button>
    </>
  )
}

export default Footer
