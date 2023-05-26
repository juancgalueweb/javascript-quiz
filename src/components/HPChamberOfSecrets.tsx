import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import hpfilm2pic from '../assets/hpchamberofsecret.jpg'
import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTIONS = 10
const FILE_NAME = 'hpfilm2.json'

export default function HPChamberOfSecrets() {
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
          image={hpfilm2pic}
          alt='Harry Potter y la Cámara de los Secretos pic'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Harry Potter y la Cámara de los Secretos
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ¡Demuestra tus conocimientos mágicos en nuestro Quiz de Harry Potter
            sobre &quot;La Cámara de los Secretos&quot;! ¿Estás listo para
            desafiar tus habilidades y sumergirte en el mundo de
            Hogwarts?¡Comienza el Quiz de Harry Potter ahora!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
