import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import hpfilm1pic from '../assets/hpphilosopherstone.jpg'
import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTIONS = 10
const FILE_NAME = 'hpfilm1.json'

export default function HPPhilosopherStone() {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS, FILE_NAME)
  }
  return (
    <Card sx={{ maxWidth: 450 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='350'
          image={hpfilm1pic}
          alt='Harry Potter y la piedra filosofal imagen'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Harry Potter y la Piedra Filosofal
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ¡Demuestra tus conocimientos mágicos en nuestro Quiz de Harry Potter
            sobre &quot;La Piedra Filosofal&quot;! ¿Estás listo para desafiar
            tus habilidades y sumergirte en el mundo de Hogwarts? ¡Adelante,
            elige sabiamente tus respuestas y descubre si eres un auténtico mago
            o bruja! ¡Comienza el Quiz de Harry Potter ahora!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
