import { Box, Button, Modal, Typography } from '@mui/material'
import { useQuestionData } from '../hooks/useQuestionData'
import { useQuestionsStore } from '../store/questions'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  bgcolor: '#FFC63D',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const QuizResultModal = () => {
  const { correct, unanswered } = useQuestionData()
  const questions = useQuestionsStore(state => state.questions)
  const reset = useQuestionsStore(state => state.reset)
  const open = useQuestionsStore(state => {
    return (
      state.currentQuestion === state.questions.length - 1 && unanswered === 0
    )
  })

  const handleClose = () => {
    reset()
  }
  let message = ''

  if (correct === 10) {
    message = '¡Felicidades! 🥳 Obtuviste todas las respuestas correctas.'
  } else if (correct >= 7) {
    message =
      '¡Excelente! 😎 Has respondido la mayoría de las preguntas correctamente.'
  } else if (correct >= 5) {
    message =
      '¡Ahí más o menos! 🥺 Has respondido algunas preguntas correctamente.'
  } else if (correct >= 1) {
    message = 'Aún hay margen de mejora 😑. Sigue practicando.'
  } else {
    message = '¡Ups! 🫠 Parece que necesitas repasar más la película.'
  }
  return (
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          variant='h5'
          id='modal-modal-title'
          sx={{ color: '#232323', textAlign: 'center', fontWeight: 'bold' }}
        >
          Resultados del Quiz
        </Typography>
        <Typography
          id='modal-modal-description'
          sx={{ mt: 2, color: '#232323' }}
        >
          {message}
          <br />
          {`Respuestas correctas:`} {correct} / {questions.length}
        </Typography>
        <Button
          variant='contained'
          color='error'
          sx={{ mt: 2 }}
          onClick={handleClose}
        >
          Reiniciar
        </Button>
      </Box>
    </Modal>
  )
}

export default QuizResultModal
