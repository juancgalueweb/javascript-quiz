import { Box, Modal, Typography } from '@mui/material'

interface Props {
  open: boolean
  correct: number
  handleClose: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#FFC63D',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const QuizResultModal: React.FC<Props> = ({ open, correct, handleClose }) => {
  let message = ''

  if (correct === 10) {
    message = '¡Felicidades! Obtuviste todas las respuestas correctas.'
  } else if (correct >= 7) {
    message =
      '¡Excelente! Has respondido la mayoría de las preguntas correctamente.'
  } else if (correct >= 5) {
    message =
      '¡Buen trabajo! Has respondido la mayoría de las preguntas correctamente.'
  } else if (correct >= 1) {
    message = 'Aún hay margen de mejora. Sigue practicando.'
  } else {
    message = '¡Ups! Parece que necesitas repasar más la película.'
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          variant='h5'
          id='modal-modal-title'
          sx={{ color: '#232323' }}
        >
          Resultados del Quiz
        </Typography>
        <Typography
          id='modal-modal-description'
          sx={{ mt: 2, color: '#232323' }}
        >
          {message}
          <br />
          {`Respuestas correctas:`} {correct} / 10
        </Typography>
      </Box>
    </Modal>
  )
}

export default QuizResultModal
