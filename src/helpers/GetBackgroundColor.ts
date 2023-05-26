import { type Question as QuestionType } from '../types.d'

export const getBackgroundColor = (info: QuestionType, index: number) => {
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
